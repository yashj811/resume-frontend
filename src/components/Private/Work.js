import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { GetProfile } from '../../actions/profileActions';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import { Modal } from 'antd';
import HorizontalFormGroup from '../common/HorizontalFormGroup';

const Work = props => {
  const [values, setValues] = useState({
    name: '',
    position: '',
    country: '',
    city: '',
    state: '',
    from: '',
    to: '',
    visible: false,
    check: false,
  });

  const { name, position, city, state, from, to, visible, check, country } = values;
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setValues({ ...values, visible: false });
  };

  const openModal = () => {
    setValues({ ...values, visible: true });
  };

  const handleCheck = () => {
    setValues({ ...values, check: !check });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/profile/create/experience`,
      data: { name, title: position, city, state, from, to, country },
    })
      .then(response => {
        props.GetProfile();
        setValues({ ...values, visible: false });
      })
      .catch(error => {
        props.SetErrors(error.response.data);
      });
  };

  const { profile } = props.profile;
  const { errors } = props.errors;
  return (
    <Fragment>
      <button type='button' onClick={openModal} className='btn btn-clr '>
        Add Work
      </button>
      <Modal
        title='Vertically centered modal dialog'
        centered
        visible={visible}
        footer={[
          <button key='back' className='btn btn-clr' onClick={handleCancel}>
            Return
          </button>,
          <button key='save' className='btn btn-clr' onClick={handleSubmit}>
            Save
          </button>,
        ]}
      >
        <form onSubmit={handleSubmit} className=''>
          <HorizontalFormGroup
            name={'name'}
            type={'text'}
            label={'Name'}
            placeholder={'Enter Company name'}
            id={'InputName'}
            onChange={handleChange}
            errors={errors.name}
            value={name}
          />
          <HorizontalFormGroup
            name={'position'}
            type={'text'}
            label={'Position'}
            placeholder={'Enter your position'}
            id={'InputPosition'}
            onChange={handleChange}
            errors={errors.title}
            value={position}
          />
          <HorizontalFormGroup
            name={'from'}
            type={'date'}
            label={'From'}
            placeholder={'From'}
            id={'InputFrom'}
            onChange={handleChange}
            errors={errors.from}
            value={from}
          />
          <HorizontalFormGroup
            name={'to'}
            type={'date'}
            label={'To'}
            placeholder={'To'}
            id={'InputTo'}
            onChange={handleChange}
            errors={errors.to}
            value={to}
            disabled={check}
          />

          <div className='form-check check-btn'>
            <input
              className='form-check-input'
              onClick={handleCheck}
              type='checkbox'
              value={check}
              id='Check1'
            />
            <label className='form-check-label' htmlFor='Check1'>
              Currently Working
            </label>
          </div>

          <HorizontalFormGroup
            name={'city'}
            type={'text'}
            label={'City'}
            placeholder={'City'}
            id={'InputCity'}
            onChange={handleChange}
            errors={errors.city}
            extraClass={'col-md-4'}
            value={city}
          />
          <HorizontalFormGroup
            name={'state'}
            type={'text'}
            label={'State'}
            placeholder={'State'}
            id={'InputState'}
            onChange={handleChange}
            errors={errors.state}
            extraClass={'col-md-4'}
            value={state}
          />

          <HorizontalFormGroup
            name={'country'}
            type={'text'}
            label={'Country'}
            placeholder={'Country'}
            id={'InputCountry'}
            onChange={handleChange}
            errors={errors.country}
            extraClass={'col-md-4'}
            value={country}
          />
        </form>
      </Modal>

      {profile && (
        <div className='row edu-card-row'>
          {profile.experience.map((data, index) => {
            return (
              <div key={`${index}`} className='col-6 edu-card'>
                <div className='edu-box'>
                  <div className='edu-name'>{data.name}</div>
                  <div className='edu-title'>{data.title}</div>
                  <div className='edu-date'>{`${moment(data.from).format(
                    'MMMM YYYY',
                  )} - ${moment(data.to).format('MMMM YYYY')}`}</div>
                  <div className='edu-city'>{data.city + ', ' + data.state}</div>
                  <div className='edu-country'>{data.country}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { GetProfile, SetErrors, RemoveErrors })(Work);
