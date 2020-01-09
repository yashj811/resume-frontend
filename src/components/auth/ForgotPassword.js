import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import TextFieldGroup from '../common/TextFieldGroup';

const ForgotPassword = props => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Send Link',
    message: {},
  });

  const { email, buttonText, message } = values;

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
    setValues({ ...values, buttonText: 'Sending' });
    axios({
      method: 'PUT',
      url: `http://localhost:5000/api/v1/forgot-password`,
      data: { email },
    })
      .then(response => {
        setValues({ ...values, message: response.data });
      })
      .catch(error => {
        setValues({ ...values, buttonText: 'Send Link' });
        props.SetErrors(error.response.data);
      });
  };

  const ForgotPasswordForm = () => {
    const { errors } = props.errors;
    return (
      <div className='form-box'>
        <form onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center'>
            <h1 className='heading-size'>Forgot Password ?</h1>
          </div>
          <div className='d-flex justify-content-center sub'>
            <h6 className='sub-heading-size'>
              Enter your email address you signed up with. You will receive a link on your
              mail to reset your password.
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
          {message.message ? (
            <div className='alert alert-success' role='alert'>
              <CheckCircleIcon />
              {message.message}
            </div>
          ) : buttonText === 'Sending' ? (
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

  return <div className='main-box'>{ForgotPasswordForm()}</div>;
};

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { SetErrors, RemoveErrors })(ForgotPassword);
