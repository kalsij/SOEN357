import React, { useEffect } from "react";
import { useState } from "react";
import "./MatchingPage.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackwardIosIcon from "@mui/icons-material/ArrowBackIos";

export default function MatchingPage() {
  const [currentTopIndex, setCurrentTopIndex] = useState(0);
  const [currentBottomIndex, setCurrentBottomIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [tags, setTags] = useState([]);
  const [topClothes, setTopClothes] = useState([]);
  const [bottomClothes, setBottomClothes] = useState([]);
  const [pristineTopClothes, setPristineTopClothes] = useState([]);
  const [pristineBottomClothes, setPristineBottomClothes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const styles = ["Casual", "Formal", "Cocktail", "Workout"];

  const fetchClothes = async () => {
    const clothingCollection = collection(
      db,
      "clothes",
      auth?.currentUser?.email,
      "userclothes"
    );
    const q = query(clothingCollection);
    const querySnapshot = await getDocs(q);
    const topDocs = [];
    const bottomDocs = [];
    querySnapshot.forEach((doc) => {
      if (doc.data()["category"] === "Top") {
        topDocs.push({
          ...doc.data(),
        });
      } else if (doc.data()["category"] === "Bottom") {
        bottomDocs.push({
          ...doc.data(),
        });
      }
    });
    setTopClothes(topDocs);
    setBottomClothes(bottomDocs);
    setPristineBottomClothes(bottomDocs);
    setPristineTopClothes(topDocs);
  };

  const fetchTags = async () => {
    const tagsDocRef = doc(db, "tags", auth?.currentUser?.email);
    getDoc(tagsDocRef).then((res) => {
      setTags(res.data()["tags"]);
    });
  };

  const handleTopNextClick = () => {
    if (currentTopIndex === topClothes.length - 1) {
      setCurrentTopIndex(0);
    } else {
      setCurrentTopIndex(currentTopIndex + 1);
    }
  };

  const handleTopPrevClick = () => {
    if (currentTopIndex === 0) {
      setCurrentTopIndex(topClothes.length - 1);
    } else {
      setCurrentTopIndex(currentTopIndex - 1);
    }
  };

  const handleBottomPrevClick = () => {
    if (currentTopIndex === 0) {
      setCurrentBottomIndex(bottomClothes.length - 1);
    } else {
      setCurrentBottomIndex(currentTopIndex - 1);
    }
  };

  const handleBottomNextClick = () => {
    if (currentTopIndex === bottomClothes.length - 1) {
      setCurrentBottomIndex(0);
    } else {
      setCurrentBottomIndex(currentTopIndex + 1);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchClothes();
      fetchTags();
    }
  }, [currentUser]);

  const changeStyle = () => {
    let tempStyle = "";
    document.getElementsByName("styleCheckbox").forEach((checkbox) => {
      if (checkbox.checked) {
        setSelectedStyle(checkbox.id);
        tempStyle = checkbox.id;
      }
    });
    setTopClothes(
      pristineTopClothes.filter(
        (topClothe) =>
          topClothe.tags?.some((tag) =>
            selectedTags.length > 0 ? selectedTags.includes(tag.name) : true
          ) && topClothe.style === tempStyle
      )
    );
    setBottomClothes(
      pristineBottomClothes.filter(
        (bottomClothe) =>
          bottomClothe.tags?.some((tag) =>
            selectedTags.length > 0 ? selectedTags.includes(tag.name) : true
          ) && bottomClothe.style === tempStyle
      )
    );
    setTimeout(console.log(topClothes), 1000);
    setTimeout(console.log(bottomClothes), 1000);
    setCurrentTopIndex(0);
    setCurrentBottomIndex(0);
  };

  const changeFilters = () => {
    setSelectedTags([]);
    let tempTags = [];
    document.getElementsByName("tagCheckbox").forEach((checkbox) => {
      if (checkbox.checked) {
        setSelectedTags((oldTags) => [...oldTags, checkbox.id]);
        tempTags = [...tempTags, checkbox.id];
      }
    });
    setTopClothes(
      pristineTopClothes.filter(
        (topClothe) =>
          topClothe.tags?.some((tag) =>
            tempTags.length > 0 ? tempTags.includes(tag.name) : true
          ) && topClothe.style === selectedStyle
      )
    );
    setBottomClothes(
      pristineBottomClothes.filter(
        (bottomClothe) =>
          bottomClothe?.tags?.some((tag) =>
            tempTags.length > 0 ? tempTags.includes(tag.name) : true
          ) && bottomClothe.style === selectedStyle
      )
    );
    setCurrentTopIndex(0);
    setCurrentBottomIndex(0);
    setTimeout(console.log(topClothes), 1000);
    setTimeout(console.log(bottomClothes), 1000);
  };

  return (
    <div>
      <h1 className="image-gallery-title">DRESSERLY</h1>
      <div className="image-gallery-container">
        <div className="image-gallery-left">
          <h1 className="image-gallery-matching">MATCHING</h1>
        </div>
        <div className="image-gallery-middle">
          <h4 className="image-gallery-middle-titles">STYLE</h4>
          {styles.map((style, index) => (
            <div key={index}>
              <input
                type="radio"
                key={index}
                id={style}
                name="styleCheckbox"
                onChange={changeStyle}
              />
              <label key={`style ${index}`} htmlFor={style}>
                {style}
              </label>
            </div>
          ))}

          <h4 className="image-gallery-middle-titles">TAGS</h4>
          {tags?.map((tag, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={tag.name}
                key={index}
                name="tagCheckbox"
                onChange={changeFilters}
              />
              <label key={`tags ${index}`} htmlFor={tag.name}>
                {tag.name}
              </label>
            </div>
          ))}
        </div>
        <div className="image-gallery-right">
          <h5 className="image-gallery-secondTitle">TOP</h5>
          <div className="image-gallery-tops">
            <button
              className="flex p-0 justify-end border-0 bg-transparent"
              onClick={() => handleTopPrevClick()}
            >
              {" "}
              <ArrowBackwardIosIcon
                sx={{
                  fontSize: "200px",
                  color: "#ad7be9",
                  ":hover": {
                    color: "#ad7be9",
                    opacity: "0.6",
                  },
                }}
                color="inherit"
              ></ArrowBackwardIosIcon>
            </button>
            <img
              src={topClothes[currentTopIndex]?.itemPic}
              alt={topClothes[currentTopIndex]?.itemName}
            />
            <button
              className="flex p-0 justify-end border-0 bg-transparent"
              onClick={() => handleTopNextClick()}
            >
              {" "}
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "200px",
                  color: "#ad7be9",
                  ":hover": {
                    color: "#ad7be9",
                    opacity: "0.6",
                  },
                }}
                color="inherit"
              ></ArrowForwardIosIcon>
            </button>
          </div>

          <div className="image-gallery-bottoms ">
            <button
              onClick={() => handleBottomPrevClick()}
              className="flex p-0 justify-end border-0 bg-transparent"
            >
              {" "}
              <ArrowBackwardIosIcon
                sx={{
                  fontSize: "200px",
                  color: "#ad7be9",
                  ":hover": {
                    color: "#ad7be9",
                    opacity: "0.6",
                  },
                }}
                color="inherit"
              ></ArrowBackwardIosIcon>
            </button>
            <img
              src={bottomClothes[currentBottomIndex]?.itemPic}
              alt={bottomClothes[currentBottomIndex]?.itemName}
            />
            <button
              onClick={() => handleBottomNextClick()}
              className="flex p-0 justify-end border-0 bg-transparent"
            >
              {" "}
              <ArrowForwardIosIcon
                sx={{
                  fontSize: "200px",
                  color: "#ad7be9",
                  ":hover": {
                    color: "#ad7be9",
                    opacity: "0.6",
                  },
                }}
                color="inherit"
              ></ArrowForwardIosIcon>
            </button>
          </div>
          <h5 className="image-gallery-secondTitle">BOTTOM</h5>
        </div>
      </div>
    </div>
  );
}
