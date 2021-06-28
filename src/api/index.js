import axios from "axios";

const API = axios.create({ baseURL: "https://rasik-memories.herokuapp.com" });
// const API = axios.create({ baseURL: "http://localhost:8080" });
API.interceptors.request.use((request) => {
  if (localStorage.getItem("profile")) {
    request.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
    return request
});

export const fetchPosts = () => API.get("/posts");
export const createPosts = (post) => API.post("/posts", post);
export const updatePosts = (id, post) => API.patch(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updateLike = (id) => API.patch(`/posts/${id}/likes`);
export const signup = (formData) => API.post("/user/signup", formData);
export const login = (formData) => API.post("/user/signIn", formData);
