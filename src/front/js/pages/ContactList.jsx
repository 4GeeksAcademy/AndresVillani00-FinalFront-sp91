import React, { useContext, useEffect } from "react";
import trooper from "../../img/StormTrooper.png";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const ContactList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleEdit = (taskContact) => {
        store.contactoParaEditar = taskContact;
        navigate('/contact/edit')
    }
    const handleDelete = async (taskId) => {
        actions.deleteContactos(taskId)
    };

    useEffect(() => {
        actions.getContactos();
    }, [])

    return (
        <div className="container p-5">
            <div className="container p-5 bg-dark">
                <div className="d-flex justify-content-between p-5">
                    <h1 className="text-white text-start">Contacts</h1>
                    <button type="button" onClick={() => navigate('/contact/add')} className="btn btn-secondary">Add Contact</button>
                </div>
                {store.contactos.map((item) => 
                    <div className="card mb-3 m-auto" style={{width: '1000px'}}>
                        <div className="row g-0">
                            <div className="col-md-4 d-flex justify-content-center ">
                            <img src={trooper} className="img-fluid rounded-start w-50" alt="trooper" />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <div className="d-flex">
                                        <span className="text-dark me-2">
                                            <i className="fa-solid fa-location-dot"></i>
                                        </span>
                                        <p className="card-text">{item.address}</p>
                                    </div>
                                    <div className="d-flex">
                                        <span className="text-dark me-2">
                                            <i className="fa-solid fa-phone"></i>
                                        </span>
                                        <p className="card-text">{item.phone}</p>
                                    </div>
                                    <div className="d-flex">
                                        <span className="text-dark me-2">
                                            <i className="fa-solid fa-envelope"></i>
                                        </span>
                                        <p className="card-text">{item.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center my-5">
                                <button type="submit" onClick={() => handleEdit(item)} className="btn btn-secondary me-2 m-auto">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button type="reset" onClick={() => handleDelete(item.id)} className="btn btn-danger m-auto">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}