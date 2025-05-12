import React, { useState } from "react";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.token) {
            sessionStorage.setItem("token", data.token);
            window.location.href = "/private";
        } else {
            alert("Credenciales inválidas");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};
