import React from "react"
import Book from "./Book"

class Books extends React.Component {

    render(){
        if(this.props.books.length > 0)
            return (<div>
                {this.props.books.map((element) => (
                    <Book key={element.id} book={element}/>
                ))}
            </div>)
        else
            return (<div className="user">
                    <h3>No books</h3>
                    </div>)
    }

}

export default Books