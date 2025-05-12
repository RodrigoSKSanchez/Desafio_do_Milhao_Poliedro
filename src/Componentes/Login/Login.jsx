import { FaUser, FaLock } from "react-icons/fa";

import { useState } from "react";

import "./Login.css";



const Login = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log("Envio");
        };


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-field">
                <FaUser className="icon" />
                <input type="email" placeholder="E-mail" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-field"> 
                <FaLock className="icon" />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="recall-forget">
                    Lembrar de mim
                    <input type="checkbox" />
                </div>
                <button>Entrar</button>
            </form>
        </div>
    )
}

export default Login