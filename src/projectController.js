import DOMController from './DOMController.js';
import Project from './project.js';
import ToDoItem from './toDoItem.js';

export default class ProjectController{
    constructor(defaultName = 'Default Project'){
        this._projects = [new Project(defaultName)];
    }

    // returns all projects
    get projects(){
        return this._projects;
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

    // validates that the project index exists
    // lowerBound expands the functionality to allow validation that the index is above a threshold
    //          since we do not want to delete the default project, 
    validateProjectIndex(index, lowerBound){
        return index>=lowerBound && index < this.numProjects ? true : false;
    }

    // returns the number of different projects currently in memory
    get numProjects(){
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