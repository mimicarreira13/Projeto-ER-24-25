import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCreateAccountClick = () => {
        navigate("/create-account");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nif: username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data.username, data.accountType,data.status);
                if (data.accountType === 'admin') {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }  else if (response.status === 400) {
                Swal.fire({
                    title: 'Error',
                    text: "O Utilizador não existe",
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            } else if (response.status === 401) {
                Swal.fire({
                    title: 'Error',
                    text: 'A Password é inválida',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Erro de login',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error logging in");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <input
                        type="text"
                        id="nif"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="NIF"
                        required
                    />
                </div>
                <div className="form-group">
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="password-toggle-icon"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type="submit">Login</button>
                <p className="link_criacao_conta">
                    <span onClick={handleCreateAccountClick} className="link">
                        Não tem conta? Crie uma!
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;