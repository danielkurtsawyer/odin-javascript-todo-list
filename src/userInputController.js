import Project from "./project.js";
import ProjectController from "./projectController.js";
import * as DOMController from './DOMController.js'
import { format } from "date-fns";
import ToDoItem from "./toDoItem.js";

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

    const inputContainer = document.createElement('div');
    inputContainer.id = 'project-input-container';

    const label = document.createElement('label');
    label.setAttribute('for', 'project-name-input')

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.required = true;
    input.id = 'project-name-input';
    input.maxLength = 20;

    const confirmButton = document.createElement('button');
    confirmButton.id = 'project-confirm-button';
    confirmButton.type = 'submit';

    confirmButton.addEventListener('mouseover', () => confirmButton.classList.add('hover'));
    confirmButton.addEventListener('mouseout', () => confirmButton.classList.remove('hover'));
    
    if(!projectName){
        label.textContent = 'Enter name for your new project: ';
        input.setAttribute('placeholder', 'New Project');
        confirmButton.textContent = 'Add Project';
    } else{
        label.textContent = 'Change your project name: ';
        // input.setAttribute('placeholder', projectName);
        input.value = projectName;
        confirmButton.textContent = 'Edit Project';
    }

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    form.appendChild(inputContainer);
    form.appendChild(confirmButton);

    if(index){
        console.log('editing project' + index);
        dialog.addEventListener('submit', (e) => processProjectNameFormEdit(e, dialog, projectController, index));
    } else{
        dialog.addEventListener('submit', (e) => processProjectNameFormAdd(e, dialog, projectController));
    }

    form.appendChild(confirmButton);

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
    DOMController.loadProject(projectController, projectController.numProjects-1);
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
        // if the project currently in view is the edited project, update the project view
        if(document.querySelector('.project-view').getAttribute('project-index') == index){
            DOMController.loadProject(projectController, index);
        }
    }
    // close the dialog
    dialog.close();
}

const openToDoItemForm = (projectController, projectIndex, itemIndex) => {
    let item = null;
    // if there is an item index, then we are editing an item
    if(itemIndex){
        item = projectController.getProject(projectIndex).getItem(itemIndex);
    }
    // if not, then we are adding an item to the project at projectIndex

    // this can obviously be optimized better. updating an item should only rerender one item element
    //              adding an item should only result in appending one item element
    //              but for the sake of time and the fact that this likely isn't that much of a burden
    //              I will just simply rerender the whole project view

    // if we are editing an item, then we can pre-populate the input values with the item information
    const projectView = document.querySelector('.project-view');

    // create dialog element
    const dialog = document.createElement('dialog');
    dialog.id = 'item-dialog';
    
    // create form element and append as child to dialog
    const form = document.createElement('form');
    dialog.appendChild(form);

    // create container to hold title label and input
    const titleInputContainer = document.createElement('div');
    titleInputContainer.classList.add('item-title-container');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'item-title-input');
    titleLabel.textContent = 'Title:';

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.required = true;
    titleInput.id = 'item-title-input';
    titleInput.maxLength = 100;

    titleInputContainer.appendChild(titleLabel);
    titleInputContainer.appendChild(titleInput);
    form.appendChild(titleInputContainer);

    // create container to hold description label and input
    const descriptionInputContainer = document.createElement('div');
    descriptionInputContainer.classList.add('item-description-container');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'item-title-input');
    descriptionLabel.textContent = 'Description:'

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('name', 'description');
    descriptionInput.required = true;
    descriptionInput.id = 'item-description-input';
    descriptionInput.maxLength = 100;

    descriptionInputContainer.appendChild(descriptionLabel);
    descriptionInputContainer.appendChild(descriptionInput);
    form.appendChild(descriptionInputContainer);

    // create container to hold due date label and input
    const dueDateInputContainer = document.createElement('div');
    dueDateInputContainer.classList.add('item-due-date-container');

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'item-due-date-input');
    dueDateLabel.textContent = 'Due Date: ';

    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('name', 'due_date');
    dueDateInput.required = true; 
    dueDateInput.id = 'item-due-date-input';

    dueDateInputContainer.appendChild(dueDateLabel);
    dueDateInputContainer.appendChild(dueDateInput);
    form.appendChild(dueDateInputContainer);

    // create container to hold priority label and input
    const priorityInputContainer = document.createElement('div');
    priorityInputContainer.classList.add('item-priority-container');

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'item-priority-input');
    priorityLabel.textContent = 'Priority Level';

    const priorityInput = document.createElement('select');
    priorityInput.setAttribute('name', 'priority');
    priorityInput.id = 'item-priority-input';
    
    for(let i = 1; i<=5; i++){
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        if(i === 1){
            option.selected = true;
        }
        priorityInput.appendChild(option);
    }

    priorityInputContainer.appendChild(priorityLabel);
    priorityInputContainer.appendChild(priorityInput);
    form.appendChild(priorityInputContainer);

    // create container to hold checked label and input
    const checkedInputContainer = document.createElement('div');
    checkedInputContainer.classList.add('item-checked-container');

    const checkedInput = document.createElement('input');
    checkedInput.setAttribute('type', 'checkbox');
    checkedInput.setAttribute('name', 'checked');
    checkedInput.id = 'item-checked-input';
    checkedInput.value = 0;

    const checkedLabel = document.createElement('label');
    checkedLabel.setAttribute('for', 'item-checked-input');
    checkedLabel.textContent = 'Complete?';

    checkedInputContainer.appendChild(checkedLabel);
    checkedInputContainer.appendChild(checkedInput);
    form.appendChild(checkedInputContainer);

    checkedInput.addEventListener('change', (e) => checkedInput.value = checkedInput.value === "0" ? "1" : "0");

    if(itemIndex){
        // if there is an item index then we are editing an item
        // add event listener for processing editing
        dialog.addEventListener('submit', (e) => processToDoItemFormEdit(e, dialog, projectController, projectIndex, itemIndex));
        // also prepopulate the form with the item values
        titleInput.value = item.title;
        descriptionInput.value = item.description;
        dueDateInput.value = format(item.dueDate, 'yyyy-MM-dd');
        priorityInput.children.item(item.priority).selected = true;
        checkedInput.checked = item.checked;
    } else{
        dialog.addEventListener('submit', (e) => processToDoItemFormAdd(e, dialog, projectController, projectIndex));
    }

    const confirmButton = document.createElement('button');
    confirmButton.id = 'item-confirm-button';
    confirmButton.type = 'submit';
    if(itemIndex){
        confirmButton.textContent = 'Edit item'
    } else {
        confirmButton.textContent = 'Add item'
    }   

    confirmButton.addEventListener('mouseover', () => confirmButton.classList.add('hover'));
    confirmButton.addEventListener('mouseout', () => confirmButton.classList.remove('hover'));

    form.appendChild(confirmButton);

    projectView.appendChild(dialog);
    dialog.showModal();
}

const processToDoItemFormAdd = (e, dialog, projectController, projectIndex) => {
    console.log('adding!');
    e.preventDefault();
    const title = e.target['item-title-input'].value;
    const description = e.target['item-description-input'].value;
    const dueDate = e.target['item-due-date-input'].value;
    const priority = e.target['item-priority-input'].value;
    console.log(e.target['item-checked-input'].value);
    const checked = e.target['item-checked-input'].value === "0" ? false : true;

    console.log('creating new item on project index ' + projectIndex, title, description, dueDate, priority, checked);

    projectController.getProject(projectIndex).addItem(new ToDoItem(title, description, dueDate, priority, checked));

    DOMController.loadProject(projectController, projectIndex);
    dialog.close();
}

const processToDoItemFormEdit = (e, dialog, projectController, projectIndex, itemIndex) => {

}

const openMoveToDoItemForm = (projectController, itemIndex) => {
    const projectView = document.querySelector('.project-view');
    // convert project index from string to int
    const oldProjectIndex = +projectView.getAttribute('project-index');
    console.log(oldProjectIndex);
    // const item = projectController.getProject(oldProjectIndex).getItem(itemIndex);

    // create dialog element
    const dialog = document.createElement('dialog');
    dialog.id = 'item-move-dialog';
    
    // create form element and append as child to dialog
    const form = document.createElement('form');
    dialog.appendChild(form);

    // add the label for project to be moved to
    const moveLabel = document.createElement('label');
    moveLabel.setAttribute('for', 'item-move-input');
    moveLabel.textContent = 'Move item to project: ';

    const moveInput = document.createElement('select');
    moveInput.setAttribute('name', 'move');
    moveInput.id = 'item-move-input';

    const projects = projectController.projects;
    console.log(projects);
    

    for(let i = 0; i < projects.length; i++){
        const option = document.createElement('option');
        option.textContent = projects[i].name;
        option.value = i;
        if(i === oldProjectIndex){
            console.log('old project index selected');
            option.selected = true;
        }
        moveInput.appendChild(option);
    }

    form.appendChild(moveLabel);
    form.appendChild(moveInput);

    // add the submit button
    const confirmButton = document.createElement('button');
    confirmButton.id = 'item-confirm-button';
    confirmButton.type = 'submit';
    confirmButton.textContent = 'Move item'
    
    // add hover animation to button
    confirmButton.addEventListener('mouseover', () => confirmButton.classList.add('hover'));
    confirmButton.addEventListener('mouseout', () => confirmButton.classList.remove('hover'));

    // add event listener to handle form submission
    dialog.addEventListener('submit', (e) => processToDoItemFormMove(e, dialog, projectController, oldProjectIndex, itemIndex));

    form.appendChild(confirmButton);

    projectView.appendChild(dialog);
    dialog.showModal();
}

const processToDoItemFormMove = (e, dialog, projectController, oldProjectIndex, itemIndex) => {
    e.preventDefault();
    const newProjectIndex = e.target['item-move-input'].value;
    console.log(newProjectIndex);

    // if the new index is different than the old index, then remove the item and add it to the desired project
    if(newProjectIndex !== oldProjectIndex){
        const item = projectController.getProject(oldProjectIndex).removeItem(itemIndex);
        projectController.getProject(newProjectIndex).addItem(item);
        // also be sure to reload the project view
        DOMController.loadProject(projectController, newProjectIndex);
    }
    dialog.close();
}
    

export {
    openProjectNameForm,
    openToDoItemForm,
    openMoveToDoItemForm
}