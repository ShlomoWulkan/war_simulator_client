import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

export default function Register() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("");


  useEffect(() => {
    if (user?._id) {
      navigate("/votes");
    }
  }, []);

  const orgs = ["IDF", "Hezbollah", "Hamas", "IRGC" ,"Houthis"]
  const areas = ["North", "South", "West Bank", "Center"]

  const apiUrl = import.meta.env.VITE_API_URL;


  const handleRegister = async () => {
    try {
        const res = await fetch(`${apiUrl}api/auth/register`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
          });
          console.log(res);
          
          await res.json();
    } catch (err) {
        console.log({err})
    }
  }

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
        <option value="" disabled hidden>Organization</option>
        {orgs.map((org: string) => <option value={org}>{org}</option>)}
      </select>

      {organization === "IDF" && <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="" disabled hidden>Area</option>
        {areas.map((area: string) => <option value={area}>{area}</option>)}
      </select>}

      <button onClick={handleRegister}>
        Register
      </button>
      <Link to="/login">olredy have an account? Login here</Link>
    </div>
  );
}