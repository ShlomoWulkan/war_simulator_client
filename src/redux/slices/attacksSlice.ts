import { attacksState, DataStatus } from "../../types/redux";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAttack } from "../../types/attack";

const apiUrl = import.meta.env.VITE_API_URL;


const initialState: attacksState = {
    attacks: [],
    status: DataStatus.IDLE,
    error: null
}

export const fetchAttacks = createAsyncThunk("attacks/getList",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${apiUrl}attacks/`, {
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
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<attacksState>) => {
    builder.addCase(fetchAttacks.pending, (state)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.attacks = []
    }).addCase(fetchAttacks.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.attacks = action.payload as unknown as IAttack[]
    }).addCase(fetchAttacks.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.attacks = []
    })
  },
});

export default attackSlice
