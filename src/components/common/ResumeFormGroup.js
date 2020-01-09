import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles/styles1.css';

const ResumeFormGroup = ({
    name,
    placeholder,
    value,
    label,
    onChange,
    type,
    id,
    errors
}) => {
    return (
        <div className='res-form'>
        <input 
           onChange={onChange}
           value={value} 
           type={type}
           name={name}
           className={classnames("res-input", {'is-invalid':errors})} 
           id={id}
           required
         />
         <label className='res-label' htmlFor={id}>
             <span className='content-name'>{label}</span>
         </label>
         {errors && <div className='invalid-feedback'>{errors} </div>}
    </div>

    )
}

ResumeFormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

ResumeFormGroup.defaultProps = {
    type: 'text'
}


export default ResumeFormGroup;