package ai.nova-engine.android.node

import android.os.Build
import ai.nova-engine.android.BuildConfig
import ai.nova-engine.android.SecurePrefs
import ai.nova-engine.android.gateway.GatewayClientInfo
import ai.nova-engine.android.gateway.GatewayConnectOptions
import ai.nova-engine.android.gateway.GatewayEndpoint
import ai.nova-engine.android.gateway.GatewayTlsParams
import ai.nova-engine.android.protocol.NovaEngineCanvasA2UICommand
import ai.nova-engine.android.protocol.NovaEngineCanvasCommand
import ai.nova-engine.android.protocol.NovaEngineCameraCommand
import ai.nova-engine.android.protocol.NovaEngineLocationCommand
import ai.nova-engine.android.protocol.NovaEngineScreenCommand
import ai.nova-engine.android.protocol.NovaEngineSmsCommand
import ai.nova-engine.android.protocol.NovaEngineCapability
import ai.nova-engine.android.LocationMode
import ai.nova-engine.android.VoiceWakeMode

class ConnectionManager(
  private val prefs: SecurePrefs,
  private val cameraEnabled: () -> Boolean,
  private val locationMode: () -> LocationMode,
  private val voiceWakeMode: () -> VoiceWakeMode,
  private val smsAvailable: () -> Boolean,
  private val hasRecordAudioPermission: () -> Boolean,
  private val manualTls: () -> Boolean,
) {
  companion object {
    internal fun resolveTlsParamsForEndpoint(
      endpoint: GatewayEndpoint,
      storedFingerprint: String?,
      manualTlsEnabled: Boolean,
    ): GatewayTlsParams? {
      val stableId = endpoint.stableId
      val stored = storedFingerprint?.trim().takeIf { !it.isNullOrEmpty() }
      val isManual = stableId.startsWith("manual|")

      if (isManual) {
        if (!manualTlsEnabled) return null
        if (!stored.isNullOrBlank()) {
          return GatewayTlsParams(
            required = true,
            expectedFingerprint = stored,
            allowTOFU = false,
            stableId = stableId,
          )
        }
        return GatewayTlsParams(
          required = true,
          expectedFingerprint = null,
          allowTOFU = false,
          stableId = stableId,
        )
      }

      // Prefer stored pins. Never let discovery-provided TXT override a stored fingerprint.
      if (!stored.isNullOrBlank()) {
        return GatewayTlsParams(
          required = true,
          expectedFingerprint = stored,
          allowTOFU = false,
          stableId = stableId,
        )
      }

      val hinted = endpoint.tlsEnabled || !endpoint.tlsFingerprintSha256.isNullOrBlank()
      if (hinted) {
        // TXT is unauthenticated. Do not treat the advertised fingerprint as authoritative.
        return GatewayTlsParams(
          required = true,
          expectedFingerprint = null,
          allowTOFU = false,
          stableId = stableId,
        )
      }

      return null
    }
  }

  fun buildInvokeCommands(): List<String> =
    buildList {
      add(NovaEngineCanvasCommand.Present.rawValue)
      add(NovaEngineCanvasCommand.Hide.rawValue)
      add(NovaEngineCanvasCommand.Navigate.rawValue)
      add(NovaEngineCanvasCommand.Eval.rawValue)
      add(NovaEngineCanvasCommand.Snapshot.rawValue)
      add(NovaEngineCanvasA2UICommand.Push.rawValue)
      add(NovaEngineCanvasA2UICommand.PushJSONL.rawValue)
      add(NovaEngineCanvasA2UICommand.Reset.rawValue)
      add(NovaEngineScreenCommand.Record.rawValue)
      if (cameraEnabled()) {
        add(NovaEngineCameraCommand.Snap.rawValue)
        add(NovaEngineCameraCommand.Clip.rawValue)
      }
      if (locationMode() != LocationMode.Off) {
        add(NovaEngineLocationCommand.Get.rawValue)
      }
      if (smsAvailable()) {
        add(NovaEngineSmsCommand.Send.rawValue)
      }
      if (BuildConfig.DEBUG) {
        add("debug.logs")
        add("debug.ed25519")
      }
      add("app.update")
    }

  fun buildCapabilities(): List<String> =
    buildList {
      add(NovaEngineCapability.Canvas.rawValue)
      add(NovaEngineCapability.Screen.rawValue)
      if (cameraEnabled()) add(NovaEngineCapability.Camera.rawValue)
      if (smsAvailable()) add(NovaEngineCapability.Sms.rawValue)
      if (voiceWakeMode() != VoiceWakeMode.Off && hasRecordAudioPermission()) {
        add(NovaEngineCapability.VoiceWake.rawValue)
      }
      if (locationMode() != LocationMode.Off) {
        add(NovaEngineCapability.Location.rawValue)
      }
    }

  fun resolvedVersionName(): String {
    val versionName = BuildConfig.VERSION_NAME.trim().ifEmpty { "dev" }
    return if (BuildConfig.DEBUG && !versionName.contains("dev", ignoreCase = true)) {
      "$versionName-dev"
    } else {
      versionName
    }
  }

  fun resolveModelIdentifier(): String? {
    return listOfNotNull(Build.MANUFACTURER, Build.MODEL)
      .joinToString(" ")
      .trim()
      .ifEmpty { null }
  }

  fun buildUserAgent(): String {
    val version = resolvedVersionName()
    val release = Build.VERSION.RELEASE?.trim().orEmpty()
    val releaseLabel = if (release.isEmpty()) "unknown" else release
    return "NovaEngineAndroid/$version (Android $releaseLabel; SDK ${Build.VERSION.SDK_INT})"
  }

  fun buildClientInfo(clientId: String, clientMode: String): GatewayClientInfo {
    return GatewayClientInfo(
      id = clientId,
      displayName = prefs.displayName.value,
      version = resolvedVersionName(),
      platform = "android",
      mode = clientMode,
      instanceId = prefs.instanceId.value,
      deviceFamily = "Android",
      modelIdentifier = resolveModelIdentifier(),
    )
  }

  fun buildNodeConnectOptions(): GatewayConnectOptions {
    return GatewayConnectOptions(
      role = "node",
      scopes = emptyList(),
      caps = buildCapabilities(),
      commands = buildInvokeCommands(),
      permissions = emptyMap(),
      client = buildClientInfo(clientId = "nova-engine-android", clientMode = "node"),
      userAgent = buildUserAgent(),
    )
  }

  fun buildOperatorConnectOptions(): GatewayConnectOptions {
    return GatewayConnectOptions(
      role = "operator",
      scopes = listOf("operator.read", "operator.write", "operator.talk.secrets"),
      caps = emptyList(),
      commands = emptyList(),
      permissions = emptyMap(),
      client = buildClientInfo(clientId = "nova-engine-control-ui", clientMode = "ui"),
      userAgent = buildUserAgent(),
    )
  }

  fun resolveTlsParams(endpoint: GatewayEndpoint): GatewayTlsParams? {
    val stored = prefs.loadGatewayTlsFingerprint(endpoint.stableId)
    return resolveTlsParamsForEndpoint(endpoint, storedFingerprint = stored, manualTlsEnabled = manualTls())
  }
}
