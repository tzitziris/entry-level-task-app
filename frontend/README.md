## Task Manager – Frontend (React + Vite)

### Project overview
This is the frontend of a Task Manager application built with React and Vite. It provides a comprehensive task management interface with advanced features:

**Core Features:**
- Create new tasks (title and description)
- View a paginated list of existing tasks
- Real-time task counter with pagination info
- Responsive error handling and loading states

![img.png](img.png)
![img_2.png](img_2.png)

The app communicates with a backend API (Spring Boot) over HTTP. By default, it expects the backend to be available at `http://localhost:8080` and expose a `GET /tasks` endpoint to retrieve tasks and a `POST /tasks` endpoint to create new ones.

**Technical Implementation:**
- **Tech Stack**: React 18, Vite 5, modern ES modules
- **State Management**: React hooks (`useState`, `useEffect`, `useMemo`) for local state
- **Data Fetching**: Native `fetch` API with comprehensive error handling
- **Performance**: Optimized rendering with `useMemo` for pagination calculations

**Component Architecture:**
- **`App.jsx`**: Main application component with global state management
  - Manages tasks array, loading, and error states
  - Handles data fetching with proper error boundaries
  - Implements optimistic updates for new tasks
- **`TaskForm.jsx`**: Form component for task creation
  - Client-side validation (required fields)
  - Form reset after successful submission
  - Error handling with user-friendly alerts
- **`TaskList.jsx`**: Advanced task display component
  - **Pagination**: 10 tasks per page with navigation controls
  - **Smart State Management**: Auto-resets to page 1 when tasks change
  - **Performance Optimization**: Uses `useMemo` for efficient pagination
  - **Multiple UI States**: Loading, error, empty, and populated states
  - **Task Counter**: Shows current range (e.g., "1–10 of 25")

**Advanced React Patterns Used:**
- **Custom Hooks**: State management with proper dependency arrays
- **Memoization**: `useMemo` for expensive pagination calculations
- **Effect Cleanup**: Proper `useEffect` usage with dependency management
- **Conditional Rendering**: Multiple UI states based on data availability
- **Event Handling**: Form submission with preventDefault and validation

**Styling**: Modern CSS included in `src/App.css` and `src/index.css` with responsive design

### React Features & Implementation Details

#### 1. **Pagination System**
- **Implementation**: Custom pagination logic in `TaskList.jsx`
- **Features**:
  - 10 tasks per page (configurable via `pageSize` constant)
  - Previous/Next navigation buttons with disabled states
  - Page counter display ("Page X of Y")
  - Auto-reset to page 1 when task list changes
  - Smart range display ("1–10 of 25 tasks")

#### 2. **State Management**
- **Global State** (`App.jsx`):
  - `tasks`: Array of all tasks from API
  - `loading`: Boolean for loading states
  - `error`: String for error messages
- **Local State** (`TaskForm.jsx`):
  - `title` & `description`: Form input values
- **Pagination State** (`TaskList.jsx`):
  - `currentPage`: Current page number

#### 3. **Performance Optimizations**
- **`useMemo` Hook**: Memoizes pagination calculations to prevent unnecessary re-renders
- **Efficient Slicing**: Only renders current page tasks instead of entire list
- **Optimistic Updates**: New tasks added immediately to UI before API confirmation

#### 4. **Error Handling & UX**
- **Loading States**: Shows "Loading tasks..." during API calls
- **Error States**: Displays connection errors with helpful messages
- **Empty States**: Shows "No tasks available" when list is empty
- **Form Validation**: Client-side validation for required fields
- **User Feedback**: Alert messages for form submission errors

#### 5. **React Hooks Usage**
- **`useState`**: For all component state management
- **`useEffect`**: For API calls on component mount and task changes
- **`useMemo`**: For expensive pagination calculations
- **Proper Dependencies**: All hooks use correct dependency arrays

#### 6. **Component Communication**
- **Props Down**: Data flows from App → TaskList/TaskForm
- **Events Up**: TaskForm calls `onAddTask` callback to update parent state
- **State Lifting**: Task management centralized in App component

#### 7. **Modern React Patterns**
- **Functional Components**: All components use modern function syntax
- **Hooks-based**: No class components, pure hooks implementation
- **Controlled Components**: Form inputs are fully controlled
- **Conditional Rendering**: Multiple UI states based on data/loading/error conditions

### Setup instructions

Prerequisites:
- Node.js 18+ and npm
- Backend API running locally (Spring Boot) on `http://localhost:8080`

1) Install dependencies
```bash
npm install
```

2) (Optional) Configure API base URL
- By default, the app calls `http://localhost:8080`. To change it, create a `.env` file in this folder and set:
```bash
echo "VITE_API_URL=http://localhost:8080" > .env
```
- You can then reference `import.meta.env.VITE_API_URL` inside the code if you wire it up in a small service layer.

3) Start the development server
```bash
npm run dev
```
- Open the printed URL (usually `http://localhost:5173`).

4) Build for production
```bash
npm run build
```

5) Preview the production build locally
```bash
npm run preview
```

### Backend expectations
- Must allow CORS from the Vite dev server (e.g., `http://localhost:5173`).
- Exposes the following endpoints:
  - `GET /tasks` → returns an array of tasks like `{ id, title, description }`
  - `POST /tasks` → creates a new task from `{ title, description }` and returns the created task
- **Note**: Pagination is handled entirely on the frontend. The backend should return all tasks, and the React app manages pagination client-side for optimal performance.
- If the backend is down or CORS is not configured, the UI will show a connection error with helpful messaging.

### Common issues
- CORS errors: Ensure the backend enables CORS for the frontend origin.
- Connection errors: Verify the backend is running on the expected port and endpoints.
- Port conflicts: If Vite’s default port (5173) is in use, Vite will select another; use the printed URL.
