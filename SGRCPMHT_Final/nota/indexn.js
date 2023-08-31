import { saveTask, onGetTasks, deleteTask, getTask, updateTask,
        saveImage } from './js/firebase.js';
import { card } from './js/ui.js';

const formTask = document.querySelector('#task-form');
const taskContainer = document.querySelector('#tasks-container');
let editStatus = false;
let idForEdit = '';

const actionButtons =  async ({target}) => {
    if(target.classList.contains('delet')){
        deleteTask(target.getAttribute('data-id'));
    }
    if(target.classList.contains('edit')){
        const id = target.getAttribute('data-id');
        const doc = await getTask(id);
        const task = doc.data();
        formTask['task-title'].value = task.title;
        formTask['task-description'].value = task.description;
        editStatus = true;
        idForEdit = id;
        document.querySelector('#btn-task-save').innerText = 'Update';
    }
}

const saveSubmit = (e) => {
    e.preventDefault();
    const title = formTask['task-title'].value;
    const description = formTask['task-description'].value;
    const imageUrl = document.querySelector('#image').src;
    const imageName = formTask['file-task'].value.split('\\')[2];
    
    if(title.lenght > 3 && description.lenght > 3){

        if(!editStatus){
            saveTask(title, description, imageUrl, imageName); 
            document.querySelector('#image').src= ''; 
        } else {
            updateTask(idForEdit, {
                'title': title , 'description': description
            });
            editStatus = false;
            document.querySelector('#btn-task-save').innerText = 'Save';  
        }
        formTask.reset();
    }else{
        alert('no sirve');
    }
}


const uploadFileAction = (e) => {
    const file = e.target.files[0];

    if(file.type.includes('image')){
        console.log('si es una imagen');
    
    saveImage(file);
    }
}

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks(querySnapshot => {
        if(taskContainer.firstChild)
            taskContainer.removeChild(taskContainer.firstChild)
        const div = document.createElement('div');
        querySnapshot.forEach(doc => {
            const task = doc.data();
            div.appendChild(card(doc.id, task.title, task.description , task.imageUrl))
        });
        taskContainer.appendChild(div);
    });
    
    document.querySelector('#tasks-container').addEventListener('click', actionButtons);
    formTask.addEventListener('submit', saveSubmit);
    document.querySelector('#file-task').addEventListener('change', uploadFileAction);
});

