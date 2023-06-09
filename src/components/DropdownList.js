import React from "react"
import { Dropdown, Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';  

class DropdownList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            dropped: false
        }
    }

    render(){
        return(
            <Container className='p-4'>

            <Dropdown>  
                <Dropdown.Toggle variant=" primary" id="dropdown-basic">  
                    Choose query  
                </Dropdown.Toggle>  

                <Dropdown.Menu>
                    <Dropdown.Item onClick={e => this.props.onChange(1)}>All readers</Dropdown.Item>
                    <Dropdown.Item onClick={e => this.props.onChange(2)}>All debtors</Dropdown.Item>
                    <Dropdown.Item onClick={e => this.props.onChange(3)}>Top 20 of most popular books</Dropdown.Item>
                    <Dropdown.Item onClick={e => this.props.onChange(4)}>Recent year books</Dropdown.Item>
                    <Dropdown.Item onClick={e => this.props.onChange(7)}>Total books</Dropdown.Item>

                    <Dropdown.Item onClick={e => this.props.onChange(14)}>Add reader</Dropdown.Item>
                    <Dropdown.Item onClick={e => this.props.onChange(15)}>Lend a book</Dropdown.Item>
                </Dropdown.Menu>  
            </Dropdown>

            </Container>

        )
    }



}

export default DropdownList