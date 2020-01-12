import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import { CreateProfile, GetProfile } from '../../actions/profileActions';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import ResumeFormGroup from '../common/ResumeFormGroup';
import LoadingScreen from '../common/LoadingScreen';
import './css/Details.css';

const UserProfile = props => {
  const [values, setValues] = useState({
    name: '',
    address: '',
    country: '',
    pincode: '',
    city: '',
    state: '',
    create: false,
  });

  const { name, address, country, pincode, city, state, create } = values;

  useEffect(() => {
    const { profile } = props;
    if (profile.profile && profile.isProfile) {
      setValues({ ...values, create: false });
    }

    return () => {
      props.RemoveErrors();
    };
  }, []);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const profile = props.profile.profile;
    setValues({
      ...values,
      name: profile.name,
      address: profile.address,
      country: profile.country,
      city: profile.city,
      state: profile.state,
      pincode: profile.pincode,
      create: true,
    });
  };

  const handleCancel = () => {
    setValues({ ...values, create: false });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/profile/create`,
      data: { name, address, country, pincode, city, state },
    })
      .then(response => {
        props.CreateProfile(response.data);
        props.GetProfile();
        setValues({ ...values, create: false });
      })
      .catch(error => {
        props.SetErrors(error.response.data);
      });
  };

  const { profile } = props.profile;
  const { errors } = props.errors;

  return (
    <Fragment>
      {props.profile.isLoading ? (
        <LoadingScreen />
      ) : (
        <div className='container details'>
          {create && !props.profile.isLoading && (
            <div className='detail-card'>
              <Card style={{ width: 360 }}>
                <form className='res-box'>
                  <ResumeFormGroup
                    name={'name'}
                    type={'text'}
                    label={'Name'}
                    placeholder={'Enter you name'}
                    id={'InputName'}
                    onChange={handleChange}
                    errors={errors.name}
                    value={name}
                  />
                  <ResumeFormGroup
                    name={'address'}
                    type={'text'}
                    label={'Address'}
                    placeholder={'Enter you address'}
                    id={'InputAddress'}
                    onChange={handleChange}
                    errors={errors.address}
                    value={address}
                  />
                  <ResumeFormGroup
                    name={'country'}
                    type={'text'}
                    label={'Country'}
                    placeholder={'Country'}
                    id={'InputCountry'}
                    onChange={handleChange}
                    errors={errors.country}
                    value={country}
                  />

                  <ResumeFormGroup
                    name={'state'}
                    type={'text'}
                    label={'State'}
                    placeholder={'State'}
                    id={'InputState'}
                    onChange={handleChange}
                    errors={errors.state}
                    value={state}
                  />
                  <ResumeFormGroup
                    name={'city'}
                    type={'text'}
                    label={'City'}
                    placeholder={'City'}
                    id={'InputCity'}
                    onChange={handleChange}
                    errors={errors.city}
                    value={city}
                  />
                  <ResumeFormGroup
                    name={'pincode'}
                    type={'text'}
                    label={'Pincode'}
                    placeholder={'Pincode'}
                    id={'InputPincode'}
                    onChange={handleChange}
                    errors={errors.pincode}
                    value={pincode}
                  />
                </form>
              </Card>
            </div>
          )}
          {!create && !props.profile.isLoading && (
            <div className='edu-card'>
              <div className='edu-box'>
                <div className='edu-name'>{profile.name}</div>
                <div className='edu-title'>{profile.address}</div>
                <div className='edu-city'>{profile.city + ', ' + profile.state}</div>
                <div className='edu-country'>{profile.country}</div>
              </div>
            </div>
          )}
          <div className='d-flex justify-content-center user-btn-grp mb-5'>
            <button
              type='button'
              disabled={create}
              onClick={handleClick}
              className='btn btn-info detail-btn'
            >
              Edit
            </button>
            {create && (
              <div className={classnames('save-canc-btn', { slide_back: !create })}>
                <button className='img-btn cross-btn'>
                  <img
                    alt='cancel'
                    src={require('../../images/icons/cross.png')}
                    onClick={handleCancel}
                  />
                </button>
                <button type='button' className='img-btn tick-btn'>
                  <img
                    onClick={handleSubmit}
                    alt='check'
                    src={require('../../images/icons/check.png')}
                  />
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
  errors: state.errors,
});

export default connect(mapStateToProps, {
  CreateProfile,
  GetProfile,
  RemoveErrors,
  SetErrors,
})(withRouter(UserProfile));
