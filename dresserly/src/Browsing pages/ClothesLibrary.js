import { React, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./ClothingItemStyle";
import ClothingItem from "./ClothingItem";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ClothesLibrary = () => {
  const [clothes, setClothes] = useState([]);
  const [pristineClothes, setPristineClothes] = useState([]);

  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredClothes = pristineClothes.filter(
    (clothe) =>
      clothe.itemName &&
      clothe.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchClothes = async () => {
    if (auth?.currentUser?.email) {
      console.log("hello");
      const clothingCollection = collection(
        db,
        "clothes",
        auth?.currentUser?.email,
        "userclothes"
      );
      const q = query(clothingCollection);
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          ...doc.data(),
        });
      });
      setPristineClothes(docs);
      setClothes(docs);
    }
  };

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
    setClothes(filteredClothes);
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchClothes();
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-10/12">
        <div className="flex flex-row w-4/5">
          <input
            id="item-name-field"
            type="text"
            className="rounded-full w-full bg-[#673ab7]/10 py-2 px-6 outline-none focus:bg-[#673ab7]/20"
            placeholder="Search for an item...."
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
        <hr></hr>
        <div className={classes.toolbar} />
        <Grid container justifyContent="center" spacing={4}>
          {clothes
            ? clothes.map((clothe, key) => (
                <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                  <ClothingItem clothe={clothe} />
                </Grid>
              ))
            : ""}
        </Grid>
      </div>
    </div>
  );
};

export default ClothesLibrary;
