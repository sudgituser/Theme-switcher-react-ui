const initialState = {
  login: false,
  home: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        home: false,
        login: true
      };
    case "REGISTER":
      return {
        login: false,
        home: false
      };
    case "HOME":
      return {
        login: false,
        home: true
      };
    default:
      return state;
  }
};
export default authReducer;
