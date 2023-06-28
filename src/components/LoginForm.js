import { useState } from "react";
import axios from "axios";
import { LOGIN_URL } from "../context/api";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styles from "../login.module.css";
import logo from "../images/trello-logo-blue.svg";

export default function LoginForm({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const login = async (username, password) => {
    try {
      const response = await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        headers: {
          "content-type": "multipart/form-data",
        },
        url: LOGIN_URL,
        data: {
          username,
          password,
        },
      });
      return response;
    } catch (err) {
      setError(err);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = login(username, password);
    setToken((await response).data.access_token);
    setUser((await response).data);
    navigate("/");
  };

  return (
    <div className={styles.body}>
      <img src={logo} className={styles.logo} alt="Trello Logo" />
      <section className={styles.inner_section}>
        <div className={styles.section_wrapper}>
          <div className={styles.login_form}>
            <h1>Log in to Trello</h1>
            <div className={styles.login_password_container}>
              <form onSubmit={handleSubmit}>
                <div className={styles.login_password_container_email}>
                  <div className={styles.input_label}>
                    <label>Username</label>
                  </div>
                  <input
                    className={styles.form_field}
                    type="text"
                    name="username"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className={styles.login_password_container_password}>
                  <div className={styles.input_label}>
                    <label>Password</label>
                  </div>
                  <input
                    className={styles.form_field}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.login_password_container_submit}>
                  <input
                    type="submit"
                    value="Continue"
                    className={styles.btn}
                  />
                </div>

                {error && (
                  <div
                    className={`${styles.alert} ${styles.login_error}`}
                    role="alert"
                  >
                    Invalid username or password
                  </div>
                )}
              </form>
            </div>
            <hr className={styles.btm_form_separator} />
            <ul className={styles.btm_form_link}>
              <li>
                <a className={styles.forgotLink} href="#">
                  Can't log in?
                </a>
              </li>
              <li>
                <Link
                  to="/register"
                  children="Sign up for an account"
                  className={styles.registerLink}
                />
              </li>
            </ul>
          </div>
          <ul className={`${styles.btm_form_link} ${styles.smaller_link}`}>
            <li>
              <a>Privacy Policy</a>
            </li>
            <li>
              <a>Terms of Service</a>
            </li>
          </ul>
        </div>
      </section>
      <div className={styles.background}>
        <div className={styles.left_large}>
          <svg />
        </div>
        <div className={styles.right_large}></div>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
