import { Link } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import { useState, useEffect } from "react";

export default function Home() {
  const { user, http, logout, token } = AuthUser();

  // state for stats
  const [stats, setStats] = useState({
    total_products: 0,
    total_orders: 0,
    pending_orders: 0,
  });

  // fetch stats on page load
  useEffect(() => {
    http.get("/dashboard/stats").then((res) => {
      setStats(res.data);
    });
  }, [token]);
  
  // check if the user is logged in (you usually store token in localStorage)
//   const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="container mt-5">
      {/* Welcome Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user?.name || "Guest"}!</h2>
        {token ? (
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>) : (<Link to="/login" className="btn btn-outline-primary btn-sm">
            Login</Link>)
        }
      </div>

      {/* Quick Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Total Products</h5>
            <p className="display-6">{stats.total_products}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Total Orders</h5>
            <p className="display-6">{stats.total_orders}</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm p-3">
            <h5>Pending Orders</h5>
            <p className="display-6">{stats.pending_orders}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <div className="mb-4">
        <Link to="/dashboard" className="btn btn-primary me-3">
          Dashboard
        </Link>
        <Link to="/products" className="btn btn-secondary me-3">
          Products
        </Link>
        <Link to="/orders" className="btn btn-info text-white">
          Orders
        </Link>
      </div> */}

      {/* Footer */}
      <footer className="text-center text-muted mt-5">
        &copy; 2025 My Tech Dashboard
      </footer>
    </div>
  );
}
