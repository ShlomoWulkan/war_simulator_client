import { useEffect, useState } from "react";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { IResources } from "../../types/user";
import { fetchAttacksOfOrg } from "../../redux/slices/attacksSlice";
import { IAttack } from "../../types/attack";
import LaunchedCard from "./launchedCard";


export default function AttackPage() {
    const { user } = useAppSelector((state: RootState) => state.user);
    const { attacks } = useAppSelector((state: RootState) => state.attacks);
    const [area, setArea] = useState("");
    const areas = ["North", "South", "West Bank", "Center"]
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) navigate("/login")
        if (user?.organization ==="IDF") navigate("/defense")
        fetchData();
    }, [user, dispatch]);

    const fetchData = async () => {
        try {
            await dispatch(fetchAttacksOfOrg(user?._id as string))
        } catch (error) {
            console.error("Failed to fetch attacks:", error);
        }
    };

    const handleAttack = () => {
        if (area === ""){
            alert("Please select an area")
            return
        } 
    }

  return (
    <div className="attack-page">

      <h2>{`organization: ${user?.organization}`}</h2>

      <div className="resources">
        <h3>available ammo</h3>
        <div className="ammo">
            <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="" disabled hidden>Area</option>
        {areas.map((area: string) => <option key={area} value={area}>{area}</option>)}
      </select>
      <p>
        {user?.resources.map((resource: IResources) => 
        <button 
        className="attack-button"
        key={resource.name} 
        onClick={handleAttack}
        >{`${resource.name} * ${resource.amount}`}
        </button>
        )}
        </p>
        </div>
      </div>

      <h3>Launched Missiles</h3>
      <div className="launched">
        <div className="launched-card">
            <h4>Missile</h4>
            <h4>Time to hit</h4>
            <h4>Status</h4>
        </div>
        {attacks.map((attack: IAttack) => <LaunchedCard key={attack._id} attack={attack} />)}
      </div>
    </div>
  )
}
