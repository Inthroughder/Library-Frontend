import React from "react"

class AddUser extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        this.state = {
            first_name: "",
            iq: 0,
            isRetarded: true
        }
    }

    render(){
        return (
            <form ref={(element) => this.myForm = element}>
                <input placeholder="Name" onChange={(e) => this.setState({first_name: e.target.value })}/>
                <input placeholder="IQ" onChange={(e) => this.setState({iq: e.target.value })}/>
                <label htmlFor="isRetarded">Are you smart?</label>
                <input type="checkbox" id="isRetarded" onChange={(e) => this.setState({isRetarded: e.target.checked })}/>
                <textarea placeholder="Sample text"></textarea>
                <button type="button" onClick={() => {

                    this.myForm.reset()

                    this.userAdd = {
                        first_name: this.state.first_name,
                        iq: this.state.iq,
                        isRetarded: this.state.isRetarded
                    }
                    if(this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }
                }>Add user</button>
            </form>
        )
    }

}

export default AddUser