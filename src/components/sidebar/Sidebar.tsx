import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import "./Sidebar.css";
import { FaFolder } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const Sidebar: React.FC = () => {
  const { 
    categories,
    selectedFolder,
    setSelectedFolder,
    addCategory,
    deleteCategory,
    setTransNote,
  } = useGlobalContext();
  const [newFolderName, setNewFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [folderList, setFolderList] = useState(categories);

  useEffect(() => {
    setFolderList(categories);
  }, [categories, addCategory]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedFolders = [...folderList];
    const [movedFolder] = reorderedFolders.splice(result.source.index, 1);
    reorderedFolders.splice(result.destination.index, 0, movedFolder);

    setFolderList(reorderedFolders);
  };

  const handleFolderClick = (folderId: number) => {
    setSelectedFolder(folderId.toString());
    setTransNote(false)

  };

  const handleDeleteFolder = (categoryId: number) => {
    deleteCategory(categoryId);

    setFolderList((prevList) => prevList.filter((folder) => folder.id !== categoryId));
    if (selectedFolder === categoryId.toString()) {
      setSelectedFolder("");
    }
  };

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      addCategory({ id: Date.now(), name: newFolderName });
      setNewFolderName("");
    }
  };

  const closeSearch = () => {
    setShowInput(false);
  };

  return (
    <div className="sidebar">
      <div className="add-folder">
        <div onClick={toggleInput} className="button-icon">
          <button>Create Category</button>
          <AiOutlinePlus className="plus-icon" />
        </div>
        {showInput && (
          <div className="search-icons">
            <input
              type="text"
              placeholder="Add a category..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div>
              <MdDone onClick={handleAddFolder} className="icon-done" />
              <AiOutlineClose onClick={closeSearch} className="icon-exit" />
            </div>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="folders">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="folder-list"
            >
              {folderList.map((category, index) => (
                <Draggable
                key={category.id.toString()} // Ensure this key is unique
                draggableId={category.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`folder-item ${
                        category.id.toString() === selectedFolder ? "" : "selected"
                      }`}
                      onClick={() => handleFolderClick(category.id)}
                    >
                      <div className="folder-name">
                        <div className="icon-name">
                          <FaFolder
                            style={{ marginRight: "5px", fontSize: "22px" }}
                          />{" "}
                          Category: {category.name}
                        </div>
                        <div className="delete-add-folder">
                          {category.id.toString() === selectedFolder ? (
                            <>
                              <AiFillDelete
                                className="delete-folder"
                                onClick={() => handleDeleteFolder(category.id)}
                              />
                              <BiSolidRightArrow className="icons" />
                            </>
                          ) : (
                            <>
                              <BiSolidDownArrow className="icons" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Sidebar;




///////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from "react";
// import { useGlobalContext } from "../../context";
// import "./Sidebar.css";
// import { FaFolder } from "react-icons/fa";
// import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import { MdDone } from "react-icons/md";
// import { AiFillDelete } from "react-icons/ai";

// const Sidebar: React.FC = () => {
//   const { 
//     categories,
//     selectedFolder,
//     setSelectedFolder,
//     addCategory,
//     deleteCategory
//   } = useGlobalContext();
//   const [newFolderName, setNewFolderName] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [folderList, setFolderList] = useState(categories);

//   useEffect(() => {
//     setFolderList(categories);
//   }, [categories, addCategory]);

//   const handleFolderClick = (folderId: number) => {
//     setSelectedFolder(folderId.toString());
//   };

//   const handleDeleteFolder = (categoryId: number) => {
//     deleteCategory(categoryId);

//     setFolderList((prevList) => prevList.filter((folder) => folder.id !== categoryId));
//     if (selectedFolder === categoryId.toString()) {
//       setSelectedFolder("");
//     }
//   };

//   const toggleInput = () => {
//     setShowInput((prev) => !prev);
//   };

//   const handleAddFolder = () => {
//     if (newFolderName.trim() !== "") {
//       addCategory({ id: Date.now(), name: newFolderName });
//       setNewFolderName("");
//     }
//   };

//   const closeSearch = () => {
//     setShowInput(false);
//   };

//   return (
//     <div className="sidebar">
//       <div className="add-folder">
//         <div onClick={toggleInput} className="button-icon">
//           <button>Create Category</button>
//           <AiOutlinePlus className="plus-icon" />
//         </div>
//         {showInput && (
//           <div className="search-icons">
//             <input
//               type="text"
//               placeholder="Add a category..."
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//             />
//             <div>
//               <MdDone onClick={handleAddFolder} className="icon-done" />
//               <AiOutlineClose onClick={closeSearch} className="icon-exit" />
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="folder-list">
//         {folderList.map((category) => (
//           <div
//             key={category.id}
//             className={`folder-item ${
//               category.id.toString() === selectedFolder ? "" : "selected"
//             }`}
//             onClick={() => handleFolderClick(category.id)}
//           >
//             <div className="folder-name">
//               <div className="icon-name">
//                 <FaFolder style={{ marginRight: "5px", fontSize: "22px" }} />{" "}
//                 Category: {category.name}
//               </div>
//               <div className="delete-add-folder">
//                 {category.id.toString() === selectedFolder ? (
//                   <>
//                     <AiFillDelete
//                       className="delete-folder"
//                       onClick={() => handleDeleteFolder(category.id)}
//                     />
//                     <BiSolidRightArrow className="icons" />
//                   </>
//                 ) : (
//                   <>
//                     <BiSolidDownArrow className="icons" />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
