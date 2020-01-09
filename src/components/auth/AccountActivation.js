import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const AccountActivation = props => {
  const [values, setValues] = useState({
    buttonText: 'Activate',
    errors: {},
    message: {},
  });

  const [Token, setToken] = useState({
    token: '',
  });

  const { buttonText, errors, message } = values;
  const { token } = Token;

  useEffect(() => {
    const token = props.match.params.token;

    if (token) {
      setToken({ token: token });
    }
  }, [props]);

  const handleSubmit = () => {
    setValues({ ...values, buttonText: 'Activating' });
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/account-activation`,
      data: { token },
    })
      .then(response => {
        setValues({ ...values, buttonText: 'Done', message: response.data });
        console.log(response.data);
      })
      .catch(error => {
        setValues({
          ...values,
          buttonText: 'Activate',
          errors: error.response.data,
        });
        setTimeout(function() {
          setValues({ ...values, errors: {} });
        }, 3000);
        console.log(error.response.data);
      });
  };

  return (
    <Layout>
      <div>
        <h1 className='heading'>Click to Activate your account ! </h1>
        {errors.error ? (
          <div className='alert alert-danger' role='alert'>
            <CancelIcon />
            {errors.error}
          </div>
        ) : null}
        {message.message ? (
          <div className='alert alert-success' role='alert'>
            <CheckCircleIcon />
            {message.message}
          </div>
        ) : buttonText === 'Activating' ? (
          <button className='btn btn-primary' type='button' disabled>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            ></span>
            Loading...
          </button>
        ) : (
          <button onClick={handleSubmit} className={`btn btn-primary`}>
            {buttonText}
          </button>
        )}
      </div>
    </Layout>
  );
};

export default AccountActivation;
