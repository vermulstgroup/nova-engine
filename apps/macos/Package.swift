// swift-tools-version: 6.2
// Package manifest for the NovaEngine macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "NovaEngine",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "NovaEngineIPC", targets: ["NovaEngineIPC"]),
        .library(name: "NovaEngineDiscovery", targets: ["NovaEngineDiscovery"]),
        .executable(name: "NovaEngine", targets: ["NovaEngine"]),
        .executable(name: "nova-engine-mac", targets: ["NovaEngineMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/NovaEngineKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "NovaEngineIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "NovaEngineDiscovery",
            dependencies: [
                .product(name: "NovaEngineKit", package: "NovaEngineKit"),
            ],
            path: "Sources/NovaEngineDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "NovaEngine",
            dependencies: [
                "NovaEngineIPC",
                "NovaEngineDiscovery",
                .product(name: "NovaEngineKit", package: "NovaEngineKit"),
                .product(name: "NovaEngineChatUI", package: "NovaEngineKit"),
                .product(name: "NovaEngineProtocol", package: "NovaEngineKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/NovaEngine.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "NovaEngineMacCLI",
            dependencies: [
                "NovaEngineDiscovery",
                .product(name: "NovaEngineKit", package: "NovaEngineKit"),
                .product(name: "NovaEngineProtocol", package: "NovaEngineKit"),
            ],
            path: "Sources/NovaEngineMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "NovaEngineIPCTests",
            dependencies: [
                "NovaEngineIPC",
                "NovaEngine",
                "NovaEngineDiscovery",
                .product(name: "NovaEngineProtocol", package: "NovaEngineKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
