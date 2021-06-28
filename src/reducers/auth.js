const auth = (state = null, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        profile: action.data.profileObj,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        profile: null,
      };

    default:
      return { ...state };
  }
};
export default auth;
