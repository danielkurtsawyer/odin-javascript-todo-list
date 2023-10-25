import EditIcon from './icons/edit.svg';
import DeleteIcon from './icons/delete.svg';
import MoveIcon from './icons/move.svg';

import Project from '../../project';
import ToDoItem from '../../toDoItem';

import { format, isValid } from 'date-fns';
import './projectView.css';

export default (projectController, projectIndex = 0) => {
    // clear old project view 
    let projectView = clearProjectView();

    // if returns null then none exists and we need to create one
    if(!projectView){
        projectView = document.createElement('div');
        projectView.classList.add('project-view');
    }

    // fetch the project object
    let project = projectController.getProject(projectIndex);

    // if no project exists at that index, load default project
    if(!project){
        project = projectController.getProject(0);     
    }

    projectView.appendChild(createItemCard(new ToDoItem('test', 'description', '1999-02-05', 1, true), 0));

    const items = project.list;

    for(let i = 0; i < items.length; i++){
        projectView.appendChild(createItemCard(item[i], i));
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

    const iconDelete = new Image();
    iconDelete.src = DeleteIcon;
    iconDelete.setAttribute('item-index', itemIndex);
    itemContainer.appendChild(iconDelete);

    const iconMove = new Image();
    iconMove.src = MoveIcon;
    iconMove.setAttribute('item-index', itemIndex);
    itemContainer.appendChild(iconMove);
    
    return itemContainer;
}