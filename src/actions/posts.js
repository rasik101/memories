import * as api from "../api";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const createPosts = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(post);
    dispatch({ type: "CREATE_POST", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(id, post);
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (e) {
    console.log(e);
  }
};

export const updateLike = (id) => async (dispatch) => {
  try {
    const { data } = await api.updateLike(id);
    dispatch({ type: "UPDATE_LIKE", payload: data });
  } catch (e) {
    console.log(e);
  }
};

