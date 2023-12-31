import Project from '../../project.js'
import ProjectController from "../../projectController.js";
import * as DOMController from '../../DOMController.js'
import * as UserInputController from '../../userInputController.js'
import { format } from "date-fns";
import ToDoItem from "../../toDoItem.js";

import IconEdit from './icons/edit.svg';
import IconClose from './icons/x.svg';
import './itemDetails.css';

export default (projectController, itemIndex) => {
    // extract project index attribute from project view element
    const projectView = document.querySelector('.project-view');
    // convert project index from string to int
    const projectIndex = +projectView.getAttribute('project-index');

    const itemActionsDiv = document.createElement('div');
    itemActionsDiv.classList.add('item-actions');

    const itemEditIcon = new Image();
    const modalCloseIcon = new Image();
    itemEditIcon.src = IconEdit;
    modalCloseIcon.src = IconClose;

    // add event listeners for hovering animation
    itemEditIcon.addEventListener('mouseover', () => itemEditIcon.classList.add('hover'));
    itemEditIcon.addEventListener('mouseout', () => itemEditIcon.classList.remove('hover'));
    modalCloseIcon.addEventListener('mouseover', () => modalCloseIcon.classList.add('hover'));
    modalCloseIcon.addEventListener('mouseout', () => modalCloseIcon.classList.remove('hover'));
    
    itemActionsDiv.appendChild(itemEditIcon);
    itemActionsDiv.appendChild(modalCloseIcon);

    const itemInfoDiv = document.createElement('div');
    itemInfoDiv.classList.add('item-info');

    // load item
    const item = projectController.getProject(projectIndex).getItem(itemIndex);
    // extract item attributes
    const title = item.title;
    const description = item.description;
    const dueDate = item.dueDate;
    const priority = item.priority;
    const checked = item.checked;

    
    const titleLabel = document.createElement('div');
    titleLabel.textContent = 'Title:';
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;

    const descriptionLabel = document.createElement('div');
    descriptionLabel.textContent = 'Description:';
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = description;

    const dueDateLabel = document.createElement('div');
    dueDateLabel.textContent = 'Due Date:';
    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = format(dueDate, 'M/d/y');

    const priorityLabel = document.createElement('div');
    priorityLabel.textContent = 'Priority:';
    const priorityDiv = document.createElement('div');
    priorityDiv.textContent = priority;

    const checkedLabel = document.createElement('div');
    checkedLabel.textContent = 'Status:'
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

    dialog.appendChild(itemActionsDiv);
    
    itemInfoDiv.appendChild(titleLabel);
    itemInfoDiv.appendChild(titleDiv);

    itemInfoDiv.appendChild(descriptionLabel);
    itemInfoDiv.appendChild(descriptionDiv);

    itemInfoDiv.appendChild(dueDateLabel);
    itemInfoDiv.appendChild(dueDateDiv);

    itemInfoDiv.appendChild(priorityLabel);
    itemInfoDiv.appendChild(priorityDiv);

    itemInfoDiv.appendChild(checkedLabel);
    itemInfoDiv.appendChild(checkedDiv);

    dialog.appendChild(itemInfoDiv);
    projectView.appendChild(dialog);

    // add event listeners for the item actions
    // close dialog
    modalCloseIcon.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
    });

    // edit item
    itemEditIcon.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.close();
        UserInputController.openToDoItemForm(projectController, projectIndex, itemIndex);
    })

    dialog.showModal();
}