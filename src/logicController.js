import DOMController from './DOMController.js';
import Project from './project.js';
import ToDoItem from './toDoItem.js';

export default class LogicController{
    constructor(){
        this._projects = [new Project('All Items')];
    }

    // returns the project at the requested index in the projects array
    //      returns null if the index is not valid
    getProject(index){
        if(this.validateProjectIndex(index, 0)){
            return this._projects[index];
        } else {
            return null;
        }
    }

    validateProjectIndex(index, lowerBound){
        return index>=lowerBound && index < this.getNumberOfProjects() ? true : false;
    }

    // returns the number of different projects currently in memory
    getNumberOfProjects(){
        return this._projects.length;
    }

    // Adds a project to the end of the projects array
    addProject(project){
        this._projects.push(project);
    }

    // removes a project from the projects array using the array index
    // NOTE that we do not want to remove the default array at index 0
    // returns the removed project
    removeProject(index){
        if(this.validateProjectIndex(index, 1)){
            return this._projects.splice(index, 1).pop();
        } else{
            return null;
        }
    }

    // moves an item from one project to another
    // returns true if successful, false if otherwise
    moveItem(itemIndex, oldProjectIndex, newProjectIndex){
        // first check to see if the projects exist at those indices
        const oldProject = this.getProject(oldProjectIndex);
        const newProject = this.getProject(newProjectIndex);
        if(oldProject && newProject){
            // then check to see if the old project has an item at the itemIndex
            // if it does, removeItem will have returned the item at that index
            // if not, then this method call returns null
            const itemToBeMoved = oldProject.removeItem(itemIndex);
            if(itemToBeMoved){
                // add the item to the end of the other project's list
                newProject.addItem(itemToBeMoved);
            } else return false;
        } else return false;
        
    }
}