# RSystfip Project Documentation

<p align="center">
  <img src="./apps/frontend/src/assets/rsystfip.svg" width="200" alt="RSystfip Logo" />
</p>

## Description

RSystfip Project is a scheduling system designed for managing and handling application programming interfaces (APIs) and related frontend applications. This project provides a RESTful API that serves as the backend interface for RSystfip system applications.

## Installation

To get started with RSystfip Project, make sure you have Node.js installed on your system.

Please note that this project uses pnpm as the package manager, and it may not work with npm due to the use of pnpm workspaces.

For install this project, follow these steps:

1. Clone the RSystfip Project repository:

   ```bash
   git clone https://github.com/rojasricor/rsystfip-project.git
   ```

2. Change to the project directory:

   ```bash
   cd rsystfip-project
   ```

3. Install the required dependencies by running:

   ```bash
   pnpm i
   ```

## Scripts

RSystfip Project includes the following scripts defined in the package.json file:

- **`build`**: This script is used to build the application using Turbo, a toolkit for web application and API development. To build the project, run:

  ```bash
  pnpm run build
  ```

- **`dev`**: This script starts a development server for the project. It will automatically reload whenever you make changes to the code. To run the development server, use:

  ```bash
  pnpm run dev
  ```

- **`start`**: This script starts the application in a production environment. The application will be executed using the index.js file located in the apps/api/dist folder. To start the application in production, use:

  ```bash
  npm start
  ```

- **`Format`**: Formats the TypeScript and SCSS files in the src directory using Prettier.

  ```bash
  pnpm run format
  ```

## Apps

- [RSystfip Project Restapi ExpressJS.](apps/api/README.md)

- [RSystfip Project Restapi NestJS.](apps/restapi/README.md)

- [RSystfip Project Frontend React + Vite.](apps/frontend/README.md)

## Keywords

The RSystfip Project is related to the following keywords:

- rest
- api
- backend
- front
- interface
- application
- rsystfip

## Author

rojasricor@gmail.com

## Dependencies

The RSystfip Project relies on various dependencies for both the project and the API. For the complete list of dependencies, refer to the respective `package.json` files for the project and the API.

## Development Dependencies

The RSystfip Project and API also use development dependencies for building and testing. Refer to the respective `package.json` files for the complete list of development dependencies.

- Turbo

## Contact

If you have any questions or suggestions about the RSystfip Project, you can contact the development team at rsystfip@gmail.com
