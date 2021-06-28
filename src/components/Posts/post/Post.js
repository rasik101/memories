import React from "react";
import useStyles from "./style.post";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, updateLike } from "../../../actions/posts";
import Likes from './Likes';

export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleEdit = (id) => {
    dispatch({ type: "SELECTED_POST", payload: id });
  };
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  const handleLikeButton = (id) => {
    dispatch(updateLike(id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.id === post?.creator ||
          user?.result?.googleId === post?.creator) && (
          <Button
            style={{ color: "white" }}
            sizes='small'
            onClick={() => handleEdit(post._id)}
          >
            <MoreHorizIcon fontSize='default' />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant='h6' color='textSecondary'>
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography variant='h5' className={classes.title} gutterBottom>
        {post.title.trim()}
      </Typography>
      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
          components='p'
          gutterBottom
        >
          {post.message.trim()}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          sizes='small'
          color='primary'
          onClick={() => handleLikeButton(post._id)}
          disabled={!user?.result}
        >
          <Likes post={post} />
        </Button>
        {(user?.result?.id === post?.creator ||
          user?.result?.googleId === post?.creator) && (
          <Button
            sizes='small'
            color='primary'
            onClick={() => handleDelete(post._id)}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
