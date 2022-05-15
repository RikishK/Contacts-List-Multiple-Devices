import React from "react";
import {Form, Button} from "react-bootstrap";
import StartFirebase from "./firebaseConfig";
import {getDatabase, ref, set, onValue} from 'firebase/database';

const db = StartFirebase();

function writeUserData(fullname, ph, email, address) {
    set(ref(db, 'Contacts/' + fullname), {
      Phonenumber: ph,
      Email: email,
      Address: address
    });
}

export class AddContactHere extends React.Component{
    constructor(props){
        super();
        this.state = {
            Fullname: "",
            Phonenumber: "",
            Email: "",
            Address: "",
            handleA: props.handleAdd
        }
    }

    

    setFullName = (event) => {
        this.setState({
            Fullname: event.target.value,
        })
    };

    setPhonenumber = (event) => {
        this.setState({
            Phonenumber: event.target.value,
        })
    };

    setEmail = (event) => {
        this.setState({
            Email: event.target.value,
        })
    };

    setAddress = (event) => {
        this.setState({
            Address: event.target.value,
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { Fullname, Phonenumber, Email, Address } = this.state;
        if(Fullname != ""){
            writeUserData(Fullname, Phonenumber, Email, Address);
            this.state.handleA();
        }
        
    };

    handleCancel = (event) => {
        this.state.handleA();
    }

    render(){

        const {Fullname, Phonenumber, Email, Address} = this.state;

        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Control value={Fullname} placeholder="Full Name" onChange={this.setFullName}></Form.Control>
                <Form.Control value={Phonenumber} type="telephone" placeholder="Phone Number" onChange={this.setPhonenumber}></Form.Control>
                <Form.Control value={Email} type="email" placeholder="Email" onChange={this.setEmail}></Form.Control>
                <Form.Control value={Address} placeholder="Address" onChange={this.setAddress}></Form.Control>
                <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>{' '}
                <Button type="submit">Add New Contact</Button>
            </Form>
        )
    }
}