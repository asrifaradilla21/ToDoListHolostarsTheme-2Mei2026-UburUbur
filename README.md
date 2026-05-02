# 📝 To-Do List HOLOSTARS EN Theme

A feature-rich, modern web-based task management application with multiple HOLOSTARS character-themed color schemes. Built with vanilla HTML, CSS, and JavaScript with no dependencies or backend required.

## ✨ Features

### MVP Features

#### Task Management
- ✅ **Task Creation**: Add tasks with complete details
- 📂 **Categories**: Organize tasks by (Work, Class, Homework, Holiday, Fun, Personal, Home)
- 🔴 **Priority System**: Sort by urgency levels
  - 🔴 Urgent & Important
  - 🟠 Important (Not Urgent)
  - 🟡 Urgent (Not Important)
  - 🔵 Neither
- 📋 **Task List Display**: View all tasks with real-time updates
- ✔️ **Checkbox Feature**: Mark tasks as completed/incomplete
- 🗑️ **Delete Tasks**: Remove tasks from the list

#### Deadline Management
- 📅 **Specific Deadline**: Set date and time for task completion
- ⏱️ **Duration Estimation**: Add estimated time needed for task
- 📊 **Time Management**: View remaining time until deadline
- ⏰ **Deadline Indicators**:
  - ⏰ Overdue (red indicator)
  - ⚠️ Due today
  - ⏳ Due tomorrow
  - 📅 Future deadlines

#### Notifications & Reminders
- 🕐 **Clock Reminder**: Audio notification 15 minutes before deadline
- 💬 **Message Notification**: Pop-up reminder message
- 📧 **Email Notification**: Scheduled email alerts (placeholder)
- 🔔 **Browser Notifications**: Desktop notifications with permission

#### Additional Features
- 📝 **Additional Notes**: Store detailed information for each task
- 🎯 **Auto-Update**: Real-time UI updates when tasks change
- ✅ **Input Validation**: All fields are validated before submission
- 🎨 **11 Theme Colors**: Switch between HOLOSTARS character themes
- 💾 **Local Storage**: All data persists in browser

### Filtering & Sorting
- 🔍 **Filter by Category**: View tasks by specific category
- 📌 **Filter by Status**: Show active or completed tasks
- 📊 **Sort Options**:
  - By Priority (default)
  - By Deadline
  - By Duration
  - By Name (A-Z)
- 🧹 **Clear Completed**: Remove all completed tasks at once

## 🎨 HOLOSTARS Character Themes

1. **Regis Altare** - Primary: #54ACDC, Secondary: #4652B4
2. **Magni Dezmond** - Primary: #463464, Secondary: #DBC78C
3. **Axel Syrios** - Primary: #FF9603, Secondary: #2E2E2E
4. **Noir Vesper** - Primary: #C8CCD0, Secondary: #3D4248
5. **Gavis Bettel** - Primary: #EB3DA2, Secondary: #3C1E78
6. **Machina X Flayon** - Primary: #DD3F34, Secondary: #32363E
7. **Banzoin Hakka** - Primary: #BC83F4, Secondary: #3E214A
8. **Josuiji Shinri** - Primary: #A33926, Secondary: #F7932F
9. **Jurard T Rexford** - Primary: #8F1F2C, Secondary: #EFC595
10. **Goldbullet** - Primary: #27756f, Secondary: #573e40
11. **Octavio** - Primary: #970c47, Secondary: #121b4a
12. **Crimzon Ruze** - Primary: #b03b33, Secondary: #413a87

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser Local Storage API
- **No Backend Required**: Fully client-side application
- **No Framework Dependencies**: Pure vanilla code
- **Browser Support**: Chrome, Firefox, Edge, Safari (modern versions)

## 📁 Project Structure

```
ToDoListHolostarsTheme-2Mei2026-UburUbur/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and 11 themes
├── js/
│   └── app.js          # All JavaScript functionality
└── README.md           # This file
```

## 🚀 Getting Started

### Installation
1. Download or clone the project files
2. No installation or dependencies required!

### Usage
1. Open `index.html` in any modern web browser
2. Start adding tasks immediately
3. No sign-up or login required

### As Standalone Web App
- Add bookmark to home screen (Android/iOS)
- Appears as app icon on home screen

## 📋 How to Use

### Adding a Task
1. Fill in all required fields:
   - **Task Name**: What you need to do
   - **Category**: Categorize your task
   - **Priority**: Select urgency level
   - **Deadline**: Date and time
   - **Duration**: Estimated time in minutes
2. Optional:
   - **Notification Type**: Choose reminder method
   - **Additional Notes**: Add details
3. Click "Add Task"
4. Task appears in the list sorted by priority

### Managing Tasks
- **Mark Complete**: Click the checkbox next to task name
- **Delete**: Click the × button on the right
- **Filter**: Use the filter dropdowns to view specific tasks
- **Sort**: Change sort order from the dropdown
- **Clear Completed**: Remove all finished tasks at once

### Customizing
- **Change Theme**: Select from 11 HOLOSTARS character themes
- Theme choice is saved automatically
- All tasks persist when you close and reopen the browser

## 💾 Data Storage

- All tasks are saved to browser Local Storage
- Data persists across browser sessions
- Clear browser cache to delete all data
- No personal data is sent to any server

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast colors
- Clear visual hierarchy

## 📱 Responsive Design

- **Desktop**: Full feature display
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly interface

## ⚡ Performance

- Fast load time (< 1 second)
- Smooth animations and transitions
- No lag when updating tasks
- Optimized for modern browsers

## 🐛 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ Not Supported |

## 📝 Non-Functional Requirements Met

### NFR-1: Simplicity
- ✅ Clean, minimal interface
- ✅ Easy to understand and use
- ✅ No complex setup required
- ✅ No test setup required

### NFR-2: Performance
- ✅ Fast load time
- ✅ Responsive UI interactions
- ✅ No noticeable lag

### NFR-3: Visual Design
- ✅ User-friendly aesthetic
- ✅ Clear visual hierarchy
- ✅ Readable typography
- ✅ 11 changeable color themes

## 🎓 Code Organization

### Folder Rules Followed
- ✅ Only 1 CSS file in `/css/`
- ✅ Only 1 JavaScript file in `/js/`
- ✅ Clean and readable code
- ✅ Well-commented sections
- ✅ Consistent naming conventions

### JavaScript Architecture
- **TaskManager Class**: Handles all app logic
- **Event Handling**: Comprehensive event listeners
- **Modular Functions**: Separated concerns
- **Comments**: Clear documentation

## 🔒 Security & Privacy

- No external API calls
- No tracking or analytics
- All data stored locally on your device
- No login or authentication
- Completely private

## 🎯 Future Enhancement Ideas

- Recurring tasks
- Task categories with custom colors
- Time tracking
- Statistics dashboard
- Export/import functionality
- Dark mode toggle
- Kanban board view
- Collaboration features

## 📄 License

Free to use and modify for personal and educational purposes.

## 👥 Credits

Created for CODECAMP RevoU
Theme colors inspired by HOLOSTARS EN members

---

**Made with ❤️ | To-Do List HOLOSTARS EN Theme**
