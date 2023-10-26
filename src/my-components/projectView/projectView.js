import EditIcon from './icons/edit.svg';
import DeleteIcon from './icons/delete.svg';
import MoveIcon from './icons/move.svg';
import InfoIcon from './icons/info.svg';

import Project from '../../project';
import ToDoItem from '../../toDoItem';

import { format, isValid } from 'date-fns';
import * as UserInputController from '../../userInputController.js';
import './projectView.css';

export default (projectController, projectIndex = 0) => {
    // clear old project view 
    let projectView = clearProjectView();

    // if returns null then none exists and we need to create one
    if(!projectView){
        projectView = document.createElement('div');
        projectView.classList.add('project-view');
        projectView.setAttribute('project-index', projectIndex);
    }

    // fetch the project object
    let project = projectController.getProject(projectIndex);

    // if no project exists at that index, load default project
    if(!project){
        project = projectController.getProject(0);     
    }

    // At the very top of the page, include the name of the project
    const projectName = document.createElement('div');
    projectName.textContent = project.name;
    projectName.classList.add('project-view-name');
    projectView.appendChild(projectName);

    // at the top of the page, we can include a header for the Item title and Item due Date
    // as well as provide a button to add items to the project 
    const projectViewHeader = document.createElement('div');
    projectViewHeader.classList.add('project-view-header');
    const tasks = document.createElement('div');
    tasks.textContent = 'Tasks';
    projectViewHeader.appendChild(tasks);

    const due = document.createElement('div');
    due.textContent = 'Due Date';
    projectViewHeader.appendChild(due);

    const buttonAddToDoItem = document.createElement('button');
    buttonAddToDoItem.setAttribute('type', 'button');
    buttonAddToDoItem.setAttribute('project-index', projectIndex);
    buttonAddToDoItem.textContent = 'Add ToDo Item';

    // add responsive hover
    buttonAddToDoItem.addEventListener('mouseover', () =>  buttonAddToDoItem.classList.add('hover'));
    buttonAddToDoItem.addEventListener('mouseout', () => buttonAddToDoItem.classList.remove('hover'));
    // and also add a click event listener to call the user input controller to handle new task creation
    buttonAddToDoItem.addEventListener('click', (e) => UserInputController.openToDoItemForm(projectController, e.target.getAttribute('project-index')));

    projectViewHeader.appendChild(buttonAddToDoItem);
    projectView.appendChild(projectViewHeader);

    const items = project.list;

    for(let i = 0; i < items.length; i++){
        projectView.appendChild(createItemCard(items[i], i));
    }

    return projectView;
}

const clearProjectView = () => {
    const projectView = document.querySelector('.project-view');
    if(projectView){
        while(projectView.firstChild){
            projectView.removeChild(projectView.lastChild);
        }
    }
    return projectView;
}

const createItemCard = (item, itemIndex) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('to-do-item');

    const title = document.createElement('div');
    title.classList.add('to-do-title');
    title.textContent = item.title;
    itemContainer.appendChild(title);

    const dueDate = document.createElement('div');
    dueDate.classList.add('to-do-due-date');
    dueDate.textContent = format(item.dueDate, 'M/d/y');
    itemContainer.appendChild(dueDate);

    const iconInfo = new Image();
    iconInfo.src = InfoIcon;
    iconInfo.setAttribute('item-index', itemIndex);
    itemContainer.appendChild(iconInfo);

    const iconMove = new Image();
    iconMove.src = MoveIcon;
    iconMove.setAttribute('item-index', itemIndex);
    itemContainer.appendChild(iconMove);

    const iconDelete = new Image();
    iconDelete.src = DeleteIcon;
    iconDelete.setAttribute('item-index', itemIndex);
    itemContainer.appendChild(iconDelete);


    // add event listeners for hovering animation
    iconInfo.addEventListener('mouseover', () => iconInfo.classList.add('hover'));
    iconInfo.addEventListener('mouseout', () => iconInfo.classList.remove('hover'));
    iconMove.addEventListener('mouseover', () => iconMove.classList.add('hover'));
    iconMove.addEventListener('mouseout', () => iconMove.classList.remove('hover'));
    iconDelete.addEventListener('mouseover', () => iconDelete.classList.add('hover'));
    iconDelete.addEventListener('mouseout', () => iconDelete.classList.remove('hover'));

    return itemContainer;
}