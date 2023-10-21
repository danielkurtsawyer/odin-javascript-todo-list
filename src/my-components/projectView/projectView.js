import EditIcon from './icons/edit.svg';
import DeleteIcon from './icons/delete.svg';
import MoveIcon from './icons/move.svg';

import Project from '../../project';
import ToDoItem from '../../toDoItem';

export default (Project, projectIndex = 0) => {
    const projectView = document.createElement('div');
    projectView.classList.add('project-view');
    projectView.textContent = 'Project lists will go here, displaying the individual todo items';

    // in the case that loadProject is called without a value, it will return just the empty project-view div
    if(!Project){
        return projectView;
    } 

    
    return projectView;
}