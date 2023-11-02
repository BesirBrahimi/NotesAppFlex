import React, { useState } from "react";
import "./NoteList.css";
import { useGlobalContext } from "../../context";
import { Note } from "../types/Types";
import { AiOutlinePlus } from "react-icons/ai";

const NoteList: React.FC = () => {
  const {
    notes,
    selectedFolder,
    setTransNote,
    deleteNoteById,
    setSelectedNote,
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setTransNote(true);
  };

  const createNote = () => {
    setTransNote(true) 
    setSelectedNote(null)
  }

  return (
    <div className="notes-list">
      <div className="notes-header">
        <div className="button-icon-search">
          <button
            className="Create-note"
            disabled={!selectedFolder}
            onClick={createNote}
          >
            Create Note
          </button>
          <AiOutlinePlus className="plus" />
        </div>
        <input
          className="input-search"
          disabled={!selectedFolder}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {selectedFolder && (
        <div className="notes-container">
          <div className="note-list">
            {notes
              .filter((note) => note.categoryId.toString() === selectedFolder)
              .filter((note) => {
                const searchText = searchQuery.toLowerCase();
                return (
                  note.title.toLowerCase().includes(searchText) ||
                  note.content.toLowerCase().includes(searchText)
                );
              })
              .map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleEditNote(note)}
                  className="note-item"
                >
                  <div className="note-title">{note.title}</div>
                  <div className="note-content">{note.content}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;
