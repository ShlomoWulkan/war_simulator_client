import { attacksState, DataStatus } from "../../types/redux";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAttack } from "../../types/attack";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState: attacksState = {
    attacks: [],
    status: DataStatus.IDLE,
    error: null
}

export const fetchAttacksOfOrg = createAsyncThunk("attacks/getList",
    async (attacker_id: string, thunkAPI) => {
        try {
            const response = await fetch(`${apiUrl}api/attacks/org/${attacker_id}`, {
                headers: {
                    "authorization": localStorage.getItem("token")! 
                }
            }
            )
            if (response.status !== 200) {
                thunkAPI.rejectWithValue("Failed to login")
            }
            const data = await response.json()            
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

const attackSlice = createSlice({
    name: "attacks",
    initialState,
    reducers: {
        updateAttackTime: (state, action: PayloadAction<{ id: string; timeToHit: number }>) => {
            const updatedAttack = state.attacks.find(attack => attack._id === action.payload.id);
            if (updatedAttack) {
                updatedAttack.timeToHit = action.payload.timeToHit;
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<attacksState>) => {
    builder.addCase(fetchAttacksOfOrg.pending, (state)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.attacks = []
    }).addCase(fetchAttacksOfOrg.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.attacks = action.payload as unknown as IAttack[]
    }).addCase(fetchAttacksOfOrg.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.payload as string
        state.attacks = []
    })
  },
});

export const { updateAttackTime } = attackSlice.actions;

export default attackSlice
