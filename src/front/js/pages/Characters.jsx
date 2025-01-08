import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const [ personajes, setPersonajes ] = useState([]);
    const host = 'https://www.swapi.tech/api/';

    const getPersonajes = async () => {
        const uri = `${host}/people`;
        const options = {
            method: 'GET'
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        const datos = await response.json();
        setPersonajes(datos.results);
    }

    useEffect(() => {
        getPersonajes();
    }, [])

    return (
        <div className="container p-5">
            <div className="bg-dark">
            <h1 className="text-white text-center">Characters</h1>
                <div className="container d-flex p-5">
                    <div className="row">
                        {personajes.map((item) =>
                            <div className="col my-5">
                                <div className="card" style={{width: '12rem'}}>
                                    <img src={'https://starwars-visualguide.com/assets/img/characters/'+item.uid+'.jpg'} className="card-img-top" alt="imagen" />
                                    <div className="card-body">
                                        <h6 className="card-title">{item.name}</h6>
                                        <div className="d-flex justify-content-between">
                                            <a href="#" className="btn btn-secondary">Details</a>
                                            <button type="button" className="btn btn-outline-warning"><i className="fa-regular fa-heart"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}