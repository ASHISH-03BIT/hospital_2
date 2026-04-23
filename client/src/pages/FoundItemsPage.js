import { useEffect, useState } from "react";
import Layout from "./Layout";
import { claimItem, getFoundItems } from "../services/itemService";

const FoundItemsPage = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setError("");
      const data = await getFoundItems();
      setItems(data.data.items);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleClaim = async (id) => {
    try {
      await claimItem(id);
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <h2>Found Items</h2>
      {error && <p className="error-msg">{error}</p>}
      <div className="list-grid">
        {items.map((item) => (
          <div key={item._id} className="list-card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location Found:</strong> {item.locationFound}</p>
            <p><strong>Status:</strong> {item.claimed ? "Claimed" : "Available"}</p>
            {!item.claimed && (
              <button className="btn-primary" onClick={() => handleClaim(item._id)}>
                Mark Claimed
              </button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FoundItemsPage;
