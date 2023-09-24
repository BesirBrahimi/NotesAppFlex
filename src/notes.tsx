import { Note, Category } from "./components/types/Types";

// Load data from the JSON file
const data = require('./notes.json');

const localStorageKey = 'notesAndCategories';

const saveDataToLocalStorage = (data: { notes: Note[]; categories: Category[] }) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
};

const loadSavedDataFromLocalStorage = () => {
  const savedData = localStorage.getItem(localStorageKey);
  return savedData ? JSON.parse(savedData) : data;
};

const loadedData = loadSavedDataFromLocalStorage();

const getNotes = (): Note[] => {
  return loadedData.notes;
};

const getCategories = (): Category[] => {
  return loadedData.categories;
};

const addNote = (note: Note): void => {
  note.id = Date.now();
  loadedData.notes.push(note);
  saveDataToLocalStorage(loadedData);
};

const addCategory = (category: Category): void => {
  category.id = Date.now();
  loadedData.categories.push(category);
  saveDataToLocalStorage(loadedData); 
};

const updateNote = (updatedNote: Note): void => {
  const index = loadedData.notes.findIndex((note: Note) => note.id === updatedNote.id);

  if (index !== -1) {
    loadedData.notes[index] = updatedNote;
    saveDataToLocalStorage(loadedData); 
  }
};

const deleteNote = (noteId: number): void => {
  const index = loadedData.notes.findIndex((note: Note) => note.id === noteId);

  if (index !== -1) {
    loadedData.notes.splice(index, 1);
    saveDataToLocalStorage(loadedData); 
  }
};

const deleteCategory = (categoryId: number): void => {
  const index = loadedData.categories.findIndex((category: Category) => category.id === categoryId);

  if (index !== -1) {
    // Delete the category from the loadedData
    loadedData.categories.splice(index, 1);
    // Save the updated data to local storage
    saveDataToLocalStorage(loadedData);
    console.log("Category deleted:", categoryId);

    // Optionally, you can log the updated data to ensure it's correct
    console.log("Updated data:", loadedData);
  }
};


export { getNotes, getCategories, addNote, updateNote, deleteNote, addCategory, deleteCategory };
