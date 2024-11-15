import { UserDTO } from "../../dto/userDTO";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState: userState = {
    user: null,
    status: DataStatus.IDLE,
    error: null
}

const fetchLogin = createAsyncThunk("user/login",
    async (user: { username: string, password: string }, thunkAPI) => {
        const response = await fetch(`${apiUrl}api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (response.status !== 200) {
            thunkAPI.rejectWithValue("Failed to login")
        }
        const data = await response.json()
        localStorage.setItem("token", data.token)
        return data
    }
)

const fetchRegister = createAsyncThunk("user/register",
    async (user: UserDTO, thunkAPI) => {
        const response = await fetch(`${apiUrl}api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (response.status !== 200) {
            thunkAPI.rejectWithValue("Failed to register")
        }
        const data = await response.json()
        return data
    }
)

const fetchUser = createAsyncThunk("user/fetchUser",
    async (userId: string, thunkAPI) => {
        const response = await fetch(`${apiUrl}api/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.status !== 200) {
            return thunkAPI.rejectWithValue("Failed to fetch user data");
        }
        const data = await response.json();
        return data;
    }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
        state.user = null
        localStorage.removeItem("token")
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder.addCase(fetchLogin.pending, (state)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.user = null
    }).addCase(fetchLogin.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.user = action.payload as unknown as IUser
    }).addCase(fetchLogin.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.user = null
    }).addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload as IUser;
    });
  },
});

export { fetchLogin, fetchRegister, fetchUser }
export default userSlice
