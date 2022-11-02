import "./Nav.css";
import logo from "../../assets/link.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav">
      <div className="navContainer">
        <img src={logo} className="navItem logo" />
        <Link className="link" to={"/"}>
          <h1 className="navItem">SoloLink</h1>
        </Link>
      </div>

      <div className="navContainer">
        <a className="navItem">Register</a>
        <Link className="link" to={"/Login"}>
          <a className="navItem">Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
