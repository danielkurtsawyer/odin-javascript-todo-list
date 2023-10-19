
export default (projects) => {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.textContent = 'Sidebar goes here - will contain the list of project names which users can click on to navigate between projects';

    if(!sidebar){
        return sidebar;
    }
    
    return sidebar;
}