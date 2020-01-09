import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { Logout } from './utils/Helpers';
import {removeCurrentUser} from './actions/authActions';
import {ClearProfile} from './actions/profileActions';

const Layout = (props) => {

    const LogoutUser = () => {
      Logout(() => props.history.push('/'));
      props.removeCurrentUser();
      props.ClearProfile();
    }


  const AuthLinks = () => {
      if(!props.auth.isAuthenticated){
        return (
            <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
            </Fragment>
        )

      }

      else{
        return (
            <Fragment>
                    <li className="nav-item">
                        <span className="nav-link logout-btn" onClick={LogoutUser} >Logout</span>
                    </li>
            </Fragment>
        )
      }
}

    const nav = () => {
        return (
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav  ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Templates</Link>
                        </li>
               
                        {props.auth.isAuthenticated ? 
                            <li className="nav-item">
                                <Link className="nav-link" to='/profile/create'>{props.auth.user.firstName}</Link>
                            </li>
                        : null}

                        {AuthLinks()}
                </ul>
            </div>
        </nav>
        )
    }
    return (
        <Fragment>
        {nav()}
            {props.children}
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps, {removeCurrentUser, ClearProfile})(withRouter(Layout)); 