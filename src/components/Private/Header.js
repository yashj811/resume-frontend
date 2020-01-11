import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { GetProfile } from '../../actions/profileActions';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import { Input } from 'antd';
import LoadingScreen from '../common/LoadingScreen';
import classnames from 'classnames';
const { TextArea } = Input;

const Header = props => {
  const [values, setValues] = useState({
    summary: '',
    title: '',
    errors: '',
    create: false,
  });

  const { title, summary, errors, create } = values;

  useEffect(() => {
    const { profile } = props.profile;
    if (profile && profile.header) {
      setValues({
        ...values,
        title: profile.header.title,
        summary: profile.header.summary,
        create: false,
      });
    }

    return () => {
      props.RemoveErrors();
    };
  }, [props.profile.profile.header]);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCancel = e => {
    setValues({ ...values, create: false });
  };

  const handleClick = () => {
    const profile = props.profile.profile;
    setValues({
      ...values,
      title: profile.header.title,
      summary: profile.header.summary,
      create: true,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/profile/create/header`,
      data: { summary, title },
    })
      .then(response => {
        props.GetProfile();
        setValues({ ...values, create: false });
      })
      .catch(error => {
        props.SetErrors(error.response.data);
      });
  };

  const { header } = props.profile.profile;

  return (
    <Fragment>
      {props.profile.isLoading ? (
        <LoadingScreen />
      ) : (
        <div className='s'>
          {create && (
            <form>
              <div className='form-group row modal-margin'>
                <label htmlFor='Title' className='col-lg-3 col-form-label'>
                  Title
                </label>
                <div className='col-lg-8'>
                  <input
                    type='text'
                    className={classnames('form-control', { 'is-invalid': errors })}
                    id='Title'
                    name='title'
                    placeholder='Title'
                    value={title}
                    onChange={handleChange}
                  />
                  {errors && <div className='invalid-feedback'>{errors} </div>}
                </div>
              </div>
              <div className='form-group row modal-margin'>
                <label htmlFor='Title' className='col-lg-3 col-form-label'>
                  Summary
                </label>
                <div className='col-lg-8'>
                  <TextArea
                    className={classnames('form-control text-area', {
                      'is-invalid': errors,
                    })}
                    id='Summary'
                    name='summary'
                    placeholder='Summary'
                    value={summary}
                    onChange={handleChange}
                    autoSize
                  />
                  {errors && <div className='invalid-feedback'>{errors} </div>}
                </div>
              </div>
            </form>
          )}

          {!create && !props.profile.isLoading && (
            <div className='header-card'>
              <div>
                <p>{header.title}</p>
                <p>{header.summary}</p>
              </div>
            </div>
          )}
          <div className='d-flex'>
            <button
              type='button'
              onClick={handleClick}
              className='btn btn-info contact-btn'
              disabled={create}
            >
              Edit
            </button>
            {create && (
              <div className='save-canc-btn'>
                <button className='img-btn cross-btn'>
                  <img
                    src={require('../../images/icons/cross.png')}
                    onClick={handleCancel}
                  />
                </button>
                <button type='button' onClick={handleSubmit} className='img-btn tick-btn'>
                  <img src={require('../../images/icons/check.png')} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { RemoveErrors, SetErrors, GetProfile })(
  withRouter(Header),
);
