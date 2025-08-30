import axios from "axios"; 
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){

    const navigate = useNavigate();

    // Get token from sessionStorage
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
        
    }
    // Get user object from sessionStorage
    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    // Save token + user + username
    const saveToken = (user,token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        //Save username separately in localStorage for easy access
        if(user?.name){
            localStorage.setItem('name', user.name);
        }

        setToken(token);
        setUser(user);
        navigate('/');
    }

    // Logout function (clear everything)
     const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        localStorage.removeItem('name');
        setToken(null);
        setUser(null);
        navigate('/login');
    }

    // Axios instance with Authorization header
    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",   
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
    });

    return{
        setToken:saveToken,
        user,
        token,
        getToken,
        http,
        logout
    };
}