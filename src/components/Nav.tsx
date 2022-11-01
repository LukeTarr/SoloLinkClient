import "./Nav.css";
import logo from "../assets/link.png";

const Nav = () => {
  return (
    <div className="Nav">
      <div className="navContainer">
        <img src={logo} className="navItem logo" />
        <h1 className="navItem">SoloLink</h1>
      </div>

      <div className="navContainer">
        <a className="navItem">Register</a>
        <a className="navItem">Login</a>
      </div>
    </div>
  );
};

export default Nav;
