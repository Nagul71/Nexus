import { useMutation, useQueryClient } from 'react-query';
import "./dashboard.css";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    mutation.mutate(text);
  };
  return (
    <div className="Dashboard">
      <div className="texts">
        <div className="logo">
          <img src="/assets/imglogo.png" alt="" />
          <h1>NEXUS AI</h1>
        </div>
        <div className="help">What Can I help With?</div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
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