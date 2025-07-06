# Journal API

This is a personal journal API built with NestJS, designed to help users manage their daily entries. It follows a Hexagonal Architecture (Ports and Adapters) to ensure a clean separation of concerns, testability, and flexibility.

## Architecture

The project's architecture is based on the Hexagonal Architecture principles. You can find a detailed explanation of the architecture, its layers (Domain, Application, Infrastructure, Shared), and key components in the [ARCHITECTURE.md](ARCHITECTURE.md) file.

## Project Setup

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd journal-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory based on `.env.template` and fill in the necessary environment variables (e.g., database connection strings, JWT secret).

## Running the Application

To run the application in different modes:

*   **Development Mode:**
    ```bash
    npm run start
    ```

*   **Watch Mode (for development with hot-reloading):**
    ```bash
    npm run start:dev
    ```

*   **Production Mode:**
    ```bash
    npm run start:prod
    ```

## Running Tests

To execute the project's tests:

*   **Unit Tests:**
    ```bash
    npm run test
    ```


*   **Test Coverage:**
    ```bash
    npm run test:cov
    ```
