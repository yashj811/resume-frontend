import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Card } from 'antd';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {CreateProfile} from '../../actions/profileActions'; 
import {SetErrors, RemoveErrors} from '../../actions/errorActions'; 
import ResumeFormGroup from '../common/ResumeFormGroup';
import './css/Details.css';

const UserProfile = (props) => {

    const[values,setValues] = useState({
        name:'',
        address:'',
        country:'',
        pincode:'',
        city:'',
        state:'',
        create:false,
        display:true
    })

    const {name,address,country,pincode,city,state,create,display} = values;

    useEffect(() => {
      const {profile} = props;
      if(profile.profile && profile.isProfile){
          setValues({...values, create:false,display:true});
     }

      return () => {
          props.RemoveErrors();
      }
    }, [])

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleClick = () => {
      const profile = props.profile.profile;
      setValues({...values,
        name:profile.name, 
        address: profile.address,
        country: profile.country,
        city: profile.city,
        state: profile.state,
        pincode:profile.pincode,
        create:true,
        display:false})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
          method: 'POST',
          url: `http://localhost:5000/api/v1/profile/create`,
          data: {name,address,country,pincode,city,state}
      })
      .then(response => {
              props.CreateProfile(response.data);
              props.history.push('/');
      })
      .catch(error => {
          props.SetErrors(error.response.data);
      })
    }

    const {profile} = props.profile;

    return (
      <div className='container details'>
  
      {create && 
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
                //   errors={errors.email}
                  value={name}
                  />
                <ResumeFormGroup
                  name={'address'}
                  type={'text'}
                  label={'Address'}
                  placeholder={'Enter you address'}
                  id={'InputAddress'}
                  onChange={handleChange}
                  //   errors={errors.email}
                  value={address}
                  />
               <ResumeFormGroup
                  name={'city'}
                  type={'text'}
                  label={'City'}
                  placeholder={'City'}
                  id={'InputCity'}
                  onChange={handleChange}
                  //   errors={errors.email}
                  value={city}
                  />
                <ResumeFormGroup
                  name={'state'}
                  type={'text'}
                  label={'State'}
                  placeholder={'State'}
                  id={'InputState'}
                  onChange={handleChange}
                  //   errors={errors.email}
                  value={state}
                  />
              <ResumeFormGroup
                  name={'pincode'}
                  type={'text'}
                  label={'Pincode'}
                  placeholder={'Pincode'}
                  id={'InputPincode'}
                  onChange={handleChange}
                  //   errors={errors.email}
                  value={pincode}
                  />
             <ResumeFormGroup
                  name={'country'}
                  type={'text'}
                  label={'Country'}
                  placeholder={'Country'}
                  id={'InputCountry'}
                  onChange={handleChange}
                  //   errors={errors.email}
                  value={country}
                  />
            </form>
          </Card>
          </div>
           }
           {display && !props.profile.isLoading &&
           <div className='detail-card'>
           <Card style={{ width: 360 }}>
             <div>
               <p>{profile.name}</p>
               <p>{profile.address}</p>
               <p>{profile.state}</p>
               <p>{profile.city}</p>
               <p>{profile.country}</p>
               <p>{profile.pincode}</p>
             </div>
             </Card>
             </div>
             }
        <div className='d-flex justify-content-center mb-5'>
      <button type="button" onClick={handleClick} className="btn btn-info detail-btn">Edit</button>
      <button type="button" onClick={handleSubmit} className="btn btn-info detail-btn">Save</button>
      </div>
          </div>
    )
}
const mapStateToProps = (state) => ({
  profile : state.profile
})

export default connect(mapStateToProps, {CreateProfile,RemoveErrors,SetErrors})(withRouter(UserProfile));