# Skillzy - Learn, Grow, Thrive

Skillzy is a modern e-learning platform designed to help users explore, enroll, and manage courses effortlessly. Built with React, Redux, and Tailwind CSS, Skillzy provides a seamless and responsive user experience.

## Features

- **User Authentication**: Sign up and log in as a User or Admin.
- **Dynamic Role-Based Routing**: Access specific routes based on user roles.
- **Course Management**:
  - View all available courses.
  - Enroll in courses and manage them in "My Courses."
- **Responsive Design**: Optimized for all devices using Tailwind CSS.
- **State Management**: Powered by Redux Toolkit for efficient state handling.

## Tech Stack

- **Frontend**: React, React Router, Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/skillzy.git
   cd skillzy/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## Folder Structure

```
client/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components (Navbar, Sidebar, Cards, etc.)
│   ├── pages/             # Page components (Homepage, Authpage, etc.)
│   ├── utils/             # Redux slices, constants, and store
│   ├── App.jsx            # Main app component
│   ├── Body.jsx           # Layout component with routing
│   ├── index.css          # Global styles
│   ├── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code issues.

## Environment Variables

Ensure the following environment variables are set:

- `BASE_URL`: The base URL of the backend API (e.g., `http://localhost:6969`).

## Key Components

### `Authpage.jsx`
- Handles user authentication (Sign In/Sign Up).
- Role-based dropdown for User/Admin selection.

### `MyCourses.jsx`
- Displays enrolled courses for the logged-in user.
- Includes loading spinners and empty state handling.

### `Coursepage.jsx`
- Displays detailed information about a specific course.

### `Homepage.jsx`
- Highlights top courses and provides a welcoming interface.

### `Sidebar.jsx` and `Navbar.jsx`
- Navigation components for seamless user experience.

## Styling

- Tailwind CSS is used for consistent and responsive design.
- Custom fonts and color variables are defined in `index.css`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
