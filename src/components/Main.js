import React from 'react';
import { withRouter} from "./WithRouter";
import FindForm from './FindForm';
import BookForm from './BookForm';
import EditForm from './EditForm';
import LendForm from './LendForm';
import { Popup } from './Popup';
import { ErrorPopup } from './ErrorPopup';
import Header from './Header';
import Users from './Users';
import Books from './Books';
import DropdownList from './DropdownList';

const Main = (props) => {
  
  return(
    <>

        <Header title="University library information system" entityCount={props.entityCount}/>
        
        <main className = "users_main">
            {(props.entityType===0) && <Users users={props.users} onEdit={props.editUser} onDelete={props.deleteUser}/>}
            {(props.entityType===1) && <Books books={props.books}/>}
        </main>
        <aside>
            <DropdownList onChange={props.onDropdownChange}/>

            {(props.currentQuery===1) && <FindForm onFilter={props.getUsers} currentQuery={1}/>}
            {(props.currentQuery===2) && <FindForm onFilter={props.getDebtors} currentQuery={2}/>}
            {(props.currentQuery===3) && <BookForm onFilter={props.getTopBooks} currentQuery={3}/>}
            {(props.currentQuery===4) && <BookForm onFilter={props.getLostBooks} currentQuery={4} />}
            {(props.currentQuery===7) && <BookForm onFilter={props.getTotalBooks} currentQuery={7} />}

            {(props.currentQuery===14 || props.isEditFormOpen) && <EditForm onAdd={props.postUser} currentUser={props.currentUser} 
                isEditFormOpen={props.isEditFormOpen}/>}
            {(props.currentQuery===15) && <LendForm onAdd={props.postLend}/>}

        </aside>
        {props.isPopupOpen && <Popup closePopup={props.closePopup}/>}
        {props.isErrorPopupOpen && <ErrorPopup closeErrorPopup={props.closeErrorPopup}/>}
    </>
  )
}

export default withRouter(Main);