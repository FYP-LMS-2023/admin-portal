import { axiosInstance } from "./axios";

export const login = async (email, password) => {
  try {
    let input = {
      "email": email,
      "password": password,
    };

    console.log(input)

    const config = {
      data: input,
    };

    const response = await axiosInstance.post("auth/login", config.data, config);
    return response;
  } catch (err) {
    return err;
  }
};
