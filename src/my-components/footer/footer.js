import './footer.css';

export default (url) => {
    // create the footer div and add relevent children elements
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.textContent = 'Copyright 2023 Daniel Sawyer | ';
    const link = document.createElement('a');
    link.textContent = 'GitHub';
    link.setAttribute('href', url);
    footer.appendChild(link);

    return footer;
}