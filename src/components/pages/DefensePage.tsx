import { useEffect } from "react";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { IResources } from "../../types/user";
import { fetchAttacksOfArea } from "../../redux/slices/attacksSlice";
import { IAttack } from "../../types/attack";
import { socket } from "../../main";  
import DefenseCard from "./defenseCard";

export default function DefensePage() {

  const { user } = useAppSelector((state: RootState) => state.user);
  const { attacks } = useAppSelector((state: RootState) => state.attacks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    } else if (user?.organization !== "IDF") {
      navigate("/attack");
    } else {
      fetchData();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const handleNewAttack = (attackData: any) => {
      console.log("New attack received:", attackData);
      if (user?.area) {
        dispatch(fetchAttacksOfArea(user.area));
      }
    };
    socket.on("newAttackCreated", handleNewAttack);

    return () => {
      socket.off("newAttackCreated", handleNewAttack);
    };
  }, [dispatch, user?.area]);

  const fetchData = async () => {
    if (user?.area) {
      try {
        await dispatch(fetchAttacksOfArea(user.area));
        console.log(attacks);
      } catch (error) {
        console.error("Failed to fetch attacks:", error);
      }
    }
  };

  return (
    <div className="attack-page">
      <h2>{`organization: ${user?.organization}`}</h2>

      <div className="resources">
        <h3>available ammo</h3>
        <div className="ammo">
          <p>
            {user?.resources?.map((resource: IResources) => (
              <button
                className="attack-button"
                key={resource.name}
                onClick={() => { }}
              >
                {`${resource.name} * ${resource.amount}`}
              </button>
            ))}
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
        {attacks.map((attack: IAttack) => (
          <DefenseCard key={attack._id} attack={attack} />
        ))}
      </div>
    </div>
  );
}
