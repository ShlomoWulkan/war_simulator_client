import { useEffect, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store"
import { fetchLogin } from "../../redux/slices/userSlice"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { user } = useAppSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
    if (!user?._id) return
    if (user?.organization ==="IDF") {
        navigate("/defense")
    } else {
        navigate("/attack")
    }
  }, [user]);
  
  return (
    <div className="login-form">
        <input 
        type="text" 
        placeholder="user name" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        />

        <input 
        type="password" 
        placeholder="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />
        <button onClick={ ()  => dispatch(fetchLogin({username, password}))}  >Login</button>
        <Link to="/register">dont have an account yet? sign up here</Link>
      
    </div>
  )
}
