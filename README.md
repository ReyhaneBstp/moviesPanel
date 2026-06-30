# 🎬 DoneBoard - Movies Dashboard

A modern, feature-rich movie management dashboard built with React, TypeScript, and Vite. This application provides a sleek interface for browsing, searching, filtering, and managing movie collections with advanced features like bulk operations, real-time filtering, and a responsive design.

![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38B2AC?logo=tailwind-css&logoColor=white)

---

## ✨ Features

### Core Functionality
- **Movie Catalog Browsing** - View a comprehensive list of movies with poster images, ratings, genres, and metadata
- **Advanced Search** - Real-time search with debouncing to find movies by title instantly
- **Smart Filtering** - Filter movies by:
  - Genre (Crime, Drama, Action, etc.)
  - Country of origin
  - Year of release
  - IMDB rating range
  - Active/Inactive status
- **URL-Based Filters** - All filters are synced with URL parameters for shareable links
- **Bulk Operations** - Select multiple movies and perform batch actions:
  - Bulk activate/deactivate
  - Bulk delete with confirmation dialogs
- **Edit Movie Details** - Update movie information through an intuitive dialog interface
- **Responsive Design** - Fully responsive layout with mobile and desktop sidebars
- **Virtual Scrolling** - Optimized rendering for large movie lists using `@tanstack/react-virtual`
- **Loading States** - Skeleton screens and loading indicators for better UX
- **Error Handling** - Graceful error states with retry functionality
- **Snackbar Notifications** - Toast notifications for user actions and feedback

### Technical Highlights
- **State Management** - Zustand for lightweight, performant global state
- **Modern React** - React 19 with hooks and functional components
- **Type Safety** - Full TypeScript coverage with strict typing
- **Code Splitting** - Optimized bundle with lazy loading
- **Mock API Server** - JSON Server for development and testing
- **Beautiful UI** -  Tailwind CSS 4
- **RTL Support** - Right-to-left layout for Persian/Arabic interfaces

---

## 🛠️ Technologies & Tools

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.6 | UI framework |
| **TypeScript** | 6.0.2 | Type-safe JavaScript |
| **Vite** | 8.0.12 | Build tool and dev server |
| **Tailwind CSS** | 4.3.1 | Utility-first CSS framework |
| **React Router** | 7.17.0 | Client-side routing |
| **Zustand** | 5.0.14 | State management |
| **React Virtual** | 3.14.2 | Virtual scrolling for performance |
| **React Icons** | 5.6.0 | Icon library |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 10.3.0 | Code linting |
| **TypeScript ESLint** | 8.59.2 | TypeScript linting rules |
| **JSON Server** | 1.0.0-beta.15 | Mock REST API |
| **Concurrently** | 10.0.3 | Run multiple commands |

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** - Version 18.x or higher ([Download](https://nodejs.org/))
- **pnpm** - Version 8.x or higher (recommended package manager)
  ```bash
  npm install -g pnpm
  ```

---

## 🚀 Installation and Setup

Follow these steps to get the project running locally:

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd moviesDashboard
```

### 2. Install Dependencies
```bash
pnpm install
```

This will also automatically install mock server dependencies via the `postinstall` script.

### 3. Start the Development Server
```bash
pnpm run dev
```

This command concurrently starts:
- **Vite dev server** on `http://localhost:5173`
- **Mock API server** on `http://localhost:4000`

### 4. Open in Browser
Navigate to `http://localhost:5173` to view the application.

---

## 📖 Usage

### Available Scripts

```bash
# Run both Vite and mock server concurrently
pnpm run dev

# Run only Vite dev server
pnpm run dev:vite

# Run only mock API server
pnpm run dev:mock

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run ESLint
pnpm run lint
```

### Using the Dashboard

1. **Browse Movies** - Scroll through the movie list with virtual scrolling
2. **Search** - Use the search bar to find movies by title
3. **Filter** - Apply filters by genre, country, year, rating, or status
4. **Select Multiple** - Check boxes to select movies for bulk operations
5. **Edit** - Click on a movie to edit its details
6. **Bulk Actions** - Activate, deactivate, or delete multiple movies at once

---

