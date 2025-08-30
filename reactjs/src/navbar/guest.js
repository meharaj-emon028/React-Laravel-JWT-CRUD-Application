import { Routes, Route, Link } from "react-router-dom";
import Home from '../components/home';
import Login from '../components/login';
import Register from "../components/register";

function Guest() {

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
            </li> */}
            <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

    </div>
  );
}

export default Guest;
