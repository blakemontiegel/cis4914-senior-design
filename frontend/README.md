# Sideline Frontend

A React frontend for multi-angle soccer match recording and viewing.

## Features

- User authentication with JWT
- Mobile-first responsive design
- Multi-angle video playback
- Live game session recording
- User profile management

## Tech Stack

- React 18 with hooks
- React Router v6 for routing
- Axios for API calls
- Font Awesome for icons
- Jersey 10 Google Font
- Mobile-first CSS with responsive breakpoints

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── ProtectedRoute.js # Route protection
├── context/            # React context providers
│   └── AuthContext.js  # Authentication state
├── hooks/              # Custom hooks
│   └── useAuth.js      # Auth context hook
├── pages/              # Page components
│   ├── Home.js         # Dashboard
│   ├── Login.js        # Authentication
│   ├── GameSession.js  # Live recording
│   ├── VideoViewer.js  # Multi-angle playback
│   └── Profile.js      # User profile
└── App.js              # Main app component
```

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.

### `npm run eject`

**Note: this is a one-way operation!** Ejects from Create React App.

## Authentication

The app uses JWT-based authentication. Currently implements mock login for development. Update `AuthContext.js` to connect to your backend API.

## Responsive Design

Built mobile-first with a 500px breakpoint for larger screens. All components are fully responsive.

## Contributing

1. Follow the existing code style
2. Add comments for complex logic
3. Test on multiple screen sizes
4. Update this README for new features
