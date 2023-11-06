import ProjectController from './projectController.js';
import * as DOMController from './DOMController.js';
import projectAndToDoItemTest from './tests/project-and-toDoItem-test.js';
import projectControllerTest from './tests/projectControllerTest.js';
import * as localStorageController from './localStorageController.js';

import './style.css';

const projectController = localStorageController.loadStorage();

DOMController.pageLoad(projectController);

// ******** TESTING ********
// projectAndToDoItemTest();
// projectControllerTest();

