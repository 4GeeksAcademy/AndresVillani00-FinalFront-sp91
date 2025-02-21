import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const { store } = useContext(Context);
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmitUsuario = async (event) => {
        event.preventDefault();
        const datos = { email, password }
        await actions.login(datos)
        if(store.isLogged) {
            navigate('/')
        }
    }

    return (
        <div className="container mt-5">
            <div className="container p-5 bg-dark">
                <form onSubmit={handleSubmitUsuario}>
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