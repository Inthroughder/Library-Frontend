import React from "react"
import { Dropdown } from "react-bootstrap"

class DropdownList extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Dropdown className="dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_toggle">
                    Choose query
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown_menu">
                    <Dropdown.Item className="dropdown_item" href="#/action-1" onClick={e => this.props.onChange(1)}>1</Dropdown.Item>
                    <Dropdown.Item className="dropdown_item" href="#/action-2" onClick={e => this.props.onChange(2)}>2</Dropdown.Item>
                    <Dropdown.Item className="dropdown_item" href="#/action-3" onClick={e => this.props.onChange(3)}>3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }



}

export default DropdownList