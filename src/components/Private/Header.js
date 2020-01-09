import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {SetErrors, RemoveErrors} from '../../actions/errorActions'; 
import { Input } from 'antd';
import classnames from 'classnames';
const { TextArea } = Input;


const Header = (props) => {

    const[values,setValues] = useState({
        summary:'',
        title:'',
        errors:'',
        create:false,
        display:true
    })

    const {title,summary,errors,display,create} = values;

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
        title: profile.header.title,
        summary:profile.header.summary,
        create:true,
        display:false})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
          method: 'POST',
          url: `http://localhost:5000/api/v1/profile/create/header`,
          data: {summary,title}
      })
      .then(response => {
              props.history.push('/');
      })
      .catch(error => {
          props.SetErrors(error.response.data);
      })
    }

    const {header} = props.profile.profile;

    return (
           <div className='s'>
              {create && 
            <form onSubmit={handleSubmit}>
           <div className="form-group row modal-margin">
            <label htmlFor='Title' className="col-lg-3 col-form-label">Title</label>
              <div className="col-lg-8">
                <input 
                  type='text' 
                  className={classnames("form-control",{'is-invalid':errors})}  
                  id='Title' 
                  name='title'
                  placeholder='Title'
                  value={title}
                  onChange={handleChange}
                  />
              {errors && <div className='invalid-feedback'>{errors} </div>}
              </div>
            </div>
            <div className="form-group row modal-margin">
              <label htmlFor='Title' className="col-lg-3 col-form-label">Summary</label>
              <div className="col-lg-8">
                  <TextArea    
                  className={classnames("form-control",{'is-invalid':errors})}  
                  id='Summary' 
                  name='summary'
                  placeholder='Summary'
                  value={summary}
                  onChange={handleChange} autoSize />
              {errors && <div className='invalid-feedback'>{errors} </div>}
              </div>
            </div>
            </form>}

            {display && !props.profile.isLoading &&
           <div className='detail-card'>
             <div>
               <p>{header.title}</p>
               <p>{header.summary}</p>
             </div>
             </div>
             }
            <div className='d-flex justify-content-center'>
          <button type="button" onClick={handleClick} className="btn btn-info contact-btn">Edit</button>
          <button type="button" onClick={handleSubmit} className="btn btn-info contact-btn">Save</button>
        </div>
            </div>
    )
}
const mapStateToProps = (state) => ({
  profile : state.profile
})

export default connect(mapStateToProps, {RemoveErrors,SetErrors})(withRouter(Header));