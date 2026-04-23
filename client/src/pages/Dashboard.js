import { Link } from "react-router-dom";
import Layout from "./Layout";

const Dashboard = () => {
  return (
    <Layout>
      <section className="card-grid">
        <Link className="panel-card" to="/lost-items/new">
          <h3>Report Lost Item</h3>
          <p>Submit details for something you lost on campus.</p>
        </Link>
        <Link className="panel-card" to="/found-items/new">
          <h3>Report Found Item</h3>
          <p>Help others by posting items you found.</p>
        </Link>
        <Link className="panel-card" to="/lost-items">
          <h3>Browse Lost Items</h3>
          <p>Search open lost reports by keyword or category.</p>
        </Link>
        <Link className="panel-card" to="/found-items">
          <h3>Browse Found Items</h3>
          <p>Check found inventory and mark items as claimed.</p>
        </Link>
      </section>
    </Layout>
  );
};

export default Dashboard;
