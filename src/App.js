import React from "react"
import Header from "./components/Header"
import Users from "./components/Users"
import EditForm from "./components/EditForm"
import FindForm from "./components/FindForm"
import axios from "axios"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownList from "./components/DropdownList"

const baseUrl = "http://localhost:8080"

class App extends React.Component { //элемент ("компонент"), который содержит всё, что есть на странице
    
    constructor(props){
        super(props)

        this.state = {
            users: [],
            currentQuery: 1
        }

        this.postUser = this.postUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.onDropdownChange = this.onDropdownChange.bind(this)
    }

    render(){
        return (<div>
            <Header title="University library information system" usersCount={this.state.users.length}/>
            <main>
                <Users users={this.state.users} onEdit={this.postUser} onDelete={this.deleteUser}/>
            </main>
            <aside>
                <DropdownList onChange={this.onDropdownChange}/>
                {(this.state.currentQuery===1) && <EditForm onAdd={this.postUser}/>}
                <FindForm onFilter={this.getUsers}/>
            </aside>
        </div>)
    }


    deleteUser(id){
        this.setState({
            users: this.state.users.filter((element) => element.id !== id)
        })
    }

    postUser(user){

        let url = `${baseUrl}/reader`

        axios.post(url, user).then((response) => {
            this.setState({users: response.data})
        })

    }

    getUsers(filter){
        const {bookPlace, category, faculty, groupNumber, chair} = filter
        let url = `${baseUrl}/reader?bookPlace=${bookPlace}&category=${category}&faculty=${faculty}&groupNumber=${groupNumber}&chair=${chair}`

        axios.get(url).then((response) => {
            this.setState({users: response.data})
        })
    }

    onDropdownChange(variant){
        this.setState({currentQuery: variant})
    }

}

export default App