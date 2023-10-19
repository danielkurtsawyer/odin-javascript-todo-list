class ToDoItem{
    constructor(title, description, dueDate, priority, checked){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
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

    set dueDate(date){
        this.dueDate = date;
    }

    get priority(){
        return this._priority;
    }

    set priority(priority){
        if(priority < 1 || priority > 5){
            console.log(`A priority value of ${priority} is invalid. Priority can only range from 1-5`);
        }
        else{
            this._priority = priority;
        }
       
    }
}