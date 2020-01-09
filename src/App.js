import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import Layout from './Layout';

function App(props) {
  return (
    <div >
      <Layout />
      <div className="description ">
      <h1>  Hello {props.auth.user ? props.auth.user.firstName : null} , Welcome To My official Website </h1>
        <p> cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non    
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>   
    <button className="btn btn-outline-secondary btn-lg">See more</button>   
    </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
