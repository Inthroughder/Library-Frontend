import React from "react"

class FindForm extends React.Component {
    userFilter = {}
    constructor(props){
        super(props)
        this.state = {
            bookPlace: "",
            category: "",
            faculty: "",
            groupNumber: "",
            chair: ""
        }
    }

    render(){
        return (
            <form ref={(element) => this.filterForm = element}>
                <input placeholder="Bookplace" onChange={(e) => this.setState({bookPlace: e.target.value })}/>
                <input placeholder="Category" onChange={(e) => this.setState({category: e.target.value })}/>
                <input placeholder="Faculty" onChange={(e) => this.setState({faculty: e.target.value })}/>
                <input placeholder="Group Number" onChange={(e) => this.setState({groupNumber: e.target.value })}/>
                <input placeholder="Chair" onChange={(e) => this.setState({chair: e.target.value })}/>
                <button type="button" onClick={() => {

                    this.filterForm.reset()

                    this.userFilter = {
                        bookPlace: this.state.bookPlace,
                        category: this.state.category,
                        faculty: this.state.faculty,
                        groupNumber: this.state.groupNumber,
                        chair: this.state.chair
                    }
                    
                    this.props.onFilter(this.userFilter)
                }
                }>Find</button>
            </form>
        )
    }

}

export default FindForm