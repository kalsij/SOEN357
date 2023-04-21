import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

import useStyles from "./ClothingItemStyle";

function TagsInput({ tagList }) {
  return (
    <div className="tags-input-container mt-1 flex-wrap p-1">
      {tagList.map((tag, index) => (
        <div
          className="tag-item inline-block rounded-2xl bg-[#673ab7]/50 m-2"
          key={index}
        >
          <span className="text p-2.5">{tag.name}</span>
        </div>
      ))}
    </div>
  );
}

const ClothingItem = ({ clothe, onUpdateCartQty }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={clothe ? clothe.itemPic : "No Image"}
        title={clothe ? clothe.itemName : "No Name"}
      />
      <CardContent data-testid="productCardContentsTest">
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {clothe ? clothe.itemName : "No Name"}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {clothe ? clothe.category : "No Price"}
          </Typography>
        </div>
        <hr></hr>
        <div>
          <TagsInput tagList={clothe.tags}></TagsInput>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
