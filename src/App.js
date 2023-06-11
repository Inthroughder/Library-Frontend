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
import { Route, Routes } from 'react-router-dom';
import { withRouter} from "./components/WithRouter"
import * as auth from "./utils/auth"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/Login"
import {Fragment} from 'react';
import { BrowserRouter } from "react-router-dom";

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
            isErrorPopupOpen: false,
            isEditFormOpen: false,

            loggedIn: false,
            login: "",
            currentUser: ""
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
        this.closeErrorPopup = this.closeErrorPopup.bind(this)
        this.getTotalBooks = this.getTotalBooks.bind(this)
        this.handleTokenCheck = this.handleTokenCheck.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt){      
          auth.checkToken(jwt)
            .then((res) => {
              if (res){
                this.setState({
                    loggedIn: true
                })      
              }
            })
            .catch((err) => console.log(err)); 
        }
    }

    /*componentDidMount() {
        if (this.state.loggedIn) {
            this.props.history('/main');
        }
    }*/

    handleLogin (data){
        const {password, login} = data;
        return auth.authorize(password, login)
          .then((res) => {
            if(!res || res.statusCode === 400){
              throw new Error("Authorization error");
            } 
            if (res.accessToken) {
              localStorage.setItem('jwt', res.accessToken);
              this.setState({
                loggedIn: true,
                login: login
            })               
            }
          })
          .catch((err) => console.log(err));
    }
    
    handleLogout (){
        localStorage.removeItem('jwt');
        this.setState({
            loggedIn: false
        })  
    }

    render(){
        return (
            <BrowserRouter>
            <Routes>

                <Route exact path='/login' element={<Login handleLogin={this.handleLogin}/>}/>

                <Route path='/' element={
                    <ProtectedRoute loggedIn={this.state.loggedIn}
                              entityType = {this.state.entityType}
                              currentQuery = {this.state.currentQuery}
                              users = {this.state.users}
                              editUser = {this.editUser}
                              deleteUser = {this.deleteUser}
                              onDropdownChange = {this.onDropdownChange}
                              postUser = {this.postUser}
                              postLend = {this.postLend}
                              getUsers = {this.getUsers}
                              getDebtors = {this.getDebtors}
                              getTopBooks = {this.getTopBooks}
                              getLostBooks = {this.getLostBooks}
                              getTotalBooks = {this.getTotalBooks}
                              entityCount = {this.state.entityCount}
                              books = {this.state.books}
                              isEditFormOpen = {this.state.isEditFormOpen}
                              currentUser = {this.state.currentUser}
                              closePopup = {this.closePopup}
                              isPopupOpen = {this.state.isPopupOpen}
                              closeErrorPopup = {this.closeErrorPopup}
                              isErrorPopupOpen = {this.state.isErrorPopupOpen}
                        />}>

                    {/*<Header title="University library information system" entityCount={this.state.entityCount}/>
                        
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
                {this.state.isPopupOpen && <Popup closePopup={this.closePopup}/>} */}                                

                </Route>

            </Routes>
            </BrowserRouter>)
    }

    closePopup(){
        this.setState({
            isPopupOpen: false
        })
    }

    closeErrorPopup(){
        this.setState({
            isErrorPopupOpen: false
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

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.delete(url, config).then((response) => {
            console.log('deleted %d', response.data);
            this.setState({
                isPopupOpen: true,
                users: this.state.users.filter((element) => element.id !== id)
            })
        }).catch(() => {this.setState({isErrorPopupOpen: true})})

    }

    postUser(user){

        let url = `${baseUrl}/reader`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post(url, user, config).then((response) => {
            this.setState({
                users: response.data,
                isPopupOpen: true
            })
            
        }).catch(() => {this.setState({isErrorPopupOpen: true})})

    }

    postLend(lend){

        let url = `${baseUrl}/reader/lend`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.post(url, lend, config).then((response) => {
            console.log(response.data)
            this.setState({
                isPopupOpen: true
            })
        }).catch(() => {this.setState({isErrorPopupOpen: true})})

    }

    getUsers(filter){
        
        const {bookPlace, category, faculty, groupNumber, chair} = filter
        let url = `${baseUrl}/reader?bookPlace=${bookPlace}&category=${category}&faculty=${faculty}&groupNumber=${groupNumber}&chair=${chair}`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(url, config).then((response) => {
            this.setState({users: response.data, entityCount: response.data.length, entityType: 0})
        }).catch(() => {this.setState({isErrorPopupOpen: true})})
    }

    getDebtors(filter){
        const {bookPlace, category, faculty, groupNumber, chair, days} = filter
        let url = `${baseUrl}/reader/debtor?bookPlace=${bookPlace}&category=${category}&faculty=${faculty}&groupNumber=${groupNumber}&chair=${chair}&days=${days}`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(url, config).then((response) => {
            this.setState({users: response.data, entityCount: response.data.length, entityType: 0})
        }).catch(() => {this.setState({isErrorPopupOpen: true})})
    }

    getTopBooks(filter){
        
        const {bookPlace, faculty} = filter
        let url = `${baseUrl}/book?bookPlace=${bookPlace}&faculty=${faculty}`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(url, config).then((response) => {
            this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
        }).catch(() => {this.setState({isErrorPopupOpen: true})})
    }

    getLostBooks(filter){

        const {bookPlace, priceLessThan, year} = filter
        let url = `${baseUrl}/book/lost?bookPlace=${bookPlace}&priceLessThan=${priceLessThan}&year=${year}`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get(url, config).then((response) => {
            this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
        }).catch(() => {this.setState({isErrorPopupOpen: true})})
    }

    getTotalBooks(filter){

        const {bookPlace, bookName} = filter
        let url = `${baseUrl}/book/total?bookPlace=${bookPlace}&bookName=${bookName}`

        const token = localStorage.getItem('jwt');

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if (bookName === ""){

            this.setState({books: [], entityCount: 0, entityType: 1, isPopupOpen:true})

        } else {

            axios.get(url, config).then((response) => {
                this.setState({books: response.data, entityCount: response.data.length, entityType: 1})
            }).catch(() => {this.setState({isErrorPopupOpen: true})})

        }

    }

    onDropdownChange(variant){
        this.setState({currentQuery: variant})
    }

}

export default App;