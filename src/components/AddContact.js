import React from "react";
import {Form, Button} from "react-bootstrap";
import StartFirebase from "./firebaseConfig";
import {getDatabase, ref, set, onValue} from 'firebase/database';
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

export class AddContactHere extends React.Component{
    constructor(props){
        super();
        this.state = {
            Fullname: "",                 //Value of Fullname to add to database
            Phonenumber: "",              //Value of Phonenumber to add to database
            Email: "",                    //Value of Email to add to database
            Address: "",                  //Value of Address to add to database
            handleA: props.handleAdd      //function to switch back to list view page
        }
    }

    
    //updates value of Fullname
    setFullName = (event) => {
        this.setState({
            Fullname: event.target.value,
        })
    };
    //updates value of Phonenumber
    setPhonenumber = (event) => {
        this.setState({
            Phonenumber: event.target.value,
        })
    };
    //updates value of Email
    setEmail = (event) => {
        this.setState({
            Email: event.target.value,
        })
    };
    //updates value of Address
    setAddress = (event) => {
        this.setState({
            Address: event.target.value,
        })
    };
    //handles add contact button, only works if Fullname has value as this is used as key in database
    //adds new contact to database and switches back to list view page
    handleSubmit = (event) => {
        event.preventDefault();
        const { Fullname, Phonenumber, Email, Address } = this.state;
        if(Fullname != ""){
            writeUserData(Fullname, Phonenumber, Email, Address);
            this.state.handleA();
        }
        
    };
    //handles cancel button, switches back to list view page
    handleCancel = (event) => {
        this.state.handleA();
    }
    //render a form to fill out new contact information
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