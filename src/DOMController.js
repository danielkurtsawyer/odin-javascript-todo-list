import createFooter from './my-components/footer/footer.js';
import createHeader from './my-components/header/header.js'

const pageLoad = () => {
    // create a wrapper div to encapsulate every component
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);

    // create a new folder for a header component - can include all of its dependencies in there 
    // and just call something like wrapper.appendChild(createHeader());
    wrapper.appendChild(createHeader());

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.textContent = 'Sidebar goes here - will contain the list of project names which users can click on to navigate between projects';
    wrapper.appendChild(sidebar);

    const projectView = document.createElement('div');
    projectView.classList.add('project-view');
    projectView.textContent = 'Project lists will go here, displaying the individual todo items';
    wrapper.appendChild(projectView);
    
    // create the footer div and add relevent children elements
    // can also potentially move this code into its own module
    
    wrapper.appendChild(createFooter());
}

export {pageLoad};