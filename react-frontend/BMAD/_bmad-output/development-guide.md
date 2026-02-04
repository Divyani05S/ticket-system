# Development Guide

## Prerequisites
- **Node.js**: (Version compatible with React 19, e.g., v18 or v20)
- **npm**: Package manager.

## Installation
1. Navigate to the project directory:
   ```bash
   cd react-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Local Development
To start the development server:
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production
To create an optimized production build:
```bash
npm run build
```
This builds the app to the `build/` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Testing
To run the test suite:
```bash
npm test
```
Launches the test runner in interactive watch mode.

## Environment Configuration
Configuration is currently managed in `src/config.js`. Ensure you update API URLs here before deployment.
```javascript
// src/config.js
const config = {
  API_BASE_URL: "...",
};
export default config;
```
