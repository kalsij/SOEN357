import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import "./DropzoneCSS.css";

function Dropzone({ onItemAdded }) {
  const [highlight, setHighlight] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [itemImage, setItemImage] = useState(null);
  const [item, setItem] = useState(null);
  const fileInputRef = React.createRef();
  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onItemAddedDefault = (evt) => {
    setItemImage(URL.createObjectURL(evt.target.files[0]));
    setItem(evt.target.files[0]);
    if (onItemAdded) {
      onItemAdded(
        evt.target.files[0],
        URL.createObjectURL(evt.target.files[0])
      );
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = (event) => {
    setHighlight(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    if (disabled) return;
    const files = event.dataTransfer.files;
    if (onItemAdded) {
      const array = fileListToArray(files);
      onItemAdded(array);
    }
  };

  const fileListToArray = (list) => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  return (
    <>
      {!item ? (
        <div
          className={`Dropzone ${highlight ? "bg-[#673ab7]/20" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={openFileDialog}
          style={{ cursor: item ? "default" : "pointer" }}
          hidden={item !== null}
        >
          <>
            <input
              ref={fileInputRef}
              className="FileInput"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={onItemAddedDefault}
            />
            <img
              alt="Upload"
              className="Icon"
              src="baseline-cloud_upload-24px.svg"
            />
            <span>Upload item</span>
          </>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-end p-0">
            <button
              className="flex p-0 justify-end"
              onClick={() => {
                setItem(null);
                setItemImage(null);
                onItemAdded(null);
              }}
            >
              {" "}
              <CloseIcon color="error"></CloseIcon>
            </button>
          </div>
          <div>
            <img alt="Item" src={itemImage} />
          </div>
        </div>
      )}
    </>
  );
}

export default Dropzone;
