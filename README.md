# 📝 React To-Do Manager

A modern and feature-rich task management application built with React and Vite. The application helps users organize tasks efficiently with categories, priorities, due dates, drag-and-drop ordering, dashboard analytics, and persistent storage using Local Storage.

---

## 🚀 Features

* ✅ Create, edit, and delete tasks
* 📂 Organize tasks using categories
* 🔥 Set task priorities (High, Medium, Low)
* 📅 Add and manage due dates
* 🔍 Real-time task search
* 🎯 Filter tasks by status and category
* 📊 Dashboard statistics and completion tracking
* ↕️ Drag-and-drop task reordering
* ⏰ Overdue task highlighting
* 🌙 Dark Mode support
* 💾 Automatic Local Storage persistence
* 🔔 Toast notifications for user actions
* 📱 Fully responsive design

---

## 📸 Screenshots

### Dashboard

(Add Screenshot Here)

### Task Management

(Add Screenshot Here)

### Filters & Search

(Add Screenshot Here)

### Dark Mode

(Add Screenshot Here)

---

## 📂 Project Structure

```text
src
│
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/
│   ├── Filter.jsx
│   ├── TaskInput.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── App.jsx
├── App.css
├── styles.css
└── main.jsx

public/
│
├── favicon.svg
└── icons.svg
```

---

## ⚙️ Technologies Used

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,git,github,vscode" />
</p>

### Additional Concepts

* React Context API
* Local Storage
* Drag & Drop Functionality
* Component-Based Architecture
* Responsive Design
* State Management

---

## 🏗️ Architecture

### Component Structure

```text
App
│
├── TaskInput
│
├── Filter
│
├── TaskList
│   └── TaskItem
│
└── TaskContext
```

### Data Flow

```text
User Action
      │
      ▼
TaskInput / TaskItem
      │
      ▼
TaskContext
      │
      ▼
React State
      │
      ▼
Local Storage
      │
      ▼
UI Re-render
```

---

## 🎯 Key Learnings

* Building scalable React applications
* Context API for state management
* Persisting data with Local Storage
* Component reusability
* Drag-and-drop interactions
* Responsive UI design
* Dark mode implementation
* Managing complex application state

---


## 🌟 Future Improvements

* User Authentication
* Cloud Database Integration
* Task Reminders
* Team Collaboration Features
* Progress Analytics Dashboard

---

⭐ Built with React, Vite, and modern frontend development practices.
