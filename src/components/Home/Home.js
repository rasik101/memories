import React, { useEffect } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify='space-between' align='stretch' spacing={3}>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
