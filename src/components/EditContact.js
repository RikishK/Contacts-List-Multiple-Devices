import React from "react";
import {Form, Button} from "react-bootstrap";
import StartFirebase from "./firebaseConfig";
import {getDatabase, ref, set, onValue, remove} from 'firebase/database';

const db = StartFirebase();

function writeUserData(fullname, ph, email, address) {
    set(ref(db, 'Contacts/' + fullname), {
      Phonenumber: ph,
      Email: email,
      Address: address
    });
}

function deleteUserData(fullname) {
    remove(ref(db, 'Contacts/' + fullname));
}

export class EditContactHere extends React.Component{
    constructor(props){
        super();
        this.state = {
            Fullname: props.fullname,
            Phonenumber: props.phonenumber,
            Email: props.email,
            Address: props.address,
            oldKey: props.fullname,
            handleE: props.handleEdit
        }
        
        console.log("Arrived:")
        console.log(props)
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
        const { Fullname, Phonenumber, Email, Address, oldKey} = this.state;
        console.log("handling: ", Fullname, Phonenumber, Email, Address, oldKey)
        //delete oldkeyuser
        deleteUserData(oldKey);
        console.log("Adding:::");
        console.log(Fullname, Phonenumber, Email, Address);
        writeUserData(Fullname, Phonenumber, Email, Address);
        this.state.handleE();
        
    };

    handleCancel = (event) => {
        this.state.handleE();
    }

    handleDelete = (event) => {
        const { Fullname, Phonenumber, Email, Address, oldKey} = this.state;
        deleteUserData(oldKey);
        this.state.handleE();
    }

    render(){

        const {Fullname, Phonenumber, Email, Address} = this.state;

        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Control value={Fullname} placeholder="Full Name" onChange={this.setFullName}></Form.Control>
                    <Form.Control value={Phonenumber} type="telephone" placeholder="Phone Number" onChange={this.setPhonenumber}></Form.Control>
                    <Form.Control value={Email} type="email" placeholder="Email" onChange={this.setEmail}></Form.Control>
                    <Form.Control value={Address} placeholder="Address" onChange={this.setAddress}></Form.Control>
                    <Button onClick={this.handleCancel.bind(this)}>Cancel</Button>{' '}
                    <Button type="submit">Update Contact</Button>{' '}
                    <Button onClick={this.handleDelete.bind(this)}>Delete Contact</Button>
                </Form>
                
            </div>
        );
    }
}

