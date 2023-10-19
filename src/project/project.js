import ToDoItem from '../toDoItem/toDoItem.js';
import { compareDesc, compareAsc } from 'date-fns';

export default class Project{
    constructor(name){
        this._name = name;
        this._list = [];
    }

    // returns this project's name
    get name(){
        return this._name;
    }

    // sets this project's name
    set name(name){
        this._name = name;
    }

    // returns the list array of ToDoItems
    get list(){
        return this._list;
    }

    // returns the list in descending order of priority
    get listDescendingPriority(){
        return this._list.toSorted(this.comparePriorityDescending);
    }

    // helper function for priorityListDescending()
    comparePriorityDescending(a, b){
        return a.priority > b.priority ? -1: ((b.priority > a.priority) ? 1: 0);
    }

    // returns the list in ascending order of priority
    get listAscendingPriority(){
        return this._list.toSorted(this.comparePriorityAscending);
    }

    // helper function for priorityListAscending()
    comparePriorityAscending(a, b){
        return a.priority > b.priority ? 1: ((b.priority > a.priority) ? -1: 0);
    }

    // returns the list in descending order of due date
    get listDescendingDueDate(){
        return this._list.toSorted(this.compareDueDateDescending);
    }
    
    // helper function for listDescendingDueDate
        // since the compareDesc imported from the date-fns module only worked on arrays of dates, 
        // we need to first extract the dates and then do a comparison between those dates
    compareDueDateDescending(a,b){
        return compareDesc(a.dueDate, b.dueDate);
    }

    // returns the list in ascending order of due date
    get listAscendingDueDate(){
        return this._list.toSorted(this.compareDueDateAscending);
    }

    // helper function for listAscendingDueDate
        // since the compareAsc imported from the date-fns module only worked on arrays of dates, 
        // we need to first extract the dates and then do a comparison between those dates
    compareDueDateAscending(a,b){
        return compareAsc(a.dueDate, b.dueDate);
    }   

    get listLength(){
        return this._list.length;
    }

    // adds an item to the end of the list array of ToDoItems
    addItem(toDoItem){
        this._list.push(toDoItem);
    }

    // removes an item from the list array at the index and returns that item
    removeItem(index){
        return this._list.splice(index, 1).pop();
    }

    // every time a user edits an item, they will submit a form that has all of the properties included
    // we can just use those pro
    editItem(index, title, description, dueDate, priority, checked){
        this.getItem(index).update(title, description, dueDate, priority, checked);
        // const editedItem = new ToDoItem();
        // this._list[index] = editedItem;
    }

    // returns the ToDoList at that index in the array
    //      returns null if the index does not exist in the array
    getItem(index){
        if(index >= 0 || index < this._list.length){
            return this._list[index];
        } else{
            return null;
        }
    }
}