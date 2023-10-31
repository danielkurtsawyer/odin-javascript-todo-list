import Project from '../../project.js'
import ProjectController from "../../projectController.js";
import * as DOMController from '../../DOMController.js'
import * as UserInputController from '../../userInputController.js'
import { format } from "date-fns";
import ToDoItem from "../../toDoItem.js";

import IconEdit from './icons/edit.svg';

export default (projectController, itemIndex) => {
    // extract project index attribute from project view element
    const projectView = document.querySelector('.project-view');
    // convert project index from string to int
    const projectIndex = +projectView.getAttribute('project-index');

    // load item
    const item = projectController.getProject(projectIndex).getItem(itemIndex);
    // extract item attributes
    const title = item.title;
    const description = item.description;
    const dueDate = item.dueDate;
    const priority = item.priority;
    const checked = item.checked;

    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = description;

    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = format(dueDate, 'M/d/y');

    const priorityDiv = document.createElement('div');
    priorityDiv.textContent = priority;

    const checkedDiv = document.createElement('div');
    if(checked){
        checkedDiv.textContent = 'Complete';
    } else{
        checkedDiv.textContent = 'Incomplete';
    }

    // we will display this information in yet another modal 
    // create dialog element
    const dialog = document.createElement('dialog');
    dialog.id = 'item-details-dialog';
    
    dialog.appendChild(titleDiv);
    dialog.appendChild(descriptionDiv);
    dialog.appendChild(dueDateDiv);
    dialog.appendChild(priorityDiv);
    dialog.appendChild(checkedDiv);

    projectView.appendChild(dialog);

    dialog.showModal();
}