import ProjectController from "./projectController.js";
import Project from './project.js';
import ToDoItem from "./toDoItem.js";
import { format } from "date-fns";

function updateStorage(projectController){
    localStorage.clear();
    const numProjects = projectController.numProjects;
    localStorage.setItem("numProjects", numProjects);

    for(let i = 0; i < numProjects; i++){
        const project = projectController.getProject(i);
        localStorage.setItem(`project${i}`, JSON.stringify(project));
    }
}

// loads the data from memory and returns the ProjectController object
function loadStorage(){
    let projectController = null;

    if (storageAvailable("localStorage")) {
        // Yippee! We can use localStorage awesomeness
        if(!localStorage.getItem('numProjects')){
            // if no numProjects key, then we are setting up a new localStorage environment
            console.log('Local storage not yet instantiated. Creating a new ProjectController.');

            projectController = new ProjectController('Default Project');
            // save the projectController to memory
            updateStorage(projectController);
        } else{
            // if there is a numProjects key, then we are loading from the localStorage
            // to set up the ProjectController
            console.log('Local storage found. Loading ProjectController from memory.');
            // read data here

            const numProjects = +localStorage.getItem('numProjects');

            // the first project is the default project, which we will use to create our project controller
            const project0json = JSON.parse(localStorage.getItem('project0'));
            projectController = new ProjectController(project0json._name);

            const project0 = projectController.getProject(0);
            console.log(project0);

            // add all of the toDo items from the list
            project0json._list.forEach((item) => project0.addItem(new ToDoItem(item._title, item._description, item._dueDate.substring(0,10), item._priority, item._checked)));

            // for the rest of the projects, we can iterate and add to project controller
            for(let i = 1; i < numProjects; i++){
                const projectjson = JSON.parse(localStorage.getItem(`project${i}`));
                const project = new Project(projectjson._name);
                projectjson._list.forEach((item) => project.addItem(new ToDoItem(item._title, item._description, item._dueDate.substring(0,10), item._priority, item._checked)));
                projectController.addProject(project);
            }

        }
      } else {
        // Too bad, no localStorage for us
        projectController = new ProjectController('Default Project');
      }
    return projectController;
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

export {
    updateStorage,
    loadStorage
}