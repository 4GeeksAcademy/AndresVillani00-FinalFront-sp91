import React, { useEffect, useState } from "react";
import trooper from "../../img/StormTrooper.png";

export const ContactList = () => {
    const [ list, setList ] = useState(true);
    const [ edit, setEdit ] = useState(false);
    const [ contactos, setContactos ] = useState([]);
    const [ contactoParaEditar, setContactoParaEditar ] = useState([]);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState('');
    const host = 'https://playground.4geeks.com/contact';
    const slug = 'AndresVillani00';

    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        const contactoCreado = {
            name: name,
            phone: phone,
            email: email,
            address: address
          };
        const uri = `${host}/agendas/${slug}/contacts`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoCreado)
        };
    
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getContactos();
        setList(!list);
    }

    const handleAdd = () => {
        setList(!list);
        setEdit(false);
        setContactoParaEditar('');
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const contactoEditado = {
            name: name,
            phone: phone,
            email: email,
            address: address
          };
        const uri = `${host}/agendas/${slug}/contacts/${contactoParaEditar.id}`;
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoEditado)
        };
    
        const response = await fetch(uri, options);
        if(!response.ok){
            console.log('Error: ', response.status, response.statusText);
            return
        }

        getContactos();
        setList(!list);
    }

    const handleEdit = (taskEdit) => {
        setList(!list);
        setEdit(!edit);
        setContactoParaEditar(taskEdit);
        setName(taskEdit.name);
        setPhone(taskEdit.phone);
        setEmail(taskEdit.email);
        setAddress(taskEdit.address);
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

        getContactos();
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
        <div className="container p-5" style={{background: '#404040'}}>
            {
                list === true ?
                <div className="container p-5 bg-dark">
                    <div className="d-flex justify-content-between p-5">
                        <h1 className="text-white text-start">Contacts</h1>
                        <button type="button" onClick={() => handleAdd()} className="btn btn-secondary">Add Contact</button>
                    </div>
                    {contactos.map((item) => 
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
                                    <button type="submit" onClick={() => handleEdit(item)} className="btn btn-secondary me-2">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button type="submit" onClick={() => handleDelete(item)} className="btn btn-danger">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                :
                edit === true ?
                <div className="container p-5 bg-dark">
                    <h1 className="text-white text-start">Edit Contact</h1>
                    <form onSubmit={handleSubmitEdit}>
                        <div className="mb-3">
                            <label htmlFor="inputName1" className="form-label text-secondary d-flex">Full Name<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="inputName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label text-secondary d-flex">Email Address<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-label text-secondary d-flex">Phone<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setPhone(event.target.value)} value={phone} type="text" className="form-control" id="inputPhone" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label text-secondary d-flex">Address<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" className="form-control" id="inputAddress" />
                        </div>
                        <div className="mb-3 text-end">
                            <button type="submit" className="btn btn-warning me-2">Submit</button>
                            <button type="reset" onClick={() => setList(true)} className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
                :
                <div className="container p-5 bg-dark">
                    <h1 className="text-white text-start">Add Contact</h1>
                    <form onSubmit={handleSubmitAdd}>
                        <div className="mb-3">
                            <label htmlFor="inputName1" className="form-label text-secondary d-flex">Full Name<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="inputName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label text-secondary d-flex">Email Address<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-label text-secondary d-flex">Phone<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setPhone(event.target.value)} value={phone} type="text" className="form-control" id="inputPhone" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label text-secondary d-flex">Address<p className="text-warning mx-2">*</p></label>
                            <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" className="form-control" id="inputAddress" />
                        </div>
                        <div className="mb-3 text-end">
                            <button type="submit" className="btn btn-warning me-2">Submit</button>
                            <button type="reset" onClick={() => setList(true)} className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}