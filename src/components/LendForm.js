import React from "react"

class LendForm extends React.Component {
    lendAdd = {}
    constructor(props){
        super(props)
        this.state = {
            ticketId: "",
            bookName: "",
            bookPlaceName: ""
        }
    }

    render(){
        return (
            <form ref={(element) => this.myForm = element}>

                <input placeholder="Ticket number" onChange={(e) => this.setState({ticketId: e.target.value })}/>
                <input placeholder="Book name" onChange={(e) => this.setState({bookName: e.target.value })}/>
                <input placeholder="Bookplace name" onChange={(e) => this.setState({bookPlaceName: e.target.value })}/>

                <button type="button" onClick={() => {

                    this.myForm.reset()

                    this.lendAdd = {
                        ticketId: this.state.ticketId,
                        bookName: this.state.bookName,
                        bookPlaceName: this.state.bookPlaceName
                    }
                    
                    this.props.onAdd(this.lendAdd)
                }
                }>Lend the book</button>

            </form>
        )
    }

}

export default LendForm