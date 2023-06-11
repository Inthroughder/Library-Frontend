import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withRouter} from "./WithRouter";
import AuthForm from './AuthForm';

const Login = (props) => {
  const [data, setData] = useState({
    login: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(data)
      .then(() => props.history('/'));
  }

  return(
    <div className="login">
      <AuthForm onSubmit={handleSubmit} onChange={handleChange} login={data.login} password={data.password} title='Login' buttonText='Enter'/>
    </div>
  )
}

export default withRouter(Login);