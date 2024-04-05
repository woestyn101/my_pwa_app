import { openDB } from 'idb';

const indexedDB =
   window.indexedDB ||
   window.mozIndexedDB ||
   window.webkitIndexedDB ||
   window.msIndexedDB ||
   window.shimIndexedDB;

const initdb = async () =>
  openDB('marius', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('marius')) {
        console.log('marius database already exists');
        return;
      }
      db.createObjectStore('marius', { keyPath: 'id', autoIncrement: true });
      console.log('marius database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
// create connection to db with database name and database version number
const contactDb = await openDB('marius', 1);  
// make a new transaction wiht options
const tx = contactDb.transaction('marius', 'readwrite');
// open a transaction store
const store = tx.objectStore('marius');
const request = store.put({ id: 1, value: content });
const result = await request;

    request.onsuccess = function (){
      //document.write("database created")
      console.log("Database created");
    }
    request.onerror = function(event){
      document.write("Error: Database not created " + event.target.errorCode);
    }

    tx.oncomplete = function(){
      db.close;
   }

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
    
    const mariusDb = await openDB('marius', 1);   

    // create a transaction to interact with the database
    const tx = mariusDb.transaction('marius', 'readonly');   
    
    // createing an objectstore to store the data in the database
    const store = tx.objectStore('marius');   
    const request = store.getAll(); 
   
    const result = await request;
    console.log('result.value', result);
    return result?.value;

    

    
};

initdb();
