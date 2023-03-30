// Get the required DOM elements
const form = document.querySelector('#add-task-form');
const input = document.querySelector('.add-task');
const list = document.querySelector('.to-do');
const clearBtn = document.querySelector('.btn');

// Initialize the activities array from local storage or with default values
let activities = JSON.parse(localStorage.getItem('activities')) || [
  {
    index: 0,
    description: 'Complete house chores',
    completed: false,
  },
  {
    index: 1,
    description: 'Buy Groceries',
    completed: false,
  },
  {
    index: 2,
    description: 'Complete To Do list project',
    completed: false,
  },
  {
    index: 3,
    description: 'Play Call of Duty',
    completed: false,
  },
];

// Render the list of activities
function renderActivities() {
  // Clear the existing list
  list.innerHTML = '';

  // Render each activity item
  activities.forEach((activity, index) => {
    const item = document.createElement('li');
    item.classList.add('lst');
    item.innerHTML = `
      <div>
        <input type="checkbox" ${activity.completed ? 'checked' : ''}>
        <input type="text" value="${activity.description}" class="txt-inp" max-length"200">
      </div>
      <i class='fas fa-trash-alt'></i>
    `;
    list.appendChild(item);

    // Add event listener for checkbox changes
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      activity.completed = checkbox.checked;
      saveActivities();
    });

    // Add event listener for delete icon click
    const deleteIcon = item.querySelector('.fa-trash-alt');
    deleteIcon.addEventListener('click', () => {
      deleteActivity(index);
    });

    // Add event listener for text input changes
    const textInput = item.querySelector('input[type="text"]');
    textInput.addEventListener('input', () => {
      activity.description = textInput.value;
      saveActivities();
    });
  });
}

// Add a new activity to the list
function addActivity(description) {
  const newActivity = {
    index: activities.length,
    description: description,
    completed: false,
  };
  activities.push(newActivity);
  saveActivities();
}

// Delete an activity from the list
function deleteActivity(index) {
  activities.splice(index, 1);
  // Update the indexes of remaining activities
  activities.forEach((activity, i) => {
    activity.index = i;
  });
  saveActivities();
}

// Clear all completed activities from the list
function clearCompletedActivities() {
  activities = activities.filter(activity => !activity.completed);
  saveActivities();
}

// Save the activities to local storage
function saveActivities() {
  localStorage.setItem('activities', JSON.stringify(activities));
  renderActivities();
}

// Event listener for form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const description = input.value.trim();
  if (description !== '') {
    addActivity(description);
    input.value = '';
  }
});

// Event listener for clear button click
clearBtn.addEventListener('click', () => {
  clearCompletedActivities();
});

// Render the initial list of activities
renderActivities();

/* NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */

