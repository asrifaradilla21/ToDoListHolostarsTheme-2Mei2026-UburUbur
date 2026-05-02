/* ==========================================
   TO-DO LIST HOLOSTARS EN - JAVASCRIPT
   ========================================== */

// ==========================================
// TASK MANAGER CLASS
// ==========================================

class TaskManager {
    constructor() {
        this.tasks = this.loadFromStorage();
        this.currentFilter = {
            category: '',
            status: ''
        };
        this.currentSort = 'priority';
        this.currentTheme = localStorage.getItem('selectedTheme') || 'regis';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme(this.currentTheme);
        this.renderTasks();
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Form submission
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Theme selection
        document.getElementById('theme-select').addEventListener('change', (e) => {
            this.applyTheme(e.target.value);
        });

        // Filters and sorting
        document.getElementById('filter-category').addEventListener('change', (e) => {
            this.currentFilter.category = e.target.value;
            this.renderTasks();
        });

        document.getElementById('filter-status').addEventListener('change', (e) => {
            this.currentFilter.status = e.target.value;
            this.renderTasks();
        });

        document.getElementById('sort-by').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderTasks();
        });

        // Clear completed
        document.getElementById('clear-completed').addEventListener('click', () => {
            this.clearCompleted();
        });
    }

    // ==========================================
    // TASK MANAGEMENT
    // ==========================================

    addTask() {
        const taskName = document.getElementById('task-name').value.trim();
        const taskCategory = document.getElementById('task-category').value;
        const taskPriority = document.getElementById('task-priority').value;
        const taskDeadline = document.getElementById('task-deadline').value;
        const taskDuration = document.getElementById('task-duration').value;
        const taskNotification = document.getElementById('task-notification').value;
        const taskNotes = document.getElementById('task-notes').value.trim();

        // Validation
        if (!this.validateForm(taskName, taskCategory, taskPriority, taskDeadline, taskDuration)) {
            return;
        }

        // Create task object
        const task = {
            id: Date.now(),
            name: taskName,
            category: taskCategory,
            priority: taskPriority,
            deadline: taskDeadline,
            duration: parseInt(taskDuration),
            notification: taskNotification,
            notes: taskNotes,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Add task to array
        this.tasks.unshift(task);
        this.saveToStorage();
        this.renderTasks();
        this.resetForm();
        this.scheduleNotification(task);
        this.showSuccessMessage('Task added successfully! ✨');
    }

    validateForm(name, category, priority, deadline, duration) {
        if (!name) {
            this.showErrorMessage('Please enter a task name.');
            return false;
        }

        if (!category) {
            this.showErrorMessage('Please select a category.');
            return false;
        }

        if (!priority) {
            this.showErrorMessage('Please select a priority level.');
            return false;
        }

        if (!deadline) {
            this.showErrorMessage('Please set a deadline.');
            return false;
        }

        if (!duration || duration <= 0) {
            this.showErrorMessage('Please enter a valid duration.');
            return false;
        }

        const deadlineDate = new Date(deadline);
        if (deadlineDate <= new Date()) {
            this.showErrorMessage('Deadline must be in the future.');
            return false;
        }

        return true;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToStorage();
        this.renderTasks();
        this.showSuccessMessage('Task deleted! 🗑️');
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.renderTasks();
            const message = task.completed ? 'Task marked as complete! ✅' : 'Task marked as incomplete.';
            this.showSuccessMessage(message);
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showErrorMessage('No completed tasks to clear.');
            return;
        }

        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveToStorage();
        this.renderTasks();
        this.showSuccessMessage(`Cleared ${completedCount} completed task(s)! 🎉`);
    }

    // ==========================================
    // FILTERING & SORTING
    // ==========================================

    getFilteredAndSortedTasks() {
        let filtered = this.tasks;

        // Apply filters
        if (this.currentFilter.category) {
            filtered = filtered.filter(task => task.category === this.currentFilter.category);
        }

        if (this.currentFilter.status) {
            if (this.currentFilter.status === 'completed') {
                filtered = filtered.filter(task => task.completed);
            } else if (this.currentFilter.status === 'active') {
                filtered = filtered.filter(task => !task.completed);
            }
        }

        // Apply sorting
        filtered = this.sortTasks(filtered);

        return filtered;
    }

    sortTasks(tasks) {
        const sorted = [...tasks];

        switch (this.currentSort) {
            case 'priority':
                sorted.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
                break;
            case 'deadline':
                sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
                break;
            case 'duration':
                sorted.sort((a, b) => a.duration - b.duration);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return sorted;
    }

    // ==========================================
    // RENDERING
    // ==========================================

    renderTasks() {
        const taskList = document.getElementById('task-list');
        const tasks = this.getFilteredAndSortedTasks();

        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="empty-state">No tasks found. Add one to get started! 🚀</p>';
            return;
        }

        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
        });

        // Update task count
        this.updateTaskStats();
    }

    createTaskElement(task) {
        const template = document.getElementById('task-template');
        const taskElement = template.content.cloneNode(true);

        // Set task ID
        const taskItem = taskElement.querySelector('.task-item');
        taskItem.setAttribute('data-task-id', task.id);

        // Set completed state
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Task name
        taskElement.querySelector('.task-name').textContent = task.name;

        // Category badge
        taskElement.querySelector('.task-category').textContent = task.category;

        // Priority badge
        const priorityLabel = this.getPriorityLabel(task.priority);
        taskElement.querySelector('.task-priority').textContent = priorityLabel;

        // Deadline
        taskElement.querySelector('.task-deadline').textContent = this.formatDeadline(task.deadline);

        // Duration
        taskElement.querySelector('.task-duration').textContent = task.duration;

        // Notes (if any)
        if (task.notes) {
            const notesDisplay = taskElement.querySelector('.task-notes-display');
            notesDisplay.style.display = 'block';
            taskElement.querySelector('.task-notes').textContent = task.notes;
        }

        // Notification (if any)
        if (task.notification !== 'none') {
            const notifDisplay = taskElement.querySelector('.task-notification-display');
            notifDisplay.style.display = 'block';
            taskElement.querySelector('.task-notification').textContent = this.getNotificationLabel(task.notification);
        }

        // Checkbox
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => this.toggleTaskCompletion(task.id));

        // Delete button
        const deleteBtn = taskElement.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        return taskElement;
    }

    getPriorityLabel(priority) {
        const labels = {
            '1': '🔴 Urgent & Important',
            '2': '🟠 Important',
            '3': '🟡 Urgent',
            '4': '🔵 Neither'
        };
        return labels[priority] || 'Unknown';
    }

    getNotificationLabel(notification) {
        const labels = {
            'clock': '🕐 Clock Reminder',
            'message': '💬 Message',
            'email': '📧 Email Notification'
        };
        return labels[notification] || 'None';
    }

    formatDeadline(deadline) {
        const date = new Date(deadline);
        const now = new Date();
        const diffMs = date - now;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays < 0) {
            return `⏰ Overdue: ${date.toLocaleString()}`;
        } else if (diffDays === 0) {
            return `⚠️ Today: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays === 1) {
            return `⏳ Tomorrow: ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return `📅 ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    }

    updateTaskStats() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const activeTasks = totalTasks - completedTasks;

        // Optional: Update header or footer with stats
        console.log(`Total: ${totalTasks} | Completed: ${completedTasks} | Active: ${activeTasks}`);
    }

    // ==========================================
    // THEME MANAGEMENT
    // ==========================================

    applyTheme(themeName) {
        document.body.className = `theme-${themeName}`;
        document.getElementById('theme-select').value = themeName;
        this.currentTheme = themeName;
        localStorage.setItem('selectedTheme', themeName);
    }

    // ==========================================
    // NOTIFICATIONS
    // ==========================================

    scheduleNotification(task) {
        if (task.notification === 'none') return;

        const deadlineDate = new Date(task.deadline);
        const now = new Date();
        const timeUntilDeadline = deadlineDate - now;

        // Schedule notification 15 minutes before deadline
        const reminderTime = timeUntilDeadline - (15 * 60 * 1000);

        if (reminderTime > 0) {
            setTimeout(() => {
                this.sendNotification(task);
            }, reminderTime);
        }
    }

    sendNotification(task) {
        const message = `⏰ Reminder: "${task.name}" is due in 15 minutes!`;

        switch (task.notification) {
            case 'clock':
                this.playClockSound();
                this.showNotificationAlert(message);
                break;
            case 'message':
                this.showNotificationAlert(message);
                break;
            case 'email':
                // In a real app, this would send an email via a backend
                console.log(`Email notification would be sent: ${message}`);
                this.showNotificationAlert(`Email notification scheduled: ${message}`);
                break;
        }
    }

    playClockSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';

        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    showNotificationAlert(message) {
        // Use browser notification if available
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('To-Do List HOLOSTARS EN', {
                body: message,
                icon: '✨'
            });
        } else {
            alert(message);
        }
    }

    // ==========================================
    // STORAGE MANAGEMENT
    // ==========================================

    saveToStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('todoTasks');
        return stored ? JSON.parse(stored) : [];
    }

    // ==========================================
    // UI FEEDBACK
    // ==========================================

    resetForm() {
        document.getElementById('task-form').reset();
        document.getElementById('task-name').focus();
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Create temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            font-weight: 600;
        `;

        document.body.appendChild(messageDiv);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        if (!document.querySelector('style[data-message-animation]')) {
            style.setAttribute('data-message-animation', 'true');
            document.head.appendChild(style);
        }

        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    window.taskManager = taskManager; // For debugging
});

// ==========================================
// SERVICE WORKER REGISTRATION (Optional)
// ==========================================

// Register service worker if available (for PWA functionality)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        // Service worker registration failed - app still works
    });
}
