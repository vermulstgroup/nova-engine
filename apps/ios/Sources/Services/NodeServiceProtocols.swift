import CoreLocation
import Foundation
import NovaEngineKit
import UIKit

protocol CameraServicing: Sendable {
    func listDevices() async -> [CameraController.CameraDeviceInfo]
    func snap(params: NovaEngineCameraSnapParams) async throws -> (format: String, base64: String, width: Int, height: Int)
    func clip(params: NovaEngineCameraClipParams) async throws -> (format: String, base64: String, durationMs: Int, hasAudio: Bool)
}

protocol ScreenRecordingServicing: Sendable {
    func record(
        screenIndex: Int?,
        durationMs: Int?,
        fps: Double?,
        includeAudio: Bool?,
        outPath: String?) async throws -> String
}

@MainActor
protocol LocationServicing: Sendable {
    func authorizationStatus() -> CLAuthorizationStatus
    func accuracyAuthorization() -> CLAccuracyAuthorization
    func ensureAuthorization(mode: NovaEngineLocationMode) async -> CLAuthorizationStatus
    func currentLocation(
        params: NovaEngineLocationGetParams,
        desiredAccuracy: NovaEngineLocationAccuracy,
        maxAgeMs: Int?,
        timeoutMs: Int?) async throws -> CLLocation
}

protocol DeviceStatusServicing: Sendable {
    func status() async throws -> NovaEngineDeviceStatusPayload
    func info() -> NovaEngineDeviceInfoPayload
}

protocol PhotosServicing: Sendable {
    func latest(params: NovaEnginePhotosLatestParams) async throws -> NovaEnginePhotosLatestPayload
}

protocol ContactsServicing: Sendable {
    func search(params: NovaEngineContactsSearchParams) async throws -> NovaEngineContactsSearchPayload
    func add(params: NovaEngineContactsAddParams) async throws -> NovaEngineContactsAddPayload
}

protocol CalendarServicing: Sendable {
    func events(params: NovaEngineCalendarEventsParams) async throws -> NovaEngineCalendarEventsPayload
    func add(params: NovaEngineCalendarAddParams) async throws -> NovaEngineCalendarAddPayload
}

protocol RemindersServicing: Sendable {
    func list(params: NovaEngineRemindersListParams) async throws -> NovaEngineRemindersListPayload
    func add(params: NovaEngineRemindersAddParams) async throws -> NovaEngineRemindersAddPayload
}

protocol MotionServicing: Sendable {
    func activities(params: NovaEngineMotionActivityParams) async throws -> NovaEngineMotionActivityPayload
    func pedometer(params: NovaEnginePedometerParams) async throws -> NovaEnginePedometerPayload
}

extension CameraController: CameraServicing {}
extension ScreenRecordService: ScreenRecordingServicing {}
extension LocationService: LocationServicing {}
