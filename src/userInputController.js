import Project from "./project.js";
import ProjectController from "./projectController.js";
import * as DOMController from './DOMController.js'

const openProjectNameForm = (projectController, index) => {
    // index parameter lets us know if we are adding or editing a project name
    // we can use this information to dynamically render the dialog depending on 
    //      whether we're adding or editing
    let projectName = null;

    if(index){
        projectName = projectController.getProject(index).name;
    }

    const sidebarContainer = document.querySelector('.sidebar-container');

    const dialog = document.createElement('dialog');
    dialog.id = 'project-name-dialog';

    const form = document.createElement('form');

    dialog.appendChild(form);

    const label = document.createElement('label');
    label.setAttribute('for', 'project-name-input')

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.required = true;
    input.id = 'project-name-input';
    
    if(!projectName){
        label.textContent = 'Enter name for your new project: ';
        input.setAttribute('placeholder', 'New Project');
    } else{
        label.textContent = 'Change your project name: ';
        input.setAttribute('placeholder', projectName);
    }

    form.appendChild(label);
    form.appendChild(input);

    if(index){
        dialog.addEventListener('submit', (e) => processProjectNameFormEdit(e, dialog, projectController, index));
    } else{
        dialog.addEventListener('submit', (e) => processProjectNameFormAdd(e, dialog, projectController));
    }

    console.log(dialog);
    sidebarContainer.appendChild(dialog);
    dialog.showModal();
};

const processProjectNameFormAdd = (e, dialog, projectController) => {
    e.preventDefault();
    // extract name from the event target
    const projectName = e.target['project-name-input'].value;
    // add a new project with that name
    projectController.addProject(new Project(projectName));
    // reload the sidebar with the updated projectController
    DOMController.loadSidebar(projectController);
    // close the dialog
    dialog.close();
    
}

const processProjectNameFormEdit = (e, dialog, projectController, index) => {
    e.preventDefault();
    // extract name from the event target
    const projectName = e.target['project-name-input'].value;
    if(projectController.editProjectName(index, projectName)){
        // editProjectName returns true if the project name was successfully changed
        // reload the sidebar with the updated projectController 
        DOMController.loadSidebar(projectController);
    }
    // close the dialog
    dialog.close();
}

export {
    openProjectNameForm
}