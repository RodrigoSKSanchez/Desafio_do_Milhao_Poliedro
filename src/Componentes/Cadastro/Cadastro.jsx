import { useState } from "react";
import "./Cadastro.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Cadastro = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Envio");
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <div className="input-field">
                <FaUser className="icon" />
                <input type="Nome" placeholder="Nome" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-field">
                <FaEnvelope className="icon" />
                <input type="Email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-field">
                <FaLock className="icon" />
                <input type="Password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-field">
                <FaLock className="icon" />
                <input type="Password" placeholder="Confirme sua senha" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button>Cadastrar</button>
            </form>
        </div>
    )
}

export default Cadastro;