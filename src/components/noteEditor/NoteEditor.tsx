import React, { useState, useEffect } from "react";
import "./NoteEditor.css";
import { useGlobalContext } from "../../context";
import {MdOutlineDone} from "react-icons/md"
import {AiFillDelete} from "react-icons/ai"

const NoteEditor: React.FC = () => {
  const {
    addNewNote,
    updateExistingNote,
    selectedFolder,
    setTransNote,
    deleteNoteById,
    selectedNote,
    setSelectedNote,
  } = useGlobalContext();

  const [editedNote, setEditedNote] = useState({
    id: 0,
    title: "",
    content: "",
    categoryId: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setEditedNote({
        id: selectedNote.id,
        title: selectedNote.title,
        content: selectedNote.content,
        categoryId: selectedNote.categoryId,
      });
      setIsEditing(true);
    } else {
      setEditedNote({ id: 0, title: "", content: "", categoryId: 0 });
      setIsEditing(false);
    }
  }, [selectedNote]);

  const handleSaveEditedNote = () => {
    if (editedNote.id && selectedFolder) {
      updateExistingNote({
        ...editedNote,
        categoryId: parseInt(selectedFolder),
      });
      setSelectedNote(null); 
      setEditedNote({ id: 0, title: "", content: "", categoryId: 0 });
      setIsEditing(false);
      setTransNote(false);
    }
  };

  const handleAddNote = () => {
    if (editedNote.title && editedNote.content && selectedFolder) {
      addNewNote({
        id: Date.now(),
        title: editedNote.title,
        content: editedNote.content,
        categoryId: parseInt(selectedFolder),
      });
      setEditedNote({ id: 0, title: "", content: "", categoryId: 0 });
      setTransNote(false);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      setSelectedNote(null); 
      deleteNoteById(selectedNote.id);
      setEditedNote({ id: 0, title: "", content: "", categoryId: 0 });
      setIsEditing(false);
      setTransNote(false);
    }
  };

  return (
    <div className="note-editor">
      <h3>
        {isEditing ? `Edit note: ${editedNote.title}` : "Create a New Note"}
      </h3>
      <div className="note-edit">
        <input
          type="text"
          style={{fontWeight:600}}
          placeholder="Title"
          className="title-edit"
          value={editedNote.title}
          onChange={(e) =>
            setEditedNote({ ...editedNote, title: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          value={editedNote.content}
          className="textarea"
          onChange={(e) =>
            setEditedNote({ ...editedNote, content: e.target.value })
          }
        />
      </div>
      <div className="note-actions">
        {isEditing ? (
          <>
           <div className="button-save">
           <button className="btn-save" onClick={handleSaveEditedNote}>
              Save Changes
            </button>
            <MdOutlineDone className="icon"/>
           </div>
           <div className="button-del">
           <button className="btn-del" onClick={handleDeleteNote}>
              Delete Note
            </button>
            <AiFillDelete className="icon" />
           </div>
          </>
        ) : (
          <button className="btn-save" onClick={handleAddNote}>
            Add Note
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
