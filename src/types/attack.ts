export interface IAttack {
    _id: string;
    organization: string;
    area: string;
    missile: string;
    speed: number;
    status: string;
    date: Date;
    attacker_id: string;
    timeToHit: number
}
