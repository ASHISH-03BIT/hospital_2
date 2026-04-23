import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getLostItems } from "../services/itemService";

const LostItemsPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const loadItems = async () => {
    try {
      setError("");
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (category) params.append("category", category);
      const data = await getLostItems(params.toString());
      setItems(data.data.items);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Layout>
      <h2>Lost Items</h2>
      <div className="filters">
        <input placeholder="Search keyword" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="id_cards">ID Cards</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="documents">Documents</option>
          <option value="other">Other</option>
        </select>
        <button className="btn-primary" onClick={loadItems}>Apply</button>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <div className="list-grid">
        {items.map((item) => (
          <div key={item._id} className="list-card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location Lost:</strong> {item.locationLost}</p>
            <Link to={`/lost-items/${item._id}`}>View details</Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default LostItemsPage;
