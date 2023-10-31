import './footer.css';

export default (url) => {
    // create the footer div and add relevent children elements
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.textContent = 'Copyright 2023 Daniel Sawyer | ';
    const link = document.createElement('a');
    link.textContent = 'GitHub';
    link.setAttribute('href', url);
    // make sure the link opens in a new tab
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    footer.appendChild(link);

    return footer;
}