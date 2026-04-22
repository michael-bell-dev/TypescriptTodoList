# TypeScript Todo List

A lightweight, client-side todo list application built with TypeScript that demonstrates structured state management, modular architecture, and persistent local storage.

This project focuses on building a maintainable frontend architecture without frameworks, using manual state control and DOM rendering.

---

## Features

- Add, edit, and delete tasks
- Inline editing with keyboard support (Enter to save, Escape to cancel)
- Checkbox completion state
- Drag-and-drop reordering
- Persistent storage using `localStorage`
- Automatic state rehydration on page load
- Modular architecture (separated model, state, and view layers)

---

## User Interactions

### Task Management
- Add new tasks via form input
- Delete tasks with a single click

### Editing
- Click task text to enter edit mode
- Press **Enter** to save changes
- Press **Escape** or blur to cancel/save depending on context

### Reordering
- Drag and drop tasks to reorder them dynamically
- Order is persisted automatically

### Completion
- Toggle task completion using checkboxes

---

## Running the Project

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
