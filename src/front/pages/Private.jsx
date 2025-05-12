import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) return navigate("/login");

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        fetch(`${backendUrl}/api/private`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) setMessage(data.message);
            else navigate("/login");
        });
    }, []);

    const logout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
};
