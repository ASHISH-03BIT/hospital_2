import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { getLostItemById } from "../services/itemService";

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getLostItemById(id);
        setItem(data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <Layout>
      {error && <p className="error-msg">{error}</p>}
      {item && (
        <div className="detail-card">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Location Lost:</strong> {item.locationLost}</p>
          <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Posted By:</strong> {item.createdBy?.name} ({item.createdBy?.email})</p>
        </div>
      )}
    </Layout>
  );
};

export default ItemDetailsPage;
