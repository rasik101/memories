import * as api from '../api';
export const signup = (formData, history) => async (dispatch) => {
    try {
      
    const { data } = await api.signup(formData);
        dispatch({ type: "AUTH", data:data});
        history.push('/')
  } catch (e) {
    console.log(e);
  }
};
export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
      dispatch({ type: "AUTH", data: data });
      history.push("/");
  } catch (e) {
    console.log(e);
  }
};
