import React from 'react';
import { withRouter} from "./WithRouter"

const AuthForm = (props) => {
  return(
    <form onSubmit={props.onSubmit} className="auth-form">
      <p className="auth-form__title">{props.title}</p>

      <input type="text" id="login" name="login" value={props.login} onChange={props.onChange} className="auth-form__field" placeholder="Login" />
      <input type="text" id="password" name="password" value={props.password} onChange={props.onChange} className="auth-form__field" placeholder="Password" />
      
      <button type="submit" className="auth-form__button darkling-button">{props.buttonText}</button>
      {props.children}
    </form>
  )
}

export default withRouter(AuthForm);