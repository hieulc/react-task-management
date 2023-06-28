import styles from "../login.module.css";

function MemberShow({ name }) {
  const { username } = JSON.parse(localStorage.getItem("user"));

  const isAdmin = name === username;

  return (
    <div className={styles.invidual_member}>
      <div className={styles.member_name}>
        {isAdmin && (
          <div>
            {name} - <span className={styles.isAdmin}>Admin</span>
          </div>
        )}
        {!isAdmin && name}
      </div>
      <hr className={styles.btm_form_separator} />
    </div>
  );
}

export default MemberShow;
