import { useEffect } from "react";
import { IAttack } from "../../types/attack";
import { socket } from "../../main";
import { useAppDispatch } from "../../redux/store";
import { updateAttackTime } from "../../redux/slices/attacksSlice";

export default function DefenseCard({ attack }: { attack: IAttack }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
    socket.on("updateAttackTime", (updatedAttack) => {
        if (updatedAttack.id === attack._id) {
            dispatch(updateAttackTime(updatedAttack));
        }
    });

    return () => {
        socket.off("updateAttackTime");
    };
}, [dispatch, attack._id]);
    
    return (
        <div className="launched-card">
            <p>{attack.missile}</p>
            <p>{Math.floor(attack.timeToHit / 60)}:{attack.timeToHit % 60}m</p>
            <p>{attack.status}{
                attack.status === "Launched" && <button>Launch defense</button>
            }</p>
        </div>
    );
}
