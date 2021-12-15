import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Toolbar from "./ui/ToolBar";
import { AuthContext } from "./contexts/AuthContext";
import PageRoutes from "./routes/PageRoutes";
import { CookiesProvider } from "react-cookie";

function App() {
    const [auth, setAuth] = useState({
        loggedIn: false,
        token: "",
        refreshToken: "",
        name: "",
        photo: "",
    });
    // const login = () => {
    //   const scope = 'user-read-private user-read-email user-modify-playback-state'
    //   const state = generateRandomString(16);
    //   const params = new URLSearchParams()
    //   console.log(redirect_uri)
    //   params.append('response_type', 'token')
    //   params.append('client_id', client_id)
    //   params.append('scope', scope)
    //   params.append('redirect_uri', redirect_uri)
    //   params.append('show_dialog', 'true')
    //   window.location.href = 'https://accounts.spotify.com/authorize?' +
    //   params.toString()
    // }

    return (
        <CookiesProvider>
            <AuthContext.Provider value={[auth, setAuth]}>
                <PageRoutes />
            </AuthContext.Provider>
        </CookiesProvider>
    );
}
export default App;
