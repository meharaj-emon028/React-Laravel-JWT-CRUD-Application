import { useEffect, useState } from "react";
import AuthUser from "../components/AuthUser";
import { FaEdit, FaTrash} from "react-icons/fa";

export default function Products()
{
    const {http} = AuthUser();
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "", description: "" });
    const [editing, setEditing] = useState(null);

    //Fetch products
    const fetchProducts = () =>{
        http.get("/products").then((res) => setProducts(res.data));
    };

    useEffect(() =>{
        fetchProducts();
    }, []);

    // Handle form change
    const handleChange = (e) => setForm({ ...form, [e.target.name] : e.target.value });

    //Create product
    const createProduct = () => {
        http.post("/products", form).then(() => {
            fetchProducts();
            setForm({name: "", sku: "", price: "", stock: "", description: ""});
        });
    };

    //update product
    const updateProduct = () => {

        const payload = {
            ...form,
            price: parseFloat(form.price),
            stock: parseFloat(form.stock),
        };

        http.put(`/products/${editing}`, payload).then(() => {
            fetchProducts();
            setEditing(null);
            setForm({name: "", sku: "", price: "", stock: "", description: ""});
        });
    };

    //Delete product
    const deleteProduct = (id) => {
        http.delete(`/products/${id}`).then(() => fetchProducts());
    };

    // Set product for editing
    const editProduct = (product) =>{
        setEditing(product.id);
        setForm({
            name: product.name,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            description: product.description
        });
    };

    return(
        <div>
          <h3>Products</h3>
          {/* Product Form */}
          <div className="card p-3 mb-4">
            <h5>{editing ? "Edit Product" : "Add Product"}</h5>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="form-control mb-2" />
            <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU" className="form-control mb-2" />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" />
            <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="form-control mb-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" />
            <button className="btn btn-success" onClick={editing? updateProduct : createProduct}>{editing ? "Update" : "Create"}</button>
          </div>

          {/* Product list */}
          <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th width="100">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.sku}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>{p.description}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => editProduct(p)}> <FaEdit /> </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p.id)}> <FaTrash /> </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>     

    );
}