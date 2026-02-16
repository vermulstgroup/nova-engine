// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "NovaEngineKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "NovaEngineProtocol", targets: ["NovaEngineProtocol"]),
        .library(name: "NovaEngineKit", targets: ["NovaEngineKit"]),
        .library(name: "NovaEngineChatUI", targets: ["NovaEngineChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "NovaEngineProtocol",
            path: "Sources/NovaEngineProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "NovaEngineKit",
            dependencies: [
                "NovaEngineProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/NovaEngineKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "NovaEngineChatUI",
            dependencies: [
                "NovaEngineKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/NovaEngineChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "NovaEngineKitTests",
            dependencies: ["NovaEngineKit", "NovaEngineChatUI"],
            path: "Tests/NovaEngineKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
