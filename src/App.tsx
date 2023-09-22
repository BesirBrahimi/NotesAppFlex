import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import NoteList from "./components/noteList/NoteList";
import NoteEditor from "./components/noteEditor/NoteEditor";
import Header from "./components/header/Header";
import { useGlobalContext } from "./context";

const App: React.FC = () => {
  const { transNote } = useGlobalContext();
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Sidebar />
        <NoteList />
        {transNote && <NoteEditor />}
      </div>
    </div>
  );
};

export default App;
