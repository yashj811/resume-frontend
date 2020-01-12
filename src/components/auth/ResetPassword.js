import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import TextFieldGroup from '../common/TextFieldGroup';

const ResetPassword = props => {
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
    buttonText: 'Reset Password',
    message: {},
  });

  const [Token, setToken] = useState({
    token: '',
  });

  const { password, confirmPassword, buttonText, message } = values;

  const { token } = Token;

  useEffect(() => {
    const token = props.match.params.token;
    if (token) {
      setToken({ token: token });
    }
  }, [props]);

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
    setValues({ ...values, buttonText: 'Resetting' });
    axios({
      method: 'PUT',
      url: `http://localhost:5000/api/v1/reset-password`,
      data: { password, confirmPassword, token },
    })
      .then(response => {
        setValues({ ...values, message: response.data });
      })
      .catch(error => {
        setValues({ ...values, buttonText: 'Reset Password' });
        props.SetErrors(error.response.data);
      });
  };

  const ResetPasswordForm = () => {
    const { errors } = props.errors;
    return (
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h1 className='heading-size'>Reset Password ?</h1>
          </div>
          <div className='d-flex justify-content-center sub'>
            <h6 className='sub-heading-size'>
              Enter your new password to reset your password.
            </h6>
          </div>

          {errors.error ? (
            <div className='alert alert-danger' role='alert'>
              <CancelIcon />
              {errors.error}
            </div>
          ) : null}
          <TextFieldGroup
            name={'password'}
            type={'password'}
            label={'Password'}
            placeholder={'Password'}
            id={'InputPassword1'}
            onChange={handleChange}
            errors={errors.password}
            value={password}
          />
          <TextFieldGroup
            name={'confirmPassword'}
            type={'password'}
            label={'Confirm Password'}
            placeholder={'Confirm password'}
            id={'InputPassword2'}
            onChange={handleChange}
            errors={errors.confirmPassword}
            value={confirmPassword}
          />

          {message.message ? (
            <div className='alert alert-success' role='alert'>
              <CheckCircleIcon />
              {message.message}
            </div>
          ) : buttonText === 'Resetting' ? (
            <button className='btn btn-top' type='button' disabled>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>
              Loading...
            </button>
          ) : (
            <button type='submit' className={`btn btn-top`}>
              {buttonText}
            </button>
          )}
          <Link to='/login'>
            <span className='footer'>Back to Login</span>
          </Link>
        </form>
      </div>
    );
  };

  return <div className='main-box'>{ResetPasswordForm()}</div>;
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { SetErrors, RemoveErrors })(ResetPassword);
