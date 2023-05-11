import { axiosInstance } from "./axios";

export const login = async (email, password) => {
  try {
    let input = {
      email: email,
      password: password,
    };

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

export const getAllPrograms = async () => {
  try {
    let input = {};

    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.get("program/getAllPrograms", config);
    return response;
  } catch (err) {
    return err;
  }
};

export const getAllSemesters = async () => {
  try {
    let input = {};

    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.get(
      "semester/getAllSemesters",
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const blockUser = async (id, flag) => {
  try {
    let input = {};

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
};

export const createUser = async (User) => {
  try {
    let input = User;

    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.post(
      "auth/createUser",
      config.data,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const createSemester = async (term, year, startDate, endDate) => {
  try {
    let code = `${term} ${year}`;
    let input = {
      semesterName: code,
      semesterStartDate: startDate,
      semesterEndDate: endDate,
    };
    const config = {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token")),
        "Content-type": "application/json",
      },
      data: input,
    };

    const response = await axiosInstance.post(
      "semester/createSemester",
      config.data,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};
