import Project from '../project.js';
import ToDoItem from '../toDoItem.js';

// Although this test code isn't very well structured, I was able to get a comprehensive look 
// at the behavior of the Project and ToDoItem objects
// Through simple console.log()'s I was able to debug many errors, and the logic seems to work as intended

export default () => {

const project1 = new Project("Project1");
console.log('Project Object: ', project1);
console.log('Project Name: ', project1.name);

const item1 = new ToDoItem("item1", "this is a description of item1", "2017-06-01", 5, false);
console.log('Original ToDoItem:', item1);
console.log('Title:', item1.title);
console.log('Description:', item1.description);
console.log('Due Date:', item1.dueDate);
console.log('Priority:', item1.priority);
console.log('checked before toggle:', item1.checked);
item1.toggleChecked()
console.log('checked after toggle:', item1.checked);

project1.addItem(item1);
console.log('Added Item to List', item1, project1.getItem(0));
console.log('Removed Item: ', project1.removeItem(0));
console.log('Updated List', project1.list);

project1.addItem(item1);
project1.editItem(0, "changedItem", "this used to be item1, but is now called changedItem", "2023-07-02", 1, false);
console.log('Item has been edited', project1.getItem(0));

console.log('Item at index 0', project1.getItem(0));
console.log('Item at index 1', project1.getItem(1));

console.log('Testing priority sorting');
const item2 = new ToDoItem("item2", "this item has a higher priority than item1", "2020-08-05", 5, false);
const item3 = new ToDoItem("item3", "this item has a higher priority than item 1 but a lower priority than item2", "2019-09-10", 3, false);
project1.addItem(item2);
project1.addItem(item3);
console.log(project1.list);

project1.listDescendingPriority.forEach((item)=>console.log(item.priority));

project1.listAscendingDueDate.forEach((item) => console.log(item.dueDate));
}