import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import { setCurrentUser } from '../../actions/authActions';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import { Authenticate, setAuthHeader } from '../../utils/Helpers';
import TextFieldGroup from '../common/TextFieldGroup';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

const Login = props => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Log In',
  });

  const { email, password, buttonText } = values;

  useEffect(() => {
    console.log('mount');

    return () => {
      props.RemoveErrors();
    };
  }, []);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    props.RemoveErrors();
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Logging' });
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/login`,
      data: { email, password },
    })
      .then(response => {
        Authenticate(response, () => {
          setValues({ ...values, buttonText: 'Done' });
          setAuthHeader(response.data.token);
          props.setCurrentUser(response.data);
          props.history.push('/');
        });
      })
      .catch(error => {
        setValues({
          ...values,
          buttonText: 'Log In',
          errors: error.response.data,
          isLoading: 100,
        });
        props.SetErrors(error.response.data);
      });
  };

  const LoginForm = () => {
    const { errors } = props.errors;
    return (
      <div className='form-box'>
        <form noValidate onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h1 className='heading-size'>Login</h1>
          </div>
          <div className='d-flex justify-content-center sub'>
            <h6 className='sub-heading-size'>
              Login to your account or{' '}
              <Link to='/signup'>
                <span className='signup-link'>Sign Up</span>
              </Link>
            </h6>
          </div>

          {errors.error ? (
            <div className='alert alert-danger' role='alert'>
              <CancelIcon />
              {errors.error}
            </div>
          ) : null}

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
          {buttonText === 'Logging' ? (
            <button className='btn btn-block btn-top' type='button' disabled>
              <Spin spinning={buttonText === 'Logging'} style={{ color: 'white' }} />
              Loading...
            </button>
          ) : (
            <button type='submit' className='btn  btn-block btn-top'>
              {buttonText}
            </button>
          )}
          <Link to='/forgot-password'>
            <span className='footer'>Forgot password ?</span>
          </Link>
        </form>
      </div>
    );
  };

  return <div className='main-box'>{LoginForm()}</div>;
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { setCurrentUser, SetErrors, RemoveErrors })(
  Login,
);
