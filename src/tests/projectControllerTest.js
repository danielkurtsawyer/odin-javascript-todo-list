import ProjectController from "../projectController.js";
import Project from "../project.js";
import ToDoItem from "../toDoItem.js";

export default ()=>{
    const projectController = new ProjectController();
    console.group('projectController instantiation');
    console.log('there should be 1 project: ', projectController.numProjects)
    console.table(projectController.projects);
    console.groupEnd();

    console.group('adding items to the project')
    const item1 = new ToDoItem("item1", "this is a description for item 1", '1999-12-05', 4, false);
    projectController.getProject(0).addItem(item1);
    console.table(projectController.projects[0].list);
    console.groupEnd();

    console.group('adding a new project');
    projectController.addProject(new Project('Project1'));
    console.log('there should be 2 projects: ', projectController.numProjects);
    console.table(projectController.getProject(1));
    console.groupEnd();

    console.group('moving items between projects');
    console.table(projectController.projects);
    console.log('moving item1 from the default project to the newly created one')
    projectController.moveItem(0, 0, 1);
    console.table(projectController.projects);
    console.groupEnd();

    console.group('removing projects');
    console.log('Attempt to remove default project (project at index 0) should fail');
    console.log('should be null: ', projectController.removeProject(0));
    console.table(projectController.projects);
    console.log('Attempt to remove project1 (project at index 1) should work and return the project from the function');
    console.log('should be named "project 1: "');
    console.table(projectController.removeProject(1));
    console.log('new state of the projects array: ');
    console.table(projectController.projects);
}