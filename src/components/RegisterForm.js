import styles from "../login.module.css";
import logo from "../images/trello-logo-blue.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { USER_API } from "../context/api";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import success_logo from "../images/accept-icon.svg";

const schema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterForm() {
  const [duplicateError, setDuplicateError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const findExistEmail = async (username) => {
    const response = await axios.get(USER_API + `/exist/${username}`);

    return response.data;
  };

  const registerAccount = async (email, password) => {
    const response = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "content-type": "application/json",
      },
      url: USER_API + "/save",
      data: JSON.stringify({
        email,
        password,
        firstName: "hieulc",
        lastName: "le",
      }),
    });

    return response.data;
  };

  const successRegister = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAccept = () => {
    handleModalClose();
    navigate("/login");
  };

  const success_image = (
    <img
      src={success_logo}
      alt="success_logo"
      style={{ height: 30, width: 30 }}
      className={styles.success_logo}
    />
  );

  const actionBar = (
    <div>
      <button onClick={handleAccept} className={`btn ${styles.register_btn}`}>
        Accept
      </button>
    </div>
  );

  const modal = (
    <Modal
      onClose={handleModalClose}
      actionBar={actionBar}
      image={success_image}
    >
      <h1>Congratulations</h1>
      <p>Your account have been created successfully</p>
      <p>Click 'Accept' to redirect to Login Page</p>
    </Modal>
  );

  const handleOnSave = async ({ username, password }) => {
    const existEmail = await findExistEmail(username);

    if (errors.username || errors.password) {
      return;
    }

    if (existEmail === 1) {
      setDuplicateError(
        "Username is already existed. Please using another email!"
      );
      return;
    }

    registerAccount(username, password);
    successRegister();
  };

  return (
    <div className={styles.body}>
      <img src={logo} className={styles.logo} alt="Trello Logo" />
      <section className={styles.inner_section}>
        <div className={styles.section_wrapper}>
          <div className={styles.login_form}>
            <h1 className={styles.synvW}>Sign up for your account</h1>
            <div className={styles.login_password_container}>
              <form onSubmit={handleSubmit(handleOnSave)}>
                <div className={styles.login_password_container_email}>
                  <div className={styles.input_label}>
                    <label>Username</label>
                  </div>
                  <input
                    className={styles.form_field}
                    type="text"
                    placeholder="Enter email"
                    autoFocus
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <div className={`${styles.alert} ${styles.field_error}`}>
                    {errors.username?.message}
                  </div>
                )}
                {duplicateError && (
                  <div className={`${styles.alert} ${styles.field_error}`}>
                    {duplicateError}
                  </div>
                )}
                <div className={styles.login_password_container_password}>
                  <div className={styles.input_label}>
                    <label>Password</label>
                  </div>
                  <input
                    className={styles.form_field}
                    type="password"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <div className={`${styles.alert} ${styles.field_error}`}>
                    {errors.password?.message}
                  </div>
                )}
                <div className={styles.login_password_container_submit}>
                  <input
                    type="submit"
                    value="Continue"
                    className={styles.btn}
                  />
                </div>
              </form>
            </div>
            <hr className={styles.btm_form_separator} />
            <ul className={styles.btm_form_link}>
              <li>
                <Link
                  to="/login"
                  children="Already have an account? Log In"
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
      {showModal && modal}
    </div>
  );
}
