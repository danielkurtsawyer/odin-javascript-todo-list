import './header.css';
import Icon from './list.svg';

export default () => {
    // create the header wrapper div
    const header = document.createElement('div');
    header.classList.add('header');

    // create an image using the imported svg
    const myIcon = new Image();
    myIcon.src = Icon;
    
    header.appendChild(myIcon);

    const headerText = document.createElement('div');
    headerText.classList.add('header-text');
    headerText.textContent = 'To-Do List';
    header.appendChild(headerText);

    return header;
}
