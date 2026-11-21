# Daily Space – Project Documentation

## 1. Project Overview

**Daily Space** is a simple To-Do List Life Dashboard designed to help users organize their daily activities.

The dashboard provides a clean and minimal interface where users can manage tasks, track time, use a focus timer, and access their favorite websites.

The project is designed as a responsive web application that works in modern browsers.

## 2. Technology Stack

The project must use the following technologies:

- **HTML5** – Website structure and semantic elements.
- **CSS3** – Styling, layout, animations, and responsive design.
- **Vanilla JavaScript** – Interactive features and DOM manipulation.
- **Local Storage API** – Client-side data persistence.

Do not use frameworks or libraries such as React, Vue, or Angular.

No backend server or database is required.

## 3. Technical Constraints

### TC-1: Technology Stack
- Use HTML for structure.
- Use CSS for styling.
- Use Vanilla JavaScript for functionality.
- No frontend frameworks.
- No backend server required.

### TC-2: Data Storage
- Use the browser Local Storage API.
- Store all application data locally.
- Tasks, user preferences, and quick links must persist after refreshing the page.

### TC-3: Browser Compatibility
- Support modern browsers:
  - Google Chrome
  - Mozilla Firefox
  - Microsoft Edge
  - Safari
- The website should work as a standalone web application.

## 4. Required Features (MVP)

### 4.1 Greeting and Clock
- Display the current time.
- Display the current date.
- Show a greeting based on the time of day.
- Allow users to customize their display name.

### 4.2 Focus Timer
- Default duration: 25 minutes.
- Provide Start, Stop/Pause, and Reset buttons.
- Display the remaining time clearly.
- Update the timer without reloading the page.

### 4.3 To-Do List
- Add new tasks.
- Edit existing tasks.
- Mark tasks as completed.
- Delete tasks.
- Save tasks using Local Storage.
- Prevent duplicate tasks.
- Provide task sorting options.

### 4.4 Quick Links
- Display favorite website shortcuts.
- Allow users to add and delete links.
- Open links in a new browser tab.
- Save quick links using Local Storage.

## 5. Selected Challenges

The project will implement three additional challenges:

1. **Custom Name in Greeting**
   - Users can enter their preferred display name.
   - The greeting should display the saved name.

2. **Prevent Duplicate Tasks**
   - Prevent users from adding tasks with identical names.
   - Ignore leading and trailing spaces when checking duplicates.

3. **Sort Tasks**
   - Default sorting.
   - Alphabetical order (A–Z).
   - Uncompleted tasks first.
   - Completed tasks first.

## 6. Visual Design

### Design Concept
A clean, minimal, warm, and elegant dashboard.

### Color Palette
Use a light theme with cream and white colors.

Suggested colors:

- Background: `#F7F5EF`
- Surface: `#FFFFFF`
- Primary: `#D8C7A3`
- Secondary: `#EAE3D5`
- Text: `#34332F`
- Muted Text: `#858078`
- Border: `#EAE6DE`

### Design Guidelines
- Use a clean and readable typography system.
- Maintain clear visual hierarchy.
- Use rounded cards and subtle shadows.
- Avoid excessive decorative elements.
- Ensure sufficient contrast.
- Use responsive layouts for desktop, tablet, and mobile.

## 7. Folder Structure

Maintain the following project structure:

```text
Daily-Space/
│
├── .kiro/
│   └── (Kiro configuration files)
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
├── projek.md
└── README.md
```

### Folder Rules
- Only one CSS file inside `css/`.
- Only one JavaScript file inside `js/`.
- Keep `index.html` in the project root.
- Keep website assets and source files outside `.kiro/`.
- Keep the code clean, readable, and organized.

## 8. Code Quality

- Use semantic HTML elements whenever possible.
- Avoid unnecessary `<div>` elements.
- Use meaningful class and variable names.
- Keep JavaScript functions organized.
- Avoid unnecessary code duplication.
- Write comments for important logic.
- Ensure all HTML, CSS, and JavaScript references use the correct file paths.

## 9. GitHub and Deployment

The project will be managed using GitHub Desktop.

Workflow:

1. Develop the website locally.
2. Test the website using a local development server.
3. Save changes using GitHub Desktop.
4. Commit changes to the main branch.
5. Push changes to GitHub.
6. Publish the website using GitHub Pages.

GitHub Pages must use:

- Source: Deploy from a branch.
- Branch: `main`.
- Folder: `/ (root)`.

The `index.html` file must remain in the repository root.

## 10. Development Priority

Implement the project in the following order:

1. HTML structure.
2. CSS styling and responsive layout.
3. Greeting and live clock.
4. Focus timer.
5. To-Do List functionality.
6. Quick Links functionality.
7. Local Storage integration.
8. Selected challenges.
9. Final testing and GitHub Pages deployment.

## 11. Important Instructions for AI Agent

When modifying this project:

- Follow all technical constraints.
- Do not introduce unnecessary frameworks or dependencies.
- Preserve the existing project structure.
- Do not move website source files into `.kiro/`.
- Keep all website files in their designated locations.
- Do not create additional CSS or JavaScript files.
- Do not remove existing working features without permission.
- Make changes incrementally and explain important modifications.
- Verify that HTML references match the actual CSS and JavaScript filenames.

**Main Goal:** Build a functional, responsive, and visually consistent Daily Space dashboard using only HTML, CSS, and Vanilla JavaScript.