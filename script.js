// Simple Habit Tracker - JavaScript

// Get HTML elements
var habitInput = document.getElementById("habitInput");
var addHabitBtn = document.getElementById("addHabitBtn");
var habitsList = document.getElementById("habitsList");
var emptyHabits = document.getElementById("emptyHabits");
var totalHabitsEl = document.getElementById("totalHabits");

// Array to store habits
var habits = [];

// Add habit button click
addHabitBtn.onclick = function() {
    var habitName = habitInput.value.trim();
    if (habitName === "") {
        alert("Please enter a habit name");
        return;
    }
    
    // Create habit object
    var habit = {
        id: Date.now(),
        name: habitName,
        completed: false
    };
    
    // Add to array
    habits.push(habit);
    
    // Clear input
    habitInput.value = "";
    
    // Update display
    renderHabits();
};

// Delete habit function
function deleteHabit(id) {
    habits = habits.filter(function(h) {
        return h.id !== id;
    });
    renderHabits();
}

// Toggle habit completion
function toggleHabit(id) {
    for (var i = 0; i < habits.length; i++) {
        if (habits[i].id === id) {
            habits[i].completed = !habits[i].completed;
            break;
        }
    }
    renderHabits();
}

// Render habits to the page
function renderHabits() {
    habitsList.innerHTML = "";
    
    if (habits.length === 0) {
        emptyHabits.style.display = "block";
    } else {
        emptyHabits.style.display = "none";
    }
    
    totalHabitsEl.textContent = habits.length;
    
    for (var i = 0; i < habits.length; i++) {
        var habit = habits[i];
        
        var li = document.createElement("li");
        li.className = "habit-item";
        
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "habit-check";
        checkbox.checked = habit.completed;
        checkbox.onclick = (function(id) {
            return function() {
                toggleHabit(id);
            };
        })(habit.id);
        
        var span = document.createElement("span");
        span.className = "habit-name";
        span.textContent = habit.name;
        if (habit.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "#888";
        }
        
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = (function(id) {
            return function() {
                deleteHabit(id);
            };
        })(habit.id);
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        habitsList.appendChild(li);
    }
}

// Allow pressing Enter to add habit
habitInput.onkeypress = function(e) {
    if (e.key === "Enter") {
        addHabitBtn.click();
    }
};
