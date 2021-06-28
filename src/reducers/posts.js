const initialState = {
  posts: [],
  selectedPostId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...state, posts: action.payload };
    case "CREATE_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "SELECTED_POST":
      return { ...state, selectedPostId: action.payload };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post, index) =>
          post._id === action.payload._id ? action.payload : state.posts[index]
        ),
      };
    case "UPDATE_LIKE":
      return {
        ...state,
        posts: state.posts.map((post, index) =>
          post._id === action.payload._id ? action.payload : state.posts[index]
        ),
      };

    default:
      return { ...state };
  }
};

export default reducer;
