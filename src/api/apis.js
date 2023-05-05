import { axiosInstance } from "./axios";

export const login = async (email, password) => {
  try {
    let input = {
      email: email,
      password: password,
    };

    console.log(input);

    const config = {
      data: input,
    };

    const response = await axiosInstance.post(
      "auth/login",
      config.data,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllUsers = async () => {
  try {
    let input = {};

    console.log(input);

    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.get("admin/getAllUsers", config);
    return response;
  } catch (err) {
    return err;
  }
};

export const blockUser = async (id, flag) => {
  try {
    let input = {
      
    };

    console.log(input);

    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.post(
      `admin/blockUser/${id}/?flag=${flag}`,
      config.data,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
}