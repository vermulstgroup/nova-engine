import Foundation

public enum NovaEngineChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(NovaEngineChatEventPayload)
    case agent(NovaEngineAgentEventPayload)
    case seqGap
}

public protocol NovaEngineChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> NovaEngineChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [NovaEngineChatAttachmentPayload]) async throws -> NovaEngineChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> NovaEngineChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<NovaEngineChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension NovaEngineChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "NovaEngineChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> NovaEngineChatSessionsListResponse {
        throw NSError(
            domain: "NovaEngineChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}
