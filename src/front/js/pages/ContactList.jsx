import React, { useEffect, useState } from "react";
import trooper from "../../img/StormTrooper.png";

export const ContactList = () => {
    const [ list, setList ] = useState(true);
    const [ contactos, setContactos ] = useState([]);
    const host = 'https://playground.4geeks.com/contact';
    const slug = 'AndresVillani00';

    const handleEdit = (taskEdit) => {
        setList(list);
    }

    const handleDelete = async (taskDelete) => {
        const uri = `${host}/agendas/${slug}/contacts/${taskDelete.id}`;
        const options = {
            method: 'DELETE'
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getTareas();
    }

    const getContactos = async () => {
        const uri = `${host}/agendas/${slug}`;
        const options = {
            method: 'GET'
        };
        
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        const datos = await response.json();
        setContactos(datos.contacts);
    }

    useEffect(() => {
        getContactos();
    }, [])

    return (
        <div className="container p-5 bg-dark">
            {
                list === true ?
                <div className="container my-5 p-5 bg-secondary">
                    <h1 className="text-start">Contacts</h1>
                    {contactos.map((item) => 
                        <div className="card mb-3" style={{width: '1000px'}}>
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
                                    <span onClick={() => handleEdit(item)} className="text-primary me-2">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <span onClick={() => handleDelete(item)} className="text-danger">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                :
                <div>
                    <form>

                    </form>
                </div>
            }
        </div>
    );
}