import React from "react";
import {Form, Button} from "react-bootstrap";
import StartFirebase from "./firebaseConfig";
import {getDatabase, ref, set, onValue, remove} from 'firebase/database';
//get link to database
const db = StartFirebase();
//write record to database
function writeUserData(fullname, ph, email, address) {
    set(ref(db, 'Contacts/' + fullname), {
      Phonenumber: ph,
      Email: email,
      Address: address
    });
}
//delete record from database
function deleteUserData(fullname) {
    remove(ref(db, 'Contacts/' + fullname));
}

export class EditContactHere extends React.Component{
    constructor(props){
        super();
        this.state = {
            Fullname: props.fullname,           //Value of Fullname to add to database
            Phonenumber: props.phonenumber,     //Value of Phonenumber to add to database
            Email: props.email,                 //Value of Email to add to database
            Address: props.address,             //Value of Address to add to database
            oldKey: props.fullname,             //stores the original Fullname so we can delete the old user 
            handleE: props.handleEdit           //function to switch back to list view page
        }
    }
    //update value of Fullname
    setFullName = (event) => {
        this.setState({
            Fullname: event.target.value,
        })
    };
    //update value of Phonenumber
    setPhonenumber = (event) => {
        this.setState({
            Phonenumber: event.target.value,
        })
    };
    //update value of Email
    setEmail = (event) => {
        this.setState({
            Email: event.target.value,
        })
    };
    //update value of Address
    setAddress = (event) => {
        this.setState({
            Address: event.target.value,
        })
    };
    //handle Update contact button
    //deletes the original record and creates new record with new data, switches back to list view page
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
    //handles cancel button, switches back to list view page
    handleCancel = (event) => {
        this.state.handleE();
    }
    //handles delete button, deletes the record from the database, switches back to list view page
    handleDelete = (event) => {
        const { Fullname, Phonenumber, Email, Address, oldKey} = this.state;
        deleteUserData(oldKey);
        this.state.handleE();
    }
    //renders form to edit contact information
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

