import React from "react";
import Post from "./post/Post";
import useStyles from "./style.posts";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
export default function Posts() {
  const posts = useSelector((state) => state.posts.posts);
  const classes = useStyles();
  return (
    <div>
      {!posts.length ? (
        <CircularProgress />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems='stretch'
          spacing={3}
        >
          {posts.map((post) => (
            <Grid item key={post._id} sm={6} xs={12}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
