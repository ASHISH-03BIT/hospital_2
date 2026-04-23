import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { createFoundItem } from "../services/itemService";

const initialState = {
  title: "",
  description: "",
  category: "electronics",
  locationFound: "",
  dateFound: "",
  image: "",
};

const ReportFoundItemPage = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createFoundItem(form);
      navigate("/found-items");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <h2>Report Found Item</h2>
      {error && <p className="error-msg">{error}</p>}
      <form className="simple-form" onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="id_cards">ID Cards</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
          <option value="documents">Documents</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="Location Found" value={form.locationFound} onChange={(e) => setForm({ ...form, locationFound: e.target.value })} required />
        <input type="date" value={form.dateFound} onChange={(e) => setForm({ ...form, dateFound: e.target.value })} required />
        <input placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button className="btn-primary" type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default ReportFoundItemPage;
