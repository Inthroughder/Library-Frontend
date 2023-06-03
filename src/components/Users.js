import React from "react"
import User from "./User"

class Users extends React.Component {

    render(){
        if(this.props.users.length > 0)
            return (<div>
                {this.props.users.map((element) => (
                    <User onEdit={this.props.onEdit} onDelete={this.props.onDelete} key={element.id} user={element}/>
                ))}
            </div>)
        else
        return (<div className="user">
            <h3>No users</h3>
        </div>)
    }

}

export default Users