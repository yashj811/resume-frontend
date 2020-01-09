import React, {useState, useEffect,Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { Input,Icon } from 'antd';
import './css/Contacts.css';

const Contacts = (props) => {

    const [values, setValues] = useState({
        email:'',
        mobile:'',
        facebook:'',
        insta:'',
        linkedin:'',
        github:'',
        twitter:'',
        medium:'',
        readOnly:true
    });

    const {email,mobile,facebook,insta,linkedin,github,twitter,medium,readOnly} = values;

    useEffect(() => {
      const {profile} = props.profile;
      if(profile && profile.socials){
        setValues({...values, 
          email: profile.socials.email,
          mobile: profile.socials.mobile,
          facebook: profile.socials.facebook,
          insta: profile.socials.insta,
          twitter: profile.socials.twitter,
          medium: profile.socials.medium,
          github: profile.socials.github,
          linkedin: profile.socials.linkedin
          
        })
      }
     
    }, [])
 
    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value});
    }

    const handleEdit = () => {
      setValues({...values, readOnly:false});
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      setValues({...values, readOnly:true});
      axios({
        method: 'POST',
        url: `http://localhost:5000/api/v1/profile/create/socials`,
        data: {email,mobile,facebook,insta,twitter,linkedin,github,medium}
    })
    .then(response => {
            // props.history.push('/');
            console.log(response);
    })
    .catch(error => {
        // props.SetErrors(error.response.data);
        // console.log(error.response.data);
    })
    }

    const {profile} = props.profile;

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className='contact-form'>
                <div className="row">
        <div className="col-6"> 
        <Input
          placeholder="Email"
          onChange={handleChange}
          value={email}
          id={'email'}
          name={'email'}
          prefix={<Icon type="mail" theme="filled" />}
          disabled={readOnly}
        />
        <Input
          placeholder="Mobile"
          value={mobile}
          onChange={handleChange}
          id={'mobile'}
          name={'mobile'}
          disabled={readOnly}
          prefix={<Icon type="mobile" theme="outlined" />}
        />
        <Input
          placeholder="Facbook"
          value={facebook}
          onChange={handleChange}
          id={'facebook'}
          name={'facebook'}
          disabled={readOnly}
          prefix={ <Icon type="facebook" theme="filled" />} 
        />
          <Input
          placeholder="Instagram"
          value={insta}
          onChange={handleChange}
          id={'insta'}
          disabled={readOnly}
          name={'insta'}
          prefix={<Icon type="instagram"  />}
        />
          </div>
        <div className="col-6">
        <Input
          placeholder="Twitter"
          value={twitter}
          onChange={handleChange}
          id={'twitter'}
          name={'twitter'}
          disabled={readOnly}
          prefix={<Icon type="twitter"  />}
        />
        <Input
          placeholder="Linkedin"
          value={linkedin}
          onChange={handleChange}
          id={'linkedin'}
          disabled={readOnly}
          name={'linkedin'}
          prefix={<Icon type="linkedin" theme="filled" />}
        />
        <Input
          placeholder="Medium"
          value={medium}
          disabled={readOnly}
          id={'medium'}
          onChange={handleChange}
          name={'medium'}
          prefix={<Icon type="medium" />}
        />
        <Input
          placeholder="Github"
          value={github}
          disabled={readOnly}
          id={'github'}
          onChange={handleChange}
          name={'github'}
          prefix={<Icon type="github" theme="filled"/>}
        />
        </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="button" onClick={handleEdit}  className="btn btn-info contact-btn">Edit</button>
          <button type="submit" className="btn btn-info contact-btn">Save</button>
        </div>
            </form>
        </Fragment>

    )
}

const mapStateToProps = (state) => ({
  profile : state.profile
})

export default connect(mapStateToProps, {})(withRouter(Contacts));