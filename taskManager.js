let tasks = [];

function addTask(title, dueTime, priority) {
  try {
    if (!title || !dueTime || !priority) {
      throw new Error("Missing required fields: title, dueTime, or priority.");
    }
    const task = {
      title,
      dueTime,  
      priority, 
      createdAt: new Date()
    };

    tasks.push(task);
  } catch (error) {
    console.error("Error adding task:", error.message);
  }
}


function sortTasksByPriority() {
  return tasks.sort((a, b) => b.priority - a.priority);
}


function getTasksDueWithin(minutes) {
  const now = new Date();
  return tasks.filter(task => {
    const dueAt = new Date(task.createdAt);
    dueAt.setMinutes(dueAt.getMinutes() + task.dueTime);
    return (dueAt - now) <= minutes * 60000;
  });
}


function sendReminders() {
  try {
    tasks.forEach(task => {
      const reminderTime = task.dueTime * 60000;
      setTimeout(() => {
        console.log(`Reminder: ${task.title} is due now!`);
      }, reminderTime);
    });
  } catch (error) {
    console.error("Error sending reminders:", error.message);
  }
}

addTask("Run", 3, 1); 
addTask("Go to Gym", 4, 3); 
addTask("Start training", 5, 2); 
addTask("Eat Fruit", 1, 2);
addTask("Drink Water", 2, 1);
addTask("Call a friend", 3, 3);

console.log("Sorted Tasks by Priority:");
console.log(sortTasksByPriority());


console.log("Tasks Due within 2 Minutes:");
console.log(getTasksDueWithin(2));

sendReminders();

