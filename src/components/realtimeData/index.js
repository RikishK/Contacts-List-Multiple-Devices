import StartFirebase from "../firebaseConfig";
import React from "react";
import {ref, onValue} from "firebase/database";
import {Table, Button} from "react-bootstrap";
import { EditContactHere } from "../EditContact";
import { AddContactHere } from "../AddContact";

const db = StartFirebase();

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            isEditPage: false,
            isAddPage: false,
            isListPage: true,
            tableData: [],
            editFullname: "",
            editPhonenumber: "",
            editEmail: "",
            editAddress: ""
        }
        
    }

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

    enableEditPage() {
        this.setState({
            isEditPage: true,
            isListPage: false,
        })
    }

    enableAddPage() {
        console.log("ADDDDIINGG");
        this.setState({
            isAddPage: true,
            isListPage: false
        })
    }

    enableListPage(){
        this.setState({
            isAddPage:false,
            isEditPage:false,
            isListPage:true
        })
    }

    editPage() {
        
        return <EditContactHere fullname={this.state.editFullname} phonenumber={this.state.editPhonenumber} email={this.state.editEmail} address={this.state.editAddress} handleEdit={this.enableListPage.bind(this)}/>
    }

    addPage() {
        return <AddContactHere handleAdd={this.enableListPage.bind(this)}/>
    }

    

    handleEdit(eFn, ePn, eE, eAd){
        let a = eFn;
        let b = ePn;
        let c = eE;
        let d = eAd;
        console.log("Editing");
        console.log("Fullname: " + a);
        console.log("Phone Number:" + b);
        console.log("Email: " + c);
        console.log("Address: " + d);
        this.setState({
            editFullname: a,
            editPhonenumber: b,
            editEmail: c,
            editAddress: d
        }, () => this.enableEditPage());
        
        
    };
    
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