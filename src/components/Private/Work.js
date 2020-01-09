import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Modal } from 'antd';
import {CreateWork} from '../../actions/profileActions'; 
import HorizontalFormGroup from '../common/HorizontalFormGroup';


const Work = (props) => {

    const[values,setValues] = useState({
        name:'',
        position:'',
        country:'',
        city:'',
        state:'',
        from:'',
        to:'',
        country:'',
        visible:false,
        check:false
    })

    const {name,position,city,state,from,to,visible,check,country} = values;
    const handleChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value});
  }

  const handleCancel = () => {
    setValues({...values, visible:false})
  }

  const openModal = () => {
    setValues({...values, visible:true})
  }

  const handleCheck = () => {
    setValues({...values, check:!check})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setValues({...values, visible:false});
      axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/profile/create/experience`,
        data: { name,
          position,
          city,
          state,
          from,
          to,country}
    })
    .then(response => {
            props.history.push('/');
    })
    .catch(error => {
        // props.SetErrors(error.response.data);
        // console.log(error.response.data);
    })
  }
  

  const { profile} = props.profile;
    return (
      <Fragment>
      <button type="button" onClick={openModal} className="btn btn-info ">Add Work</button>
      <Modal
            title="Vertically centered modal dialog"
            centered
            visible={visible}
            footer={[
              <button key="back" className="btn btn-info" onClick={handleCancel} >
                Return
              </button>,
              <button key="save" className="btn btn-info" onClick={handleSubmit} >
                Save
              </button>
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
                //   errors={errors.email}
                  value={name}
                  />
            <HorizontalFormGroup
                  name={'position'}
                  type={'text'}
                  label={'Position'}
                  placeholder={'Enter your position'}
                  id={'InputPosition'}
                  onChange={handleChange}
                //   errors={errors.email}
                  value={position}
                  />
                <HorizontalFormGroup
                  name={'from'}
                  type={'date'}
                  label={'From'}
                  placeholder={'From'}
                  id={'InputFrom'}
                  onChange={handleChange}
                //   errors={errors.email}
                  value={from}
                  />
                    <HorizontalFormGroup
                  name={'to'}
                  type={'date'}
                  label={'To'}
                  placeholder={'To'}
                  id={'InputTo'}
                  onChange={handleChange}
                //   errors={errors.email}
                  value={to}
                  disabled={check}
                  />
               
               <div className="form-check check-btn">
                <input className="form-check-input" onClick={handleCheck} type="checkbox" value={check} id="Check1" />
                <label className="form-check-label" htmlFor="Check1">
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
                  //   errors={errors.email}
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
                  //   errors={errors.email}
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
                  //   errors={errors.email}
                  extraClass={'col-md-4'}
                  value={country}
                  />
            </form>
            </Modal>

            {profile &&  
             <div className="row">
                 {profile.experience.map((data, index) => {
                   return (
                     <div key={`${index}`} className="col-6">
                          <p>{data.name}</p>
                      <p>{data.course}</p>
                    <p>{`${data.from} - ${data.to}`}</p>
                      <p>{data.city}</p>
                    <p>{data.state}</p>
                     </div>
                   );
                 })}
               </div>}
           </Fragment>
    )
}

const mapStateToProps = (state) => ({
    profile : state.profile
})

export default connect(mapStateToProps, {CreateWork})(Work);