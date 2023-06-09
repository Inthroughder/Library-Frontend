import React from "react"

class BookForm extends React.Component {
    bookFilter = {}
    constructor(props){
        super(props)
        this.state = {
            bookPlace: "",
            faculty: "",
            priceLessThan: "",
            year: "",
            bookName: ""
        }
    }

    render(){
        return (
            <form ref={(element) => this.filterForm = element}>
                <input placeholder="Bookplace" onChange={(e) => this.setState({bookPlace: e.target.value })}/>
                {((this.props.currentQuery===3) || (this.props.currentQuery===4)) && <input placeholder="Faculty" onChange={(e) => this.setState({faculty: e.target.value })}/>}
                {(this.props.currentQuery===4) && <input placeholder="Price less than" onChange={(e) => this.setState({priceLessThan: e.target.value })}/>}
                {(this.props.currentQuery===4) && <input placeholder="Year supplemented" onChange={(e) => this.setState({year: e.target.value })}/>}
                {(this.props.currentQuery===7) && <input placeholder="Book name" onChange={(e) => this.setState({bookName: e.target.value })}/>}

                <button type="button" onClick={() => {

                    this.filterForm.reset()

                    this.bookFilter = {
                        bookPlace: this.state.bookPlace,
                        faculty: this.state.faculty,
                        priceLessThan: this.state.priceLessThan,
                        year: this.state.year,
                        bookName: this.state.bookName
                    }
                    
                    this.props.onFilter(this.bookFilter)
                }
                }>Find</button>
            </form>
        )
    }

}

export default BookForm