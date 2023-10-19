import './header.css';

export default () => {
    const header = document.createElement('div');
    header.classList.add('header');
    const headerText = document.createElement('div');
    headerText.classList.add('header-text');
    headerText.textContent = 'To-Do List';
    header.appendChild(headerText);

    return header;
}
