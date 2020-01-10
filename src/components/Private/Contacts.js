import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import classnames from 'classnames';
import { Input } from 'antd';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import './css/Contacts.css';

const Contacts = props => {
  const [values, setValues] = useState({
    email: '',
    mobile: '',
    facebook: '',
    insta: '',
    linkedin: '',
    github: '',
    twitter: '',
    medium: '',
    readOnly: true,
  });

  const {
    email,
    mobile,
    facebook,
    insta,
    linkedin,
    github,
    twitter,
    medium,
    readOnly,
  } = values;

  useEffect(() => {
    const { profile } = props.profile;
    if (profile && profile.socials) {
      setValues({
        ...values,
        email: profile.socials.email,
        mobile: profile.socials.mobile,
        facebook: profile.socials.facebook,
        insta: profile.socials.insta,
        twitter: profile.socials.twitter,
        medium: profile.socials.medium,
        github: profile.socials.github,
        linkedin: profile.socials.linkedin,
      });
    }

    return () => {
      props.RemoveErrors();
    };
  }, []);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setValues({ ...values, readOnly: false });
  };

  const handleCancel = () => {
    setValues({ ...values, readOnly: true });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, readOnly: true });
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/profile/create/socials`,
      data: { email, mobile, facebook, insta, twitter, linkedin, github, medium },
    })
      .then(response => {
        props.history.push('/');
      })
      .catch(error => {
        props.SetErrors(error.response.data);
        setValues({ ...values, readOnly: true });
      });
  };

  const { profile } = props.profile;
  const { errors } = props.errors;

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className='contact-form'>
        <div className='row'>
          <div className='col-6'>
            <Input
              placeholder='Email'
              onChange={handleChange}
              value={email}
              id={'email'}
              name={'email'}
              prefix={<img src={require('../../images/icons/email.png')} />}
              disabled={readOnly}
            />
            <Input
              placeholder='Mobile'
              value={mobile}
              onChange={handleChange}
              id={'mobile'}
              name={'mobile'}
              disabled={readOnly}
              prefix={<img src={require('../../images/icons/mobile.png')} />}
            />
            <Input
              placeholder='Facbook'
              value={facebook}
              onChange={handleChange}
              id={'facebook'}
              name={'facebook'}
              disabled={readOnly}
              prefix={<img src={require('../../images/icons/facebook.png')} />}
            />

            <Input
              placeholder='Instagram'
              value={insta}
              onChange={handleChange}
              id={'insta'}
              disabled={readOnly}
              name={'insta'}
              prefix={<img src={require('../../images/icons/instagram.png')} />}
            />
          </div>
          <div className='col-6'>
            <Input
              placeholder='Twitter'
              value={twitter}
              onChange={handleChange}
              id={'twitter'}
              name={'twitter'}
              disabled={readOnly}
              prefix={<img src={require('../../images/icons/twitter.png')} />}
            />
            <Input
              placeholder='Linkedin'
              value={linkedin}
              onChange={handleChange}
              id={'linkedin'}
              disabled={readOnly}
              name={'linkedin'}
              prefix={<img src={require('../../images/icons/linkedin.png')} />}
            />
            <Input
              placeholder='Medium'
              value={medium}
              disabled={readOnly}
              id={'medium'}
              onChange={handleChange}
              name={'medium'}
              prefix={<img src={require('../../images/icons/medium.png')} />}
            />
            <Input
              placeholder='Github'
              value={github}
              disabled={readOnly}
              id={'github'}
              onChange={handleChange}
              name={'github'}
              prefix={<img src={require('../../images/icons/github.png')} />}
            />
          </div>
        </div>
        <div className='d-flex'>
          <button
            type='button'
            onClick={handleEdit}
            className='btn btn-info contact-btn'
            disabled={!readOnly}
          >
            Edit
          </button>
          {!readOnly && (
            <div className='save-canc-btn'>
              <button className='img-btn cross-btn'>
                <img
                  src={require('../../images/icons/cross.png')}
                  onClick={handleCancel}
                />
              </button>
              <button type='submit' className='img-btn tick-btn'>
                <img src={require('../../images/icons/check.png')} />
              </button>
            </div>
          )}
        </div>
      </form>
      {/* {errors.error && <div className=''>{errors.error} </div>} */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { SetErrors, RemoveErrors })(
  withRouter(Contacts),
);
