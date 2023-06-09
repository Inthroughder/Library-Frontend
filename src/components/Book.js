import React from "react"

class Book extends React.Component {
    constructor(props){
        super(props)
    }
    book = this.props.book
    render(){
        return (
            <div className="user">

                <h3>{this.book.name}</h3>

            </div>
        )
    }

}

export default Book