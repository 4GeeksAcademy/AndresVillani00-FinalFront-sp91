import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");


  const { actions } = useContext(Context);

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let signup = await actions.signup(email, password , firstName, lastName ,phone , location , adress, paymentMethod);
    console.log(signup);
    if (signup) {
      navigate("/login");
    }else {
      return alert("Error : 409 ,User already exist")
    }
  }

  // function redirectToLogin() {
  //   setTimeout(() => {
  //     window.location.href = '/login';
  //   }, 1000); 
  // }

  const handlePaymentSelection = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="">
    
    <h1 className="mx-auto text-center" style={{ fontSize: '3rem' }}>Welcome to Vanguard Vesture!</h1>
    <form
      className="card w-50 mx-auto mb-5"
      onSubmit={handleSubmit}
    >
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Email address</h5>
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          <h5>Password</h5>
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>First Name</h5>
        </label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Last Name</h5>
        </label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Phone</h5>
        </label>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Location</h5>
        </label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Address</h5>
        </label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
        />
      </div>
      <div className="m-3 ">
        <label htmlFor="exampleInputEmail1" className="form-label">
          <h5>Your Favorite Payment Methond</h5>
        </label>
        <label>
          <input
            className="m-3"
            type="radio"
            name="metodo_pago"
            value="VISA"
            checked={paymentMethod === 'VISA'}
            onChange={handlePaymentSelection}
          />
          VISA
        </label>
        <label>
          <input
            className="m-3"
            type="radio"
            name="metodo_pago"
            value="MASTERCARD"
            checked={paymentMethod === 'MASTERCARD'}
            onChange={handlePaymentSelection}
          />
          MASTERCARD
        </label>
      </div>
      <button  style={{ cursor: 'pointer' }} type="submit" className="btn btn-success  mx-auto m-3">
        Create account
      </button>
    </form>

    </div>
  );
};

export default Signup;