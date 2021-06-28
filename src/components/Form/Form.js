import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./style.form.";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, updatePost } from "../../actions/posts";

export default function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user=JSON.parse(localStorage.getItem("profile"))
  const selectedPostId = useSelector((state) => state.posts.selectedPostId);
  const post = useSelector((state) =>
    selectedPostId
      ? state.posts.posts.find((post) => post._id === selectedPostId)
      : null
  );

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const clear = () => {
    dispatch({ type: "SELECTED_POST", payload: null });
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
   
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPostId) {
      dispatch(updatePost(selectedPostId, {...postData,name:user?.result?.name}));
    } else {
      dispatch(createPosts({ ...postData, name: user?.result?.name }));
    }
    clear();
  };
  
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  if (!user?.result) {
    return (<Paper className={classes.paper}>
      <Typography variant='h6' align='center'>
        Please signIn to create a post
      </Typography>

    </Paper>
    
  )
}

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root}${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6' className={classes.TextInput}>
          {post ? "Updating" : "Creating"} A memory
        </Typography>
        
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          className={classes.TextInput}
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          fullWidth
          className={classes.TextInput}
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          className={classes.TextInput}
          value={postData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          sizes='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          sizes='small'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
