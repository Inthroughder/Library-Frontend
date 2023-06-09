import React from "react"
import Header from "./components/Header"
import Users from "./components/Users"
import Books from "./components/Books"
import EditForm from "./components/EditForm"
import FindForm from "./components/FindForm"
import BookForm from "./components/BookForm"
import LendForm from "./components/LendForm"
import axios from "axios"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownList from "./components/DropdownList"
import { Popup } from "./components/Popup"

const baseUrl = "http://localhost:8080"

class App extends React.Component { //элемент ("компонент"), который содержит всё, что есть на странице
    
    constructor(props){
        super(props)

        this.state = {
            users: [],
            books: [],
            entityType: 0, //0 is users, 1 is books
            entityCount: 0,
            currentQuery: 1,
            currentUser: {},
            isPopupOpen: false,
            isEditFormOpen: false
        }

        this.postUser = this.postUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.getTopBooks = this.getTopBooks.bind(this)
        this.getLostBooks = this.getLostBooks.bind(this)
        this.getDebtors = this.getDebtors.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.onDropdownChange = this.onDropdownChange.bind(this)
        this.postLend = this.postLend.bind(this)
        this.editUser = this.editUser.bind(this)
        this.closePopup = this.closePopup.bind(this)
        this.getTotalBooks = this.getTotalBooks.bind(this)
    }

    render(){
        return (<div>
            <Header title="University library information system" entityCount={this.state.entityCount}/>
            <main className = "users_main">
                {(this.state.entityType===0) && <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser}/>}
                {(this.state.entityType===1) && <Books books={this.state.books}/>}
            </main>
            <aside>
                <DropdownList onChange={this.onDropdownChange}/>

                {(this.state.currentQuery===1) && <FindForm onFilter={this.getUsers} currentQuery={1}/>}
                {(this.state.currentQuery===2) && <FindForm onFilter={this.getDebtors} currentQuery={2}/>}
                {(this.state.currentQuery===3) && <BookForm onFilter={this.getTopBooks} currentQuery={3}/>}
                {(this.state.currentQuery===4) && <BookForm onFilter={this.getLostBooks} currentQuery={4} />}
                {(this.state.currentQuery===7) && <BookForm onFilter={this.getTotalBooks} currentQuery={7} />}

                {(this.state.currentQuery===14 || this.state.isEditFormOpen) && <EditForm onAdd={this.postUser} currentUser={this.state.currentUser} 
                    isEditFormOpen={this.state.isEditFormOpen}/>}
                {(this.state.currentQuery===15) && <LendForm onAdd={this.postLend}/>}

            </aside>
            {this.state.isPopupOpen && <Popup closePopup={this.closePopup}/>}
        </div>)
    }

    closePopup(){
        this.setState({
            isPopupOpen: false
        })
    }

    editUser(user){

        this.setState({

            currentQuery: this.state.isEditFormOpen ? 1 : -1,
            currentUser: this.state.isEditFormOpen ? {} : user,
            isEditFormOpen: !this.state.isEditFormOpen
        })

    }

    deleteUser(id){

        let url = `${baseUrl}/reader?id=${id}`

        this.setState({
            users: this.state.users.filter((element) => element.id !== id)
        })

        axios.delete(url).then((response) => {
            console.log('deleted %d', response.data);
            this.setState({
                isPopupOpen: true
            })
        })

    }

    postUser(user){

        let url = `${baseUrl}/reader`

        axios.post(url, user).then((response) => {
            this.setState({
                users: response.data,
                isPopupOpen: true
            })
            
        })

    }

    postLend(lend){

        let url = `${baseUrl}/reader/lend`

        axios.post(url, lend).then((response) => {
            console.log(response.data)
            this.setState({
                isPopupOpen: true
            })
        })

    }

    getUsers(filter){
        
        const {bookPlace, category, faculty, groupNumber, chair} = filter
        let url = `${baseUrl}/reader?bookPlace=${bookPlace}&category=${category}&faculty=${faculty}&groupNumber=${groupNumber}&chair=${chair}`

        axios.get(url).then((response) => {
            this.setState({users: response.data, entityCount: response.data.length, entityType: 0})
        })
    }

    getDebtors(filter){
        const {bookPlace, category, faculty, groupNumber, chair, days} = filter
        let url = `${baseUrl}/reader/debtor?bookPlace=${bookPlace}&category=${category}&faculty=${faculty}&groupNumber=${groupNumber}&chair=${chair}&days=${days}`

        axios.get(url).then((response) => {
            this.setState({users: response.data, entityCount: response.data.length, entityType: 0})
        })
    }

    getTopBooks(filter){
        
        const {bookPlace, faculty} = filter
        let url = `${baseUrl}/book?bookPlace=${bookPlace}&faculty=${faculty}`

        axios.get(url).then((response) => {
            this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
        })
    }

    getLostBooks(filter){

        const {bookPlace, priceLessThan, year} = filter
        let url = `${baseUrl}/book/lost?bookPlace=${bookPlace}&priceLessThan=${priceLessThan}&year=${year}`

        axios.get(url).then((response) => {
            this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
        })
    }

    getTotalBooks(filter){

        const {bookPlace, bookName} = filter
        let url = `${baseUrl}/book/total?bookPlace=${bookPlace}&bookName=${bookName}`

        if (bookName === ""){

            this.setState({books: [], entityCount: 0, entityType: 1, isPopupOpen:true})

        } else {

            axios.get(url).then((response) => {
                this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
            })

        }

    }

    onDropdownChange(variant){
        this.setState({currentQuery: variant})
    }

}

export default App