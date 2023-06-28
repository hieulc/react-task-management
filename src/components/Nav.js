import { Link } from "react-router-dom";
import { FaTrello } from "react-icons/fa";

function Navbar({ logout }) {
  const signout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    logout();
  };

  return (
    <nav className="nav">
      <div className="site-title">
        <Link to="/" className="title-icon">
          <FaTrello />
        </Link>
        <Link to="/" className="title-text">
          Trello
        </Link>
      </div>
      <ul className="nav-bar-list">
        <li>
          <Link to="/boards" children="Boards" />
        </li>
        <li>
          <Link to="/about" children="About" />
        </li>
        <li>
          <Link to="/login" onClick={signout} children="Logout" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
