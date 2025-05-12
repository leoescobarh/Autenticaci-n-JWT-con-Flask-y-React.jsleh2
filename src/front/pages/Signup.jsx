import React, { useState } from "react";

export const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            credentials: "include"

        });
        if (res.ok) window.location.href = "/login";
        else alert("Error creando usuario");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Registrarse</button>
        </form>
    );
};
