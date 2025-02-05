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
├── __tests__/             # Unit testing
│   ├── cartUtils.test.ts  # Tests for trolley utilities
├── public/                # Static files
├── src/
│   ├── app/               # Next.js main routes and configuration
│   │   ├── cart/          # Cart page
│   │   ├── products/      # Product details page
│   │   ├── favicon.ico    # Application icon
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Page page
│   ├── components/        # Reusable components
│   │   ├── Header.tsx     # Header of the application
│   │   ├── ProductGrid.tsx # Product grid
│   │   └── SearchInput.tsx # Search input component
│   ├── context/           # Context API
│   │   └── CartContext.tsx # Cart status management
│   ├── styles/            # CSS style files
│   │   ├── cart.module.css
│   │   ├── Header.module.css
│   │   ├── Page.module.css
│   │   ├── cart.module.css
│   │   └── ProductGrid.module.css
│   ├── utils/             # Application utilities
│   │   ├── apiClient.ts   # API calls
│   │   └── cartUtils.ts   # Auxiliary functions for the trolley
├── .env                   # Environment variables
├── jest.config.js         # Jest configuration
├── jest.setup.ts          # Initial configuration file for Jest
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation

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
- Critical functions, such as addToCart, have unit tests implemented with Jest.

## Future Improvements

- Implement integration tests for interaction between components.
- Add animations to improve user experience.
- Improving design and performance
- Add more eslint rules
