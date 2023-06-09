import React from "react"

class Header extends React.Component {
    render(){
        return (
            <>
            <header className="header">
                {this.props.title}
            </header>
            <p className="count">
                {this.props.entityCount > 0 ? `Records count: ${this.props.entityCount}` : ""}
            </p>
            </>
        )
    }

}

export default Header