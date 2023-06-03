import React from "react"
import EditForm from "./EditForm"

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

                <h3>{this.user.fullName}</h3>

                <p>{this.user.categoryId}</p>

                {this.state.editForm && <EditForm user={this.user} onAdd={this.props.onEdit}/>}

            </div>
        )
    }

}

export default User