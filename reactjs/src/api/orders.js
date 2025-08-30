import { useEffect,useState } from "react";
import AuthUser from "../components/AuthUser";

export default function Orders()
{
    const {http} = AuthUser();
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [newOrderItems, setNewOrderItems] = useState([{ "product_id": "", "quantity": 1 }]);

    // Fetch all orders
    const fetchOrders = () =>{
        http.get("/orders").then((res) => setOrders(res.data));
    };

    // Fetch products for order form
    const fetchProducts = () =>{
        http.get("/products").then((res) => setProducts(res.data));
    };

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    // Add a new row in order form
    const addOrderItem = () => {
        setNewOrderItems([...newOrderItems, {"product_id": "", "quantity": 1}]);
    };

    // Remove a row
    const removeOrderItem = (index) =>{
        const items = [...newOrderItems];
        items.splice(index, 1);
        setNewOrderItems(items);
    };

    // Handle change in product or quantity
    const handleItemChange = (index, field, value) =>{
        const items = [...newOrderItems];
        items[index][field] = value;
        setNewOrderItems(items);
    };

    // Create new order
    const createOrder = () =>{
        http.post("/orders", { items:newOrderItems }).then(() =>{
            fetchOrders();
            setNewOrderItems([{ product_id: "", quantity: 1 }]);    //reset form
        })

        .catch((err) => {
            alert(err.response.data.massage || "Failed to create order");
        });
    };

    // Update order status
    const updateStatus = (id, status) =>{
        http.put(`/orders/${id}/status`, { status }).then(() => fetchOrders());
    };

    return(
        <div>
          <h3>Create Order</h3>
          <div className="card p-3 mb-4">
            {newOrderItems.map((item, index) => (
              <div className="row mb-2" key={index}>
                <div className="col">
                  <select className="form-control" value={item.product_id} onChange={(e) => handleItemChange(index, "product_id", e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} (${p.price} | Stock: {p.stock})</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <input type="number" min="1" value={item.quantity} className="form-control" onChange={(e) => handleItemChange(index, "quantity", e.target.value)} />  
                </div>
                <div className="col-auto">
                  <button className="btn btn-danger" onClick={(e) => removeOrderItem(index)}>Remove</button>  
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-end gap-2 mt-3">
                <button className="btn btn-secondary" onClick={addOrderItem}>Add Item</button>
                <button className="btn btn-success" onClick={createOrder}>Place Order</button>
            </div>
          </div>

          <h3>My Orders</h3>
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th>Placed At</th>
                    <th>Total</th>
                    <th width="200">Update Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((o) => (
                    <tr key={o.id}>
                        <td>#{o.id}</td>
                        <td>
                            {o.items.map((item) => (
                                <div key={item.id}>
                                    {item.product?.name} x {item.quantity}
                                </div>
                            ))}
                        </td>
                        <td>{o.status}</td>
                        <td>{o.placed_at}</td>
                        <td>${o.total}</td>
                        <td>
                            <select value={o.status} className="form-select form-select-sm" onChange={(e) => updateStatus(o.id, e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="shipped">Shipped</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    );
}