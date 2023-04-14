import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { auth, db } from "../firebase.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useNavigate } from "react-router";
function TagsInput({ tagList, setTagList }) {
  return (
    <div className="tags-input-container mt-1 flex-wrap p-1">
      {tagList.map((tag, index) => (
        <div
          className="tag-item inline-block rounded-2xl bg-yellow-100 m-2"
          key={index}
        >
          <span className="text p-2.5">{tag.name}</span>
          <button
            className="close text-black min-w-0 text-md pl-0 pr-2"
            onClick={(e) => {
              e.preventDefault();
              setTagList(tagList.filter((tg) => tg.id !== tag.id));
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
export default function AddTagsForm({
  itemImageFile,
  itemImageURL,
  item,
  setLoading,
}) {
  const [categorySelection, setCategorySelection] = useState();
  const [styleSelection, setStyleSelection] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [createTagName, setCreateTagName] = useState("");
  const [itemName, setItemName] = useState("");
  const [loadingTags, setLoadingTags] = useState(false);
  const [tags, setTags] = useState([]);
  const [openTagsModal, setOpenTagsModal] = useState(false);
  const storage = getStorage();
  const navigate = useNavigate();

  const categoryOptions = ["Top", "Bottom", "Dress"];

  const styleOptions = ["Casual", "Formal", "Cocktail", "Workout"];
  const getTags = async () => {
    setLoadingTags(true);
    if (item) {
      setTags(item.tags);
      setLoadingTags(false);
    } else {
      await getDoc(doc(db, "tags", auth.currentUser.email)).then((res) => {
        if (res.data()) {
          setTags(res.data()["tags"]);
          setLoadingTags(false);
        } else {
          setLoadingTags(false);
        }
      });
    }
  };
  const uploadItem = async () => {
    setLoading(true);
    let id = item ? item.id : new Date().valueOf();
    const clothesStorage = ref(
      storage,
      `clothes/${auth.currentUser.uid}/${id}`
    );
    const uploadPic = await uploadBytes(clothesStorage, itemImageFile);
    const downloadPicURL = await getDownloadURL(uploadPic.ref);
    const userDoc = await getDoc(doc(db, "clothes", auth.currentUser.email));
    if (userDoc.data()) {
      await updateDoc(
        doc(db, "clothes", auth.currentUser.email, "userclothes", `${id}`),
        {
          id: id,
          category: categorySelection,
          style: styleSelection,
          tags: selectedTags,
          itemPic: downloadPicURL,
          itemName: itemName,
        }
      )
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          navigate("/");
        });
    } else {
      await setDoc(
        doc(db, "clothes", auth.currentUser.email, "userclothes", `${id}`),
        {
          id: id,
          category: categorySelection,
          style: styleSelection,
          tags: selectedTags,
          itemPic: downloadPicURL,
          itemName: itemName,
        }
      )
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          navigate("/");
        });
    }
  };

  const createTag = async (e) => {
    setLoadingTags(true);
    e.preventDefault();
    const userDoc = await getDoc(doc(db, "tags", auth.currentUser.email));
    if (userDoc.data()) {
      await updateDoc(doc(db, "tags", auth.currentUser.email), {
        tags: arrayUnion({
          name: createTagName,
        }),
      })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          setCreateTagName("");
          getTags();
        });
    } else {
      await setDoc(doc(db, "tags", auth.currentUser.email), {
        tags: arrayUnion({
          name: createTagName,
        }),
      })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          setCreateTagName("");
          getTags();
        });
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="flex items-center justify-between p-4 text-2xl font-semibold">
          <h1>Add Tags</h1>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col p-8 w-2/3">
          <img alt="Item" className="" src={itemImageURL} />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col w-full justify-between">
            <div className="flex flex-col mb-6">
              <div className="flex flex-col mb-6 items-center">
                <label htmlFor="item-name-field" className="text-xl mb-2">
                  Item's name
                </label>
                <input
                  id="item-name-field"
                  type="text"
                  className="rounded-full w-1/2 bg-white py-2 px-6 outline-none"
                  placeholder="Enter a name..."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="flex justify-start w-full mb-2">
                <span className="text-xl">Category</span>
              </div>

              <div className="flex flex-row w-full place-content-around">
                {categoryOptions.map((categoryOption) => (
                  <div className="flex" key={categoryOption}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-category-${categoryOption}`}
                      className="peer hidden"
                      checked={categorySelection === categoryOption}
                      onChange={() => {
                        categorySelection === categoryOption
                          ? setCategorySelection(null)
                          : setCategorySelection(categoryOption);
                      }}
                    />
                    <label
                      htmlFor={`custom-checkbox-category-${categoryOption}`}
                      className="flex cursor-pointer
                  rounded-lg py-3 px-6 font-bold text-white-200 transition-colors duration-200 ease-in-out peer-checked:bg-[#673ab7]/50"
                    >
                      <div className="flex items-center">{categoryOption}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <div className="flex justify-start w-full mb-2">
                <span className="text-xl">Style</span>
              </div>

              <div className="flex flex-row w-full place-content-around">
                {styleOptions.map((styleOption) => (
                  <div className="flex" key={styleOption}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-category-${styleOption}`}
                      className="peer hidden"
                      checked={styleSelection === styleOption}
                      onChange={() => {
                        styleSelection === styleOption
                          ? setStyleSelection(null)
                          : setStyleSelection(styleOption);
                      }}
                    />
                    <label
                      htmlFor={`custom-checkbox-category-${styleOption}`}
                      className="flex cursor-pointer select-none 
                  rounded-lg py-3 px-6 font-bold text-white-200 transition-colors duration-200 ease-in-out peer-checked:bg-[#673ab7]/50"
                    >
                      <div className="flex items-center">{styleOption}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-start w-full mb-2">
                <span className="text-xl">Tags</span>
                <button
                  className="flex"
                  onClick={() => {
                    getTags();
                    setOpenTagsModal(true);
                  }}
                >
                  {" "}
                  <AddIcon color="secondary"></AddIcon>
                </button>
                <div className="flex"></div>
              </div>

              <div className="flex flex-row w-full">
                {selectedTags && (
                  <div>
                    <TagsInput
                      tagList={selectedTags}
                      setTagList={setSelectedTags}
                    ></TagsInput>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {openTagsModal && (
            <Modal
              onConfirm={() => {
                setOpenTagsModal(false);
              }}
              onCancel={() => {
                setOpenTagsModal(false);
              }}
              showCancel={false}
              confirmText="Done"
            >
              <h1 className="mb-4 text-2xl font-semibold">Select tags</h1>
              {loadingTags ? (
                <div className="flex justify-center w-full">
                  <CircularProgress className=""></CircularProgress>
                </div>
              ) : (
                <>
                  <div>
                    <form onSubmit={createTag}>
                      <input
                        id="item-name-field"
                        type="text"
                        className="rounded-full w-full bg-[#673ab7]/10 py-2 px-6 outline-none focus:bg-[#673ab7]/20"
                        placeholder="Add a tag..."
                        value={createTagName}
                        onChange={(e) => setCreateTagName(e.target.value)}
                      />
                    </form>
                  </div>
                  <hr></hr>
                  {tags?.length > 0 ? (
                    <div className="flex flex-col items-center overflow-auto h-60 mt-2">
                      {tags?.map((tag, index) => (
                        <div className="w-2/3 mb-3" key={index}>
                          <div className="flex" key={tag.name}>
                            <input
                              type="checkbox"
                              id={`custom-checkbox-tag-${tag.name}`}
                              className="peer hidden"
                              checked={
                                selectedTags.find(
                                  (selectedTag) => selectedTag.name === tag.name
                                ) !== undefined
                              }
                              onChange={() => {
                                selectedTags.find(
                                  (selectedTag) => selectedTag.name === tag.name
                                ) === undefined
                                  ? setSelectedTags((oldSelectedTags) => [
                                      ...oldSelectedTags,
                                      tag,
                                    ])
                                  : setSelectedTags((oldSelectedTags) =>
                                      oldSelectedTags.filter(
                                        (oldSelectedTag) =>
                                          oldSelectedTag.name !== tag.name
                                      )
                                    );
                              }}
                            />
                            <label
                              htmlFor={`custom-checkbox-tag-${tag.name}`}
                              className="flex w-full cursor-pointer select-none 
                  rounded-lg py-3 px-6 font-bold text-white-200 transition-colors duration-200 ease-in-out peer-checked:bg-[#673ab7]/50 hover:bg-[#673ab7]/10"
                            >
                              <div className="items-center w-full text-center break-words">
                                {tag.name}
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">You don't have any tags!</div>
                  )}
                </>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </div>
      <div className="Actions">
        <button
          className="bg-[#673ab7]"
          disabled={!(categorySelection && styleSelection && itemName?.trim())}
          onClick={uploadItem}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
