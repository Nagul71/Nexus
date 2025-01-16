import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="Dashboard">
      <div className="texts">
        <div className="logo">
          <img src="assets\logo.png" alt="" />
          <h1>NEXUS AI</h1>
        </div>
        <div className="help">What Can I help With?</div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" name="text" placeholder="Ask Nexus" />
          <button>
            <img src="/assets/top.png" alt="" />
          </button>
          </form>
      </div>
    </div>
  );
};

export default Dashboard;