import { useEffect, useState } from "react";
import { RootState, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { IResources } from "../../types/user";

export default function AttackPage() {
    const { user } = useAppSelector((state: RootState) => state.user);
    const [area, setArea] = useState("");
    const areas = ["North", "South", "West Bank", "Center"]
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) navigate("/login")
        if (user?.organization ==="IDF") navigate("/defense")
        console.log(user);
    }, [user]);

    const handleAttack = () => {}

  return (
    <div className="attack-page">
      <h2>{`organization: ${user?.organization}`}</h2>
      <div className="resources">
        <h3>available ammo</h3>
        <div className="ammo">
            <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="" disabled hidden>Area</option>
        {areas.map((area: string) => <option value={area}>{area}</option>)}
      </select>
      <p>{user?.resources.map((resource: IResources) => 
        <button 
        className="attack-button"
        key={resource.name} 
        onClick={handleAttack}
        >{`${resource.name} * ${resource.amount}`}
        </button>
        )}</p>
        </div>
      </div>
      <h3>Launched Missiles</h3>
      <div className="launched">
        
      </div>
    </div>
  )
}
