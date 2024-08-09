import React , {useState}from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const[cName , setCName] = useState("fas fa-bars");
  const[nName , setNName] =useState("nav-menu");
  const handleCName = ()=>{
      if (cName === "fas fa-bars") {
          setCName("fas fa-times");
          setNName('nav-menu active');
      } else {
          setCName("fas fa-bars");
           setNName("nav-menu");
      } 
  }
  return (
    <>
      <div className="container mb-5">
        <nav className="Navbar">
          <Link className="navbar-logo" to='/'>NewsBuzz</Link>
          <div className="menu-icons" onClick={handleCName}>
            <i className={cName}></i>
          </div>
          <ul className={nName}>
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/business">
                Business
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/general">
                General
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/health">
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science">
                Science
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology">
                Technology
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
    </>
  );
};
export default Navbar;
