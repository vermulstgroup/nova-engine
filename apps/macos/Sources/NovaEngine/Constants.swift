import Foundation

// Stable identifier used for both the macOS LaunchAgent label and Nix-managed defaults suite.
// nix-nova-engine writes app defaults into this suite to survive app bundle identifier churn.
let launchdLabel = "ai.nova-engine.mac"
let gatewayLaunchdLabel = "ai.nova-engine.gateway"
let onboardingVersionKey = "nova-engine.onboardingVersion"
let onboardingSeenKey = "nova-engine.onboardingSeen"
let currentOnboardingVersion = 7
let pauseDefaultsKey = "nova-engine.pauseEnabled"
let iconAnimationsEnabledKey = "nova-engine.iconAnimationsEnabled"
let swabbleEnabledKey = "nova-engine.swabbleEnabled"
let swabbleTriggersKey = "nova-engine.swabbleTriggers"
let voiceWakeTriggerChimeKey = "nova-engine.voiceWakeTriggerChime"
let voiceWakeSendChimeKey = "nova-engine.voiceWakeSendChime"
let showDockIconKey = "nova-engine.showDockIcon"
let defaultVoiceWakeTriggers = ["nova-engine"]
let voiceWakeMaxWords = 32
let voiceWakeMaxWordLength = 64
let voiceWakeMicKey = "nova-engine.voiceWakeMicID"
let voiceWakeMicNameKey = "nova-engine.voiceWakeMicName"
let voiceWakeLocaleKey = "nova-engine.voiceWakeLocaleID"
let voiceWakeAdditionalLocalesKey = "nova-engine.voiceWakeAdditionalLocaleIDs"
let voicePushToTalkEnabledKey = "nova-engine.voicePushToTalkEnabled"
let talkEnabledKey = "nova-engine.talkEnabled"
let iconOverrideKey = "nova-engine.iconOverride"
let connectionModeKey = "nova-engine.connectionMode"
let remoteTargetKey = "nova-engine.remoteTarget"
let remoteIdentityKey = "nova-engine.remoteIdentity"
let remoteProjectRootKey = "nova-engine.remoteProjectRoot"
let remoteCliPathKey = "nova-engine.remoteCliPath"
let canvasEnabledKey = "nova-engine.canvasEnabled"
let cameraEnabledKey = "nova-engine.cameraEnabled"
let systemRunPolicyKey = "nova-engine.systemRunPolicy"
let systemRunAllowlistKey = "nova-engine.systemRunAllowlist"
let systemRunEnabledKey = "nova-engine.systemRunEnabled"
let locationModeKey = "nova-engine.locationMode"
let locationPreciseKey = "nova-engine.locationPreciseEnabled"
let peekabooBridgeEnabledKey = "nova-engine.peekabooBridgeEnabled"
let deepLinkKeyKey = "nova-engine.deepLinkKey"
let modelCatalogPathKey = "nova-engine.modelCatalogPath"
let modelCatalogReloadKey = "nova-engine.modelCatalogReload"
let cliInstallPromptedVersionKey = "nova-engine.cliInstallPromptedVersion"
let heartbeatsEnabledKey = "nova-engine.heartbeatsEnabled"
let debugPaneEnabledKey = "nova-engine.debugPaneEnabled"
let debugFileLogEnabledKey = "nova-engine.debug.fileLogEnabled"
let appLogLevelKey = "nova-engine.debug.appLogLevel"
let voiceWakeSupported: Bool = ProcessInfo.processInfo.operatingSystemVersion.majorVersion >= 26
