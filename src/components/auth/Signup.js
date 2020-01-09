import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {SetErrors, RemoveErrors} from '../../actions/errorActions'; 
import TextFieldGroup from '../common/TextFieldGroup';

const Signup = (props) => {

    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password: '',
        buttonText: 'Sign Up',
        message:{}
    });

    const {firstName,lastName,email, password, buttonText,message}= values;

    useEffect(() => {
        console.log('mount');

     return () => {
         props.RemoveErrors();
     }
 }, [])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        props.RemoveErrors();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Signing'});
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/signup`,
            data: {firstName,lastName,email,password}
        })
        .then(response => {
            setValues({...values, message:response.data});
        })
        .catch(error => {
            setValues({...values, buttonText:'Sign Up'});
            props.SetErrors(error.response.data);
        })
    }

    const SignupForm = () => {
        const {errors} = props.errors;
        return (
            <div className='form-box'>
            <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
                    <h1 className='heading-size'>Sign Up</h1>
                </div>
            <div className="d-flex justify-content-center sub">
                    <h6 className='sub-heading-size'>By signing up, you agree to our Terms of use and <Link to='/signup'><span className='signup-link'>Privacy Policy</span></Link></h6>
             </div>
                {errors.error ? 
                <div className="alert alert-danger" role="alert">
                    <CancelIcon /> 
                {errors.error}
                </div> : null}
                { message.message ?  <div className="alert alert-success" role="alert">
                    <CheckCircleIcon /> 
                {message.message}
                </div> :null}
            <div className='row'>
            <TextFieldGroup
                  name={'firstName'}
                  type={'text'}
                  label={'First Name'}
                  placeholder={'Enter you first name'}
                  id={'InputFirstName'}
                  onChange={handleChange}
                  errors={errors.firstName}
                  value={firstName}
                  extraClass={'col'}
                  />
          <TextFieldGroup
                  name={'lastName'}
                  type={'text'}
                  label={'Last Name'}
                  placeholder={'Enter you last name'}
                  id={'InputLastName'}
                  onChange={handleChange}
                  errors={errors.lastName}
                  value={lastName}
                  extraClass={'col'}
                  />
            </div>
            <TextFieldGroup
                  name={'email'}
                  type={'email'}
                  label={'Email address'}
                  placeholder={'Enter you email'}
                  id={'InputEmail'}
                  onChange={handleChange}
                  errors={errors.email}
                  value={email}
                  />

             <TextFieldGroup
                  name={'password'}
                  type={'password'}
                  label={'Password'}
                  placeholder={'Enter you password'}
                  id={'InputPassword'}
                  onChange={handleChange}
                  errors={errors.password}
                  value={password}
                  />
            {
             buttonText === 'Signing' ? 
                    <button className="btn  btn-block btn-top" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button> : 
                    
                    <button type="submit" className="btn  btn-block btn-top">{buttonText}</button>
            } 

                <Link  to='/login'>
                     <span className="footer">Back to Login</span>
                </Link>
                 
            </form>
            </div>
        )

    }

  return (
      <div className="main-box">
         {SignupForm()}
      </div>
  )
}

const mapStateToProps = (state) => ({
    errors : state.errors
})

export default connect(mapStateToProps, {SetErrors, RemoveErrors})(Signup);
