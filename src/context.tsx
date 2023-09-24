import React, { createContext, useContext, ReactNode, useState } from "react";
import { Note, Category } from "./components/types/Types";
import {
  getNotes,
  getCategories,
  addNote,
  updateNote,
  deleteNote,
  addCategory,
  deleteCategory
} from "./notes";

interface NoteContextType {
  notes: Note[];
  categories: Category[];
  addNewNote: (note: Note) => void;
  updateExistingNote: (updatedNote: Note) => void;
  deleteNoteById: (noteId: number) => void;
  transNote: boolean;
  setTransNote: (transNote: boolean) => void;
  selectedFolder: string | null;
  setSelectedFolder: (selectedFolder: string) => void;
  addCategory: (category: Category) => void;
  selectedNote: Note | null;
  setSelectedNote: (selectedNote: Note | null) => void;
  deleteCategory:(categoryId: number) => void;
}

const AppContext = createContext<NoteContextType | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transNote, setTransNote] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const notes = getNotes();
  const categories = getCategories();


  const addNewNote = (note: Note) => {
    addNote(note);
  };

  const updateExistingNote = (updatedNote: Note) => {
    updateNote(updatedNote);
  };

  const deleteNoteById = (noteId: number) => {
    deleteNote(noteId);
  };

  const addNewCategory = (category: Category) => {
    addCategory(category);
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        categories,
        addNewNote,
        updateExistingNote,
        deleteNoteById,
        transNote,
        setTransNote,
        setSelectedFolder,
        selectedFolder,
        addCategory: addNewCategory,
        selectedNote,
        setSelectedNote,
        deleteCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a MyContextProvider");
  }
  return context;
};
