import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import "./Sidebar.css";
import { FaFolder } from "react-icons/fa";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const {
    categories,
    selectedFolder,
    setSelectedFolder,
    addCategory,
    deleteCategory
  } = useGlobalContext();
  const [newFolderName, setNewFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [folderList, setFolderList] = useState(categories);

  useEffect(() => {
    setFolderList(categories);
  }, [categories]);

  const handleFolderClick = (folderId: number) => {
    setSelectedFolder(folderId.toString());
  };

  const handleDeleteFolder = (categoryId: number) => {
    deleteCategory(categoryId);

    setFolderList((prevList) => prevList.filter((folder) => folder.id !== categoryId));
    if (selectedFolder === categoryId.toString()) {
      setSelectedFolder("");
    }
  };

  const handleAddFolder = () => {
    if (newFolderName.trim() !== "") {
      addCategory({ id: Date.now(), name: newFolderName });
      setNewFolderName("");
    }
    setShowInput((prev) => !prev);
  };

  const handleAddFolder1 = () => {
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
        <div onClick={handleAddFolder} className="button-icon">
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
              <MdDone onClick={handleAddFolder1} className="icon-done" />
              <AiOutlineClose onClick={closeSearch} className="icon-exit" />
            </div>
          </div>
        )}
      </div>
      <div className="folder-list">
        {folderList.map((category) => (
          <div
            key={category.id}
            className={`folder-item ${
              category.id.toString() === selectedFolder ? "" : "selected"
            }`}
            onClick={() => handleFolderClick(category.id)}
          >
            <div className="folder-name">
              <div className="icon-name">
                <FaFolder style={{ marginRight: "5px", fontSize: "22px" }} />{" "}
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
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
