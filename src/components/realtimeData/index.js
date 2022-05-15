import StartFirebase from "../firebaseConfig";
import React from "react";
import {ref, onValue} from "firebase/database";
import {Table, Button} from "react-bootstrap";
import { EditContactHere } from "../EditContact";
import { AddContactHere } from "../AddContact";

//grab link to database
const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            isEditPage: false,    //used to switch to edit page
            isAddPage: false,     //used to switch to add page
            isListPage: true,     //used to switch to contact list view page
            tableData: [],        //used to store contacts after retrieval from database
            editFullname: "",     //value of fullname to pass to edit screen, will depend on which contact is edited
            editPhonenumber: "",  //value of phonenumber to pass to edit screen, will depend on which contact is edited
            editEmail: "",        //value of email to pass to edit screen, will depend on which contact is edited
            editAddress: ""       //value of address to pass to edit screen, will depend on which contact is edited
        }
        
    }

    //Access contacts folder from database, loop through each item and add it to tableData
    componentDidMount(){
        const dbRef = ref(db, 'Contacts');

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data": data});
            });
            this.setState({tableData: records});
        });
    };

    
    //change to edit page
    enableEditPage() {
        this.setState({
            isEditPage: true,
            isListPage: false,
        })
    }

    //change to add page
    enableAddPage() {
        this.setState({
            isAddPage: true,
            isListPage: false
        })
    }

    //change to list view page
    enableListPage(){
        this.setState({
            isAddPage:false,
            isEditPage:false,
            isListPage:true
        })
    }

    //returns the edit page
    editPage() {
        
        return <EditContactHere fullname={this.state.editFullname} phonenumber={this.state.editPhonenumber} email={this.state.editEmail} address={this.state.editAddress} handleEdit={this.enableListPage.bind(this)}/>
    }

    //returns the add page
    addPage() {
        return <AddContactHere handleAdd={this.enableListPage.bind(this)}/>
    }

    
    //handles edit buttons
    //updates edit values and switches to editpage passing the values as props
    handleEdit(eFn, ePn, eE, eAd){
        this.setState({
            editFullname: eFn,
            editPhonenumber: ePn,
            editEmail: eE,
            editAddress: eAd
        }, () => this.enableEditPage());
    };
    //returns the list view page (A table, each row is a contact)
    listP() {
        return(
            <div>
                <div style={{overflow: 'scroll'}}>
                    <Table>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
            
                            <tbody>
                                {this.state.tableData.map((row, index)=>{
                                    return(
                                    <tr>
                                        <td>{row.key}</td>
                                        <td>{row.data.Phonenumber}</td>
                                        <td>{row.data.Email}</td>
                                        <td>{row.data.Address}</td>
                                        <td><Button onClick={this.handleEdit.bind(this, row.key, row.data.Phonenumber, row.data.Email, row.data.Address)}>Edit</Button></td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                    </Table>
                </div>
                <Button onClick={this.enableAddPage.bind(this)}>Add New Contact</Button>
            </div>
        );
    }

    //render the pages, the correct page is rendered based on isXPage values
    render(){
        return(
            <div>
                {this.state.isListPage ? this.listP() : null}
                {this.state.isEditPage ? this.editPage() : null}
                {this.state.isAddPage ? this.addPage() : null}
            </div>
        );
        
            
        
    }
}