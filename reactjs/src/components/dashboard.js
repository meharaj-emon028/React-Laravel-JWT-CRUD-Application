import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import Products from "../api/products";
import Orders from "../api/orders";

export default function Dashboard()
{
    // State to track which tab is active (default = "products")
    // const [tab, setTab] = useState("products");
    // const [username, setUserName] = useState("");   // State for storing logged-in username

    // // Load username from localStorage when Dashboard mounts
    // useEffect(() =>{
    //     const storedUser = localStorage.getItem("name")
    //     if(storedUser){
    //         setUserName(storedUser);    //save username in state
    //     }
    // }, []);

    return (
        <div className="mt-4">
          {/* <h2>Welcome, {username || "User"}</h2> */}
        
          <div className="btn-group mt-3">

            {/* Products tab button  */}
            <button className={`btn ${tab === "products" ? "btn-primary" : "btn-outline-primary"}`} onClick={()=>setTab("products")}>Products</button>
            
            {/* Orders tab button */}
            <button className={`btn ${tab === "orders" ? "btn-primary" : "btn-outline-primary"}`} onClick={()=>setTab("orders")}>Orders</button>
          </div>

          {/* Render section based on selected tab */}
          <div className="mt-4">
            {/* <h4>{tab === "products" ? "Product-List" : "Order-List"}</h4> */}
            {tab === "products" && <Products />}     {/* Show Products component if tab is 'products' */}
            {tab === "orders" && <Orders />}         {/* Show Orders component if tab is 'orders' */}
          </div>
        </div>
    );
}
