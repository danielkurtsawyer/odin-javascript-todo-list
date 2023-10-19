const pageLoad = () => {
    // create a wrapper div to encapsulate every component
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);

    // create a new folder for a header component - can include all of its dependencies in there 
    // and just call something like wrapper.appendChild(createHeader());

    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = 'To-Do List';
    wrapper.appendChild(header);

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    wrapper.appendChild(sidebar);

    const projectView = document.createElement('div');
    projectView.classList.add('project-view');
    wrapper.appendChild(projectView);

    const footer = document.createElement('div');
    footer.classList.add('footer');
    wrapper.appendChild(footer);
}

export {pageLoad};