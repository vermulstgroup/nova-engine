import Foundation

public enum NovaEngineCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum NovaEngineCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum NovaEngineCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum NovaEngineCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct NovaEngineCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: NovaEngineCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: NovaEngineCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: NovaEngineCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: NovaEngineCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct NovaEngineCameraClipParams: Codable, Sendable, Equatable {
    public var facing: NovaEngineCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: NovaEngineCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: NovaEngineCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: NovaEngineCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
