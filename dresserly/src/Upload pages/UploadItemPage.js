import React from "react";
import Dropzone from "../Components/Dropzone";
import "./UploadItemPageCSS.css";
import { useState } from "react";
import AddTagsForm from "../Components/AddTagsForm";
import { CircularProgress } from "@mui/material";

export default function UploadItemPage() {
  const [item, setItem] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [settingTags, setSettingTags] = useState(false);
  const [loading, setLoading] = useState(false);

  const moveToTags = async () => {
    setSettingTags(true);
  };

  const onItemAdded = (item, itemImage) => {
    setItem(item);
    setItemImage(itemImage);
  };

  return (
    <div className="flex justify-center p-8 w-full gap-4 xs:py-4 xs:px-4 md:flex-row lg:px-8">
      <div className="flex flex-col w-3/5 rounded-xl py-8 px-6 bg-[#673ab7]/10">
        {!settingTags ? (
          <>
            <div className="flex items-center justify-between p-4 text-2xl font-semibold">
              <h1>Upload Clothes</h1>
            </div>
            <div className="flex justify-center px-8">
              <Dropzone onItemAdded={onItemAdded} />
            </div>
            <div className="Actions">
              <button
                className="bg-[#673ab7]"
                disabled={item === null}
                onClick={moveToTags}
              >
                Next
              </button>
            </div>{" "}
          </>
        ) : (
          <div>
            {loading ? (
              <div className="flex justify-center">
                <CircularProgress></CircularProgress>
              </div>
            ) : (
              <AddTagsForm
                itemImageFile={item}
                itemImageURL={itemImage}
                setLoading={setLoading}
              ></AddTagsForm>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
