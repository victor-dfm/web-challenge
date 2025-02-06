## Web Challenge


## Description

This project is a web application designed for browsing and managing a product catalogue with shopping cart 
functionality. Users can browse products, view individual details, select specific configurations (such as storage and 
colour) and add products to the cart.

The application is built with Next.js and TypeScript, and uses React Context API for cart management. It also includes 
image optimisation with next/image, testing with Jest, and a modular structure for easy maintenance.

## Features

- Product display: Displays products in a grid layout.
- Real-time search: Filter products using lodash.debounce to optimise searches.
- Detail view: Explore product details, including despecifications, storage options and available colours.
- Shopping cart: Manage a shopping cart with persistence in localStorage.
- Unit tests: Includes tests with Jest to validate key functions.

## Installation

Follow these steps to set up and run the project locally.

Prerequisites:

- Node.js version 18. 
- npm as a package manager.

Steps:

```bash
git clone https://github.com/victor-dfm/web-challenge.git

npm install

npm run dev
```

## Scripts:

- npm run dev: Starts the development server.
- npm run build: Builds the application for production.
- npm start: Serves the built application.
- npm run lint: Run static code analysis with ESLint.
- npm run test: Runs the tests with Jest.

## Project Structure:

```bash
web-challenge/
├── public/                    # Static files (e.g., images, icons)
├── src/
│   ├── __tests__/              # Unit and integration tests
│   │   ├── components/         # Tests for reusable components
│   │   │   ├── header.test.tsx
│   │   │   ├── product-grid.test.tsx
│   │   │   ├── search-input.test.tsx
│   │   ├── context/            # Tests for context management
│   │   │   ├── cart-context.test.tsx
│   │   ├── pages/              # Tests for individual pages
│   │   │   ├── products/
│   │   │   │   ├── [id]/product-details.test.tsx
│   │   ├── utils/              # Tests for utility functions
│   │   │   ├── api-client.test.ts
│   │   │   ├── cart-utils.test.ts
│   ├── app/                    # Next.js main routes and pages
│   │   ├── cart/               # Shopping cart page
│   │   ├── products/           # Product details page
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── product-details.module.css
│   │   ├── favicon.ico         # Application icon
│   │   ├── home.module.css     # Global styling
│   │   ├── layout.tsx          # Main layout for the app
│   │   ├── page.tsx            # Main page entry point
│   ├── components/             # Reusable components
│   │   ├── header/
│   │   │   ├── header.module.css
│   │   │   ├── header.tsx
│   │   ├── product-grid/
│   │   │   ├── product-grid.module.css
│   │   │   ├── product-grid.tsx
│   │   ├── search-input/
│   │   │   ├── search-input.module.css
│   │   │   ├── search-input.tsx
│   ├── context/                # Global state management
│   │   ├── cart-context.tsx
│   ├── styles/                 # Global and modular styles
│   │   ├── globals.css
│   ├── utils/                  # Utility functions
│   │   ├── api-client.ts
│   │   ├── cart-utils.ts
├── .env                         # Environment variables
├── jest.config.js               # Jest configuration
├── jest.setup.js                # Jest setup file
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation

```

## Architecture

Next.js and React:
- Uses the built-in Next.js router to handle dynamic views and static routes.
- Uses React for user interface interaction.

Context API:
- CartContext handles the global state of the cart.

Persistence:
- Cart data is stored in localStorage to maintain state between sessions.

Image optimisation:
- Uses the next/image component to optimise images.

Testing:
- Critical functions with unit tests implemented with Jest.

## Future Improvements

- Implement integration tests for interaction between components.
- Add animations to improve user experience.
- Improving design and performance
- Add more eslint rules
- Add more test
