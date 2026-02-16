import Foundation

public enum NovaEngineRemindersCommand: String, Codable, Sendable {
    case list = "reminders.list"
    case add = "reminders.add"
}

public enum NovaEngineReminderStatusFilter: String, Codable, Sendable {
    case incomplete
    case completed
    case all
}

public struct NovaEngineRemindersListParams: Codable, Sendable, Equatable {
    public var status: NovaEngineReminderStatusFilter?
    public var limit: Int?

    public init(status: NovaEngineReminderStatusFilter? = nil, limit: Int? = nil) {
        self.status = status
        self.limit = limit
    }
}

public struct NovaEngineRemindersAddParams: Codable, Sendable, Equatable {
    public var title: String
    public var dueISO: String?
    public var notes: String?
    public var listId: String?
    public var listName: String?

    public init(
        title: String,
        dueISO: String? = nil,
        notes: String? = nil,
        listId: String? = nil,
        listName: String? = nil)
    {
        self.title = title
        self.dueISO = dueISO
        self.notes = notes
        self.listId = listId
        self.listName = listName
    }
}

public struct NovaEngineReminderPayload: Codable, Sendable, Equatable {
    public var identifier: String
    public var title: String
    public var dueISO: String?
    public var completed: Bool
    public var listName: String?

    public init(
        identifier: String,
        title: String,
        dueISO: String? = nil,
        completed: Bool,
        listName: String? = nil)
    {
        self.identifier = identifier
        self.title = title
        self.dueISO = dueISO
        self.completed = completed
        self.listName = listName
    }
}

public struct NovaEngineRemindersListPayload: Codable, Sendable, Equatable {
    public var reminders: [NovaEngineReminderPayload]

    public init(reminders: [NovaEngineReminderPayload]) {
        self.reminders = reminders
    }
}

public struct NovaEngineRemindersAddPayload: Codable, Sendable, Equatable {
    public var reminder: NovaEngineReminderPayload

    public init(reminder: NovaEngineReminderPayload) {
        self.reminder = reminder
    }
}
