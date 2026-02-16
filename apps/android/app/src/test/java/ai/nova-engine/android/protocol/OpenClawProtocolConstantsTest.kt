package ai.nova-engine.android.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class NovaEngineProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", NovaEngineCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", NovaEngineCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", NovaEngineCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", NovaEngineCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", NovaEngineCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", NovaEngineCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", NovaEngineCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", NovaEngineCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", NovaEngineCapability.Canvas.rawValue)
    assertEquals("camera", NovaEngineCapability.Camera.rawValue)
    assertEquals("screen", NovaEngineCapability.Screen.rawValue)
    assertEquals("voiceWake", NovaEngineCapability.VoiceWake.rawValue)
  }

  @Test
  fun screenCommandsUseStableStrings() {
    assertEquals("screen.record", NovaEngineScreenCommand.Record.rawValue)
  }
}
