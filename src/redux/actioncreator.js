import { LOGIN, REGISTER, HOME } from "./actions";

export const getLogin = () => {
  return {
    type: LOGIN
  };
};

export const getRegister = () => {
  return {
    type: REGISTER
  };
};

export const getHome = () => {
  return {
    type: HOME
  };
};
