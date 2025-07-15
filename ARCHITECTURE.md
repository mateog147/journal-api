# Project Architecture: Hexagonal (Ports and Adapters)

This project is structured following the principles of Hexagonal Architecture, also known as Ports and Adapters. This architectural style aims to create a loosely coupled system where the core business logic (the "domain") is isolated from external concerns such as databases, user interfaces, and third-party services.

## Core Components:

1.  **Domain Layer (`src/journal/domain`)**:
    *   This is the heart of the application, containing the core business rules and entities. It is completely independent of any infrastructure concerns.
    *   `entities/`: Defines the core business entities (e.g., <mcsymbol name="IUser" filename="user.interface.ts" path="src/journal/domain/entities/user.interface.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="IEntry" filename="entry.interface.ts" path="src/journal/domain/entities/entry.interface.ts" startline="1" type="class"></mcsymbol>). These are plain objects representing the business concepts.
    *   `ports/`: Defines interfaces (ports) that the domain layer uses to interact with external systems. These interfaces are implemented by adapters in the infrastructure layer.
        *   `user-db.interface.ts`: Defines the <mcsymbol name="IUserDb" filename="user-db.interface.ts" path="src/journal/domain/ports/user-db.interface.ts" startline="5" type="class"></mcsymbol> port for user data persistence.
        *   `entry-db.interface.ts`: Defines the <mcsymbol name="IEntryDb" filename="entry-db.interface.ts" path="src/journal/domain/ports/entry-db.interface.ts" startline="5" type="class"></mcsymbol> port for entry data persistence.

2.  **Application Layer (`src/journal/application`)**:
    *   This layer orchestrates the domain objects to perform specific use cases. It contains the application-specific business rules and workflows.
    *   `use-cases/`: Contains the application's use cases (e.g., <mcsymbol name="CreateUserUseCase" filename="create-user.use-case.ts" path="src/journal/application/use-cases/user/create-user.use-case.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="GetUserByEmailUseCase" filename="get-user-by-email.use-case.ts" path="src/journal/application/use-cases/user/get-user-by-email.use-case.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="CreateEntryUseCase" filename="create-entry.use-case.ts" path="src/journal/application/use-cases/entry/create-entry.use-case.ts" startline="1" type="class"></mcsymbol>). These use cases interact with the domain entities and the ports defined in the domain layer.

3.  **Infrastructure Layer (`src/journal/infrastructure`)**:
    *   This layer contains the "adapters" that implement the "ports" defined in the domain layer. It handles external concerns like databases, web frameworks, and external APIs.
    *   `driven-adapters/`: Implementations of the domain's output ports (e.g., database services).
        *   `mongo-database/user/user-db.service.ts`: An adapter implementing <mcsymbol name="IUserDb" filename="user-db.interface.ts" path="src/journal/domain/ports/user-db.interface.ts" startline="5" type="class"></mcsymbol> for MongoDB.
        *   `mysql/entry.db.service.ts`: An adapter implementing <mcsymbol name="IEntryDb" filename="entry-db.interface.ts" path="src/journal/domain/ports/entry-db.interface.ts" startline="5" type="class"></mcsymbol> for MySQL.
    *   `entry-points/`: Implementations of the domain's input ports (e.g., REST API controllers).
        *   `controllers/`: Adapters that expose the application's use cases via a web interface (e.g., <mcsymbol name="AuthController" filename="auth.controller.ts" path="src/journal/infrastructure/entry-points/controllers/auth.controller.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="UserController" filename="user.controller.ts" path="src/journal/infrastructure/entry-points/controllers/user.controller.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="EntryController" filename="entry.controller.ts" path="src/journal/infrastructure/entry-points/controllers/entry.controller.ts" startline="1" type="class"></mcsymbol>).
        *   `services/`: Services that encapsulate business logic and interact with use cases (e.g., <mcsymbol name="AuthService" filename="auth.service.ts" path="src/journal/infrastructure/entry-points/services/auth.service.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="UserService" filename="user.service.ts" path="src/journal/infrastructure/entry-points/services/user.service.ts" startline="1" type="class"></mcsymbol>, <mcsymbol name="EntryService" filename="entry.service.ts" path="src/journal/infrastructure/entry-points/services/entry.service.ts" startline="1" type="class"></mcsymbol>).
        *   `auth/`: Authentication-related components (e.g., <mcsymbol name="AuthGuard" filename="auth-guard.ts" path="src/journal/infrastructure/entry-points/auth/auth-guard.ts" startline="11" type="class"></mcsymbol>, <mcsymbol name="PassportHasher" filename="password-hasher.ts" path="src/journal/infrastructure/entry-points/auth/password-hasher.ts" startline="1" type="class"></mcsymbol>).
        *   `dto/`: Data Transfer Objects for input and output.

4.  **Shared Layer (`src/journal/shared`)**:
    *   Contains common utilities, constants, or helper functions that can be used across different layers without introducing dependencies between them.
    *   `jwt.constants.ts`: Defines constants related to JWT.

## Key Principles Applied:

*   **Dependency Inversion**: The domain and application layers depend on abstractions (interfaces/ports) defined within themselves, not on concrete implementations in the infrastructure layer. The infrastructure layer depends on these abstractions.
*   **Separation of Concerns**: Each layer has a distinct responsibility, leading to a cleaner and more maintainable codebase.
*   **Testability**: The core business logic (domain and application layers) can be tested independently of external systems by mocking the ports.
*   **Flexibility**: It's easy to swap out external technologies (e.g., change from MongoDB to PostgreSQL) by simply providing a different adapter implementation for the same port, without affecting the core logic.

## Folder structure: 
├── config
└── journal
   ├── application
   |  └── use-cases
   |     ├── entry
   |     └── user
   ├── domain
   |  ├── entities
   |  └── ports
   ├── infrastructure
   |  ├── driven-adapters
   |  |  ├── mongo-database
   |  |  └── mysql
   |  ├── entry-points
   |  |  ├── auth
   |  |  ├── controllers
   |  |  ├── dto
   |  |  └── services
   |  └── meta-service
   └── shared
