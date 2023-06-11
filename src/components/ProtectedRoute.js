import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Main from './Main';

const ProtectedRoute = (props) => {
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return props.loggedIn ? <Main entityType = {props.entityType}
                                currentQuery = {props.currentQuery}
                                users = {props.users}
                                editUser = {props.editUser}
                                deleteUser = {props.deleteUser}
                                onDropdownChange = {props.onDropdownChange}
                                postUser = {props.postUser}
                                postLend = {props.postLend}
                                getUsers = {props.getUsers}
                                getDebtors = {props.getDebtors}
                                getTopBooks = {props.getTopBooks}
                                getLostBooks = {props.getLostBooks}
                                getTotalBooks = {props.getTotalBooks}
                                entityCount = {props.entityCount}
                                books = {props.books}
                                isEditFormOpen = {props.isEditFormOpen}
                                isPopupOpen = {props.isPopupOpen}
                                isErrorPopupOpen = {props.isErrorPopupOpen}
                                currentUser = {props.currentUser}
                                closePopup = {props.closePopup}
                                closeErrorPopup = {props.closeErrorPopup}
                            /> 
                        : <Navigate to="/login" />;
}

export default ProtectedRoute; 