import {format, isValid, startOfTomorrow} from 'date-fns';

export default class ToDoItem{
    constructor(title, description, dueDateString, priority, checked){
        this._title = title;
        this._description = description;
        this.dueDate = dueDateString;
        this._priority = priority;
        this._checked = checked;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(dueDateString){
        // from the calendar input, dates will be formatted like so YYYY-MM-DD
        const [year, month, day] = dueDateString.split('-');
        // IMPORTANT NOTE - date-fns formats months to be in the range 0-11, so we need to subtract 1 from the parsed value
        const date = new Date(year, month-1, day);
        if(isValid(date)){
            this._dueDate = date;
        } else{
            this._dueDate = startOfTomorrow();
        }
    }

    get priority(){
        return this._priority;
    }

    // sets the item priority
    //      MUST be between the range of 1-5
    //          will round priority values to fit within the range
    //          values lower than 1 will be set to 1
    //          values greater than 5 will be set to 5
    set priority(priority){
        if(priority > 5){
            this._priority = 5;
        } else if(priority < 1){
            this._priority = 1;
        } else{
            this._priority = priority;
        }
    }

    get checked(){
        return this._checked;
    }

    set checked(checked){
        if(typeof(checked) === Boolean){
            this._checked = checked;
        }
    }

    // since checked is a Boolean, it makes sense to be able to easily toggle it without any parameters
        // for example , we don't want to have to know that the box was checked first in order to change it 
        //      returns the new checked value
    toggleChecked(){
        this._checked = !this._checked;
        return this._checked;
    }

    update(title, description, dueDate, priority, checked){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }
}