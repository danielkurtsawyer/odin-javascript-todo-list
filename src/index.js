import ProjectController from './projectController.js';
import * as DOMController from './DOMController.js';
import projectAndToDoItemTest from './tests/project-and-toDoItem-test.js';
import projectControllerTest from './tests/projectControllerTest.js';

import './style.css';

const projectController = new ProjectController('Default Project');

DOMController.pageLoad(projectController);

// ******** TESTING ********
// projectAndToDoItemTest();
// projectControllerTest();

