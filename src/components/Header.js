import React from "react"

class Header extends React.Component {
    render(){
        return (
            <>
            <header className="header">
                {this.props.title}
            </header>
            <p className="count">
                {this.props.usersCount > 0 ? `Readers count: ${this.props.usersCount}` : ""}
            </p>
            </>
        )
    }

}

export default Header