// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0dXpfTkWGBLl6FOvTqzJxuHbrK1bFoc0",
  authDomain: "sgrcpmht.firebaseapp.com",
  projectId: "sgrcpmht",
  storageBucket: "sgrcpmht.appspot.com",
  messagingSenderId: "461197732100",
  appId: "1:461197732100:web:dd4454fcf37845c4cf8851",
  measurementId: "G-MKBYQZD8NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

//const storage = get;

const storage = getStorage(app);

export const saveTask = (title, description, imageUrl, imageName) => addDoc(collection(db, 'tasks'), { title, description ,imageUrl, imageName});

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = async id =>{
    const docTask = await getTask(id);
    deleteImageTask(docTask.data().imageName);
    deleteDoc(doc(db, 'tasks', id));

}
export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('Upload is ' + progress + '% done');
   // document.querySelector('#progress').innterText = 'Upload is ' + progress + '% done';
    document.querySelector('#progress').value = progress ;
    },
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value = 'FIN!!!!!';   
        document.querySelector('#image').src = downloadURL; 
        console.log('File available at', downloadURL);
        });
    }
    );
}

const deleteImageTask = imageName => {
    // Create a reference to the file to delete
const desertRef = ref(storage, `images/${imageName}`);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  console.log('todo esta bien')
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log('tienes error');
});
}