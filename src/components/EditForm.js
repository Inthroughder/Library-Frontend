import React from "react"

class EditForm extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        this.state = {
            fullName: this.props.currentUser.fullName,
            category: this.props.currentUser.category,
            faculty: this.props.currentUser.faculty,
            ticketId: this.props.currentUser.ticketId,
            groupNumber: this.props.currentUser.groupNumber,
            chair: this.props.currentUser.chair
        }
    }

    render(){
        return (
            <form ref={(element) => this.myForm = element}>

                <input placeholder="Full name" onChange={(e) => this.setState({fullName: e.target.value })} 
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.fullName : ""}/>
                <input placeholder="Category" onChange={(e) => this.setState({category: e.target.value })}
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.category : ""}/>
                <input placeholder="Faculty" onChange={(e) => this.setState({faculty: e.target.value })}
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.faculty : ""}/>
                <input placeholder="Ticket number" onChange={(e) => this.setState({ticketId: e.target.value })}
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.ticketId : ""}/>
                <input placeholder="Group number" onChange={(e) => this.setState({groupNumber: e.target.value })}
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.groupNumber : ""}/>
                <input placeholder="Chair" onChange={(e) => this.setState({chair: e.target.value })}
                    defaultValue={this.props.isEditFormOpen ? this.props.currentUser.chair : ""}/>

                <button type="button" onClick={() => {

                    this.myForm.reset()

                    this.userAdd = {
                        fullName: this.state.fullName,
                        category: this.state.category,
                        faculty: this.state.faculty,
                        ticketId: this.state.ticketId,
                        groupNumber: this.state.groupNumber,
                        chair: this.state.chair
                    }
                    if (this.props.isEditFormOpen)
                        this.userAdd.id = this.props.currentUser.id
                    this.props.onAdd(this.userAdd)
                }
                }>{this.props.isEditFormOpen ? 'Edit reader' : 'Add reader'}</button>

            </form>
        )
    }

}

export default EditForm