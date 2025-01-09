import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [ usuario, setUsuario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmitUsuario = async (event) => {
        event.preventDefault();
        actions.setUser({
            usuario,
            email,
            password
        });
        actions.setIsLogged(true);
        navigate('/')
    }

    return (
        <div className="container mt-5">
            <div className="container p-5 bg-dark">
                <form onSubmit={handleSubmitUsuario}>
                    <div className="mb-3">
                        <label htmlFor="inputUser" className="form-label text-white">Usuario</label>
                        <input onChange={(event) => setUsuario(event.target.value)} value={usuario} type="text" className="form-control" id="inputUser" placeholder="Introduzca un Usuario valido" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label text-white">Email address</label>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label text-white">Password</label>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" id="inputPassword" />
                    </div>
                    <div className="mb-3 text-end">
                        <button type="submit" className="btn btn-success me-2">Submit</button>
                        <button type="reset" onClick={() => navigate('/')} className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}