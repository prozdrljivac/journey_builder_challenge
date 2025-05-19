# Journey Builder React Coding Challenge

## Overview

This project is a solution to the **Journey Builder React Coding Challenge**. It fetches a directed-acyclic-graph (DAG) of forms from a mock API, renders a simple list of nodes, and provides a slide-in sidebar where users can view and edit “prefill” mappings for each form field. Mappings can be cleared, and new mappings selected from upstream form fields or global data sources.

## Prerequisites

- **Node.js** v24
- **npm** v11
- **Mock Server**
  The mock API server is provided in the [repository](https://github.com/mosaic-avantos/frontendchallengeserver).

## Local Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/prozdrljivac/journey-builder-challenge.git
   cd journey-builder-challenge
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Start the mock API server**
   Follow the instructions in the mock server repository to run the mock endpoint on `http://localhost:3000`.

4. **Run the application**

   ```sh
   npm run dev
   ```

## Testing

This project includes **unit tests** and E2E tests.

### Unite Tests

To run the unit tests:

```sh
npm test
```

### End-to-End (E2E) Tests

#### Setup

1. Ensure both mock server and app are running

2. Run the E2E suite

```sh
npm run test:e2e
```

Playwright will launch a browser, execute all `*.spec.ts` files under `tests/`, and report pass/fail status.
