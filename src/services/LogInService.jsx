import Axios from "axios";

export const logInService = (email, password) => {
  return Axios({
    method: "POST",
    url: `http://casestudy.cyberlearn.vn/api/Users/signin`,
    data: {
      email,
      password,
    },
  });
};
