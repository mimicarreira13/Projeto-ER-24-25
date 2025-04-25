import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function CreateAccount({ onAccountCreated }) {
    const [nif, setNif] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("normal");
    const [isEntity, setIsEntity] = useState(false);
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!/^\d{9}$/.test(nif)) {
            Swal.fire({
                title: 'Erro',
                text: 'O NIF pode apenas conter 9 números!',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                }
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Erro',
                text: 'As palavras passe não são iguais!',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                }
            });
            return;
        }

        const accountType = isEntity ? "entidade" : "normal";

        try {
            const response = await fetch('http://localhost:4000/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, nif, password, accountType }),
            });

            if (response.ok) {
                console.log("Account created!");
                onAccountCreated();
                navigate("/login");
            } else if (response.status === 400) {
                Swal.fire({
                    title: 'Erro',
                    text: 'NIF já existe. Não é possível criar uma conta.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao criar conta.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custom-confirm-button'
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Erro',
                text: 'Erro ao criar conta.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'custom-confirm-button'
                }
            });
        }
    };

    const handleToggleAccountType = () => {
        if (isEntity) {
            setIsEntity(false);
            navigate("/create-account");
        } else {
            setIsEntity(true);
        }
    };


    return (
        <div className="create-account-container">
            <form className="create-account-form" onSubmit={handleSubmit}>
                <h2>{isEntity ? "Criar Conta Entidade" : "Criar Conta"}</h2>
                {isEntity && (
                    <div className="form-group">
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome"
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="text"
                        id="nif"
                        value={nif}
                        onChange={(e) => setNif(e.target.value)}
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
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="password-toggle-icon"
                        >
                            {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <p className="link_criacao_entidade">
                        <span onClick={handleToggleAccountType} className="link">
                            {isEntity ? "Criar conta normal" : "Sou uma Entidade"}
                        </span>
                    </p>
                </div>
                <button type="submit">Criar Conta</button>
            </form>
        </div>
    );
}

export default CreateAccount;