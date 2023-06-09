import React from "react"
import EditForm from "./EditForm"
import {IoCloseCircleSharp, IoHammerSharp} from 'react-icons/io5'

class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editForm: false
        }
    }
    user = this.props.user
    render(){
        return (
            <div className="user">

                <IoCloseCircleSharp className="delete-icon" onClick={() => this.props.onDelete(this.user.id)}/>

                <IoHammerSharp className="edit-icon" onClick={() => this.props.onEdit(this.user)}/>

                <h3>{this.user.fullName}</h3>

                <p>{this.user.categoryId}</p>

                {this.state.editForm && <EditForm user={this.user} onAdd={this.props.onEdit}/>}

            </div>
        )
    }

}

export default User