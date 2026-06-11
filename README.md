# To-Do Manager

A polished React + Vite task manager with persistence, categories, priorities, due dates, drag-and-drop ordering, and theme support.

## Features

- Save tasks to Local Storage automatically.
- Load saved tasks when the app starts and preserve data after refresh.
- Edit existing tasks inline with category, priority, and due date updates.
- Search tasks in real time by task title.
- Filter tasks by status (all/completed/pending) and category.
- Sort tasks by priority or preserve a custom drag-and-drop order.
- Highlight overdue tasks and warn for upcoming deadlines.
- Toggle dark mode and persist theme preference.
- Dashboard statistics for total, completed, pending, and completion percentage.
- Toast notifications on add, update, delete, complete, and reorder actions.
- Mobile-first responsive UI.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Notes

This project uses React 19, Vite, and React Toastify for notifications. State is managed with React Context and persisted in Local Storage for a professional user experience.