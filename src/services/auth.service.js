import axios from "axios";
import { LOGIN_URL, REGISTER_URL } from "../context/api";

class AuthService {
  async login(username, password) {
    const response = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: LOGIN_URL,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: {
        username,
        password,
      },
    });

    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(REGISTER_URL, {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
