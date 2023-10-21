import './sidebar.css';
import ProjectController from '../../projectController.js';
import * as DOMController from '../../DOMController.js'
import Project from '../../project';

import EditIcon from './icons/edit.svg';
import DeleteIcon from './icons/delete.svg';

// NEXT - refactor with sending in the whole projectController rather than just projects
// this way we can have access to those methods

export default (projectController) => {
    console.log('Loading sidebar from the following projectController: ');
    console.table(projectController);

    // clear old sidebar - if returns true then no sidebar container exists and we need to create one
    let sidebarContainer = clearSideBar();
    if(!sidebarContainer){
        sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('sidebar-container');
    }
    
    if(!projectController){
        return sidebarContainer;
    }
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebarContainer.appendChild(sidebar);

    // also need to create the add project svg and add event listener to call createProject
    const projects = projectController.projects;

    for(let i = 0; i < projects.length; i++){
        // will want to create a div that wraps the projectNameElement and the different svg icons
        // add event listeners to the projectNameElement to load that specific project using the project-index
        //              and maybe hover changes color
        // add event listeners to each svg icon that trigger the 
        const projectInfoContainer = document.createElement('div');
        projectInfoContainer.classList.add('project-info-container');
        sidebar.appendChild(projectInfoContainer);

        // create the element to hold the project name and add to the project-info-container
        const projectNameElement = document.createElement('div');
        projectNameElement.classList.add('project-name');
        projectNameElement.setAttribute('project-index', i);
        projectNameElement.textContent = projects[i].name;
        projectInfoContainer.appendChild(projectNameElement);


        // add the icons for manipulating projects
        const iconEdit = new Image();
        iconEdit.src = EditIcon;
        iconEdit.setAttribute('project-index', i);
        projectInfoContainer.appendChild(iconEdit);

        // can't delete our default project at index 0, so don't add the delete icon
        if(i !== 0){
            const iconDelete = new Image();
            iconDelete.src = DeleteIcon;
            iconDelete.setAttribute('project-index', i);
            projectInfoContainer.appendChild(iconDelete);
        }

        // add event listeners for hover animation on projectName
        projectNameElement.addEventListener('mouseover', () => projectNameElement.classList.add('hover'));
        projectNameElement.addEventListener('mouseout', () => projectNameElement.classList.remove('hover'));
        iconEdit.addEventListener('mouseover', () => iconEdit.classList.add('hover'));
        iconEdit.addEventListener('mouseout', () => iconEdit.classList.remove('hover'));
        if(i!==0){
            iconDelete.addEventListener('mouseover', () => iconDelete.classList.add('hover'));
            iconDelete.addEventListener('mouseout', () => iconDelete.classList.remove('hover'));
        }

        // add event listener to the icons
        iconEdit.addEventListener('click', (e) => projectController.editProjectName(e.target.getAttribute('project-index')));
    }
    
    return sidebarContainer;
}

// clears the sidebar - returns the sidebar container - null if none exists
function clearSideBar(){
    const sidebarContainer = document.querySelector('.sidebar-container');
    if(sidebarContainer){
        while(sidebarContainer.firstChild){
            sidebarContainer.removeChild(sidebarContainer.lastChild);
        }
    }
    return sidebarContainer;
}

