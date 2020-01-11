import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card } from 'antd';
import { Modal } from 'antd';
import { CreateEducation, GetProfile } from '../../actions/profileActions';
import { SetErrors, RemoveErrors } from '../../actions/errorActions';
import HorizontalFormGroup from '../common/HorizontalFormGroup';
import './css/ModalForm.css';

const Education = props => {
  const [values, setValues] = useState({
    name: '',
    course: '',
    city: '',
    state: '',
    from: '',
    to: '',
    country: '',
    visible: false,
  });

  const { name, course, city, state, from, to, visible, country } = values;

  useEffect(() => {
    console.log('j');
    return () => {
      props.RemoveErrors();
    };
  }, []);

  useEffect(() => {
    console.log('count changed', props.profile.profile);
  }, [props.profile.profile]);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setValues({ ...values, visible: false });
  };

  const openModal = () => {
    setValues({ ...values, visible: true });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `http://localhost:5000/api/v1/profile/create/education`,
      data: { name, course, city, state, from, to, country },
    })
      .then(response => {
        // props.history.push('/');
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
      <button type='button' onClick={openModal} className='btn btn-info '>
        Add Education
      </button>
      <Modal
        title='Vertically centered modal dialog'
        centered
        visible={visible}
        footer={[
          <button key='back' className='btn btn-info' onClick={handleCancel}>
            Return
          </button>,
          <button key='save' className='btn btn-info' onClick={handleSubmit}>
            Save
          </button>,
        ]}
      >
        <form className='modal-form'>
          <HorizontalFormGroup
            name={'name'}
            type={'text'}
            label={'Name'}
            placeholder={'Enter Institution name'}
            id={'InputName'}
            onChange={handleChange}
            errors={errors.name}
            value={name}
          />
          <HorizontalFormGroup
            name={'course'}
            type={'course'}
            label={'Course'}
            placeholder={'Enter your course'}
            id={'InputCourse'}
            onChange={handleChange}
            errors={errors.course}
            value={course}
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
          />

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
          {profile.education.map((data, index) => {
            return (
              <div key={`${index}`} className='col-6 edu-card'>
                <Card style={{ width: 360 }}>
                  <p>{data.name}</p>
                  <p>{data.course}</p>
                  <p>{`${data.from} - ${data.to}`}</p>
                  <p>{data.city}</p>
                  <p>{data.state}</p>
                </Card>
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

export default connect(mapStateToProps, {
  CreateEducation,
  SetErrors,
  RemoveErrors,
  GetProfile,
})(Education);
