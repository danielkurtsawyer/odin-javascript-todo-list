import loadFooter from './my-components/footer/footer.js';
import loadHeader from './my-components/header/header.js';
import loadProject from './my-components/projectView/projectView.js';
import loadSidebar from './my-components/sidebar/sidebar.js';

import Project from './project.js';
import ToDoItem from './toDoItem.js';


const pageLoad = (projectController) => {
    // create a wrapper div to encapsulate every component
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);

    // create a new folder for a header component - can include all of its dependencies in there 
    // and just call something like wrapper.appendChild(createHeader());
    wrapper.appendChild(loadHeader());

    // will need some kind of module to access the localStorage API here, if data is found then we can parse it into objects

    wrapper.appendChild(loadSidebar(projectController));
   
    wrapper.appendChild(loadProject(projectController));
    
    // create the footer div and add relevent children elements
    // can also potentially move this code into its own module
    wrapper.appendChild(loadFooter('https://github.com/danielkurtsawyer/odin-javascript-todo-list'));
}

export {pageLoad, loadSidebar, loadProject};