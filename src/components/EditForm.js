import React from "react"

class EditForm extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        this.state = {
            fullName: "",
            category: "",
            department: "",
            ticketId: "",
            groupNumber: "",
            chair: ""
        }
    }

    //<input type="checkbox" id="isRetarded" onChange={(e) => this.setState({isRetarded: e.target.checked })}/>

    render(){
        return (
            <form ref={(element) => this.myForm = element}>

                <input placeholder="Full name" onChange={(e) => this.setState({fullName: e.target.value })}/>

                <input placeholder="Category" onChange={(e) => this.setState({category: e.target.value })}/>

                <input placeholder="Department" onChange={(e) => this.setState({department: e.target.value })}/>

                <input placeholder="Ticket number" onChange={(e) => this.setState({ticketId: e.target.value })}/>

                <input placeholder="Group number" onChange={(e) => this.setState({groupNumber: e.target.value })}/>

                <input placeholder="Chair" onChange={(e) => this.setState({chair: e.target.value })}/>

                <button type="button" onClick={() => {

                    this.myForm.reset()

                    this.userAdd = {
                        fullName: this.state.fullName,
                        category: this.state.category,
                        department: this.state.department,
                        ticketId: this.state.ticketId,
                        groupNumber: this.state.groupNumber,
                        chair: this.state.chair
                    }
                    if(this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }
                }>Add reader</button>

            </form>
        )
    }

}

export default EditForm