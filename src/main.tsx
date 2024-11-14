import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import App from './App.tsx'
import { io } from "socket.io-client";


const apiUrl = import.meta.env.VITE_API_URL;


export const socket = io(`${apiUrl}`);

socket.on("connect", () => {
  console.log("Connected to server");
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
