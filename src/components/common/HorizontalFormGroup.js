import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles/styles2.css';


const HorizontalFormGroup = ({
    name,
    placeholder,
    value,
    label,
    onChange,
    type,
    id,
    errors,
    disabled
}) => {
    return (
        <div className="form-group row modal-margin">
        <label htmlFor={id} className="col-lg-3 col-form-label">{label}</label>
        <div className="col-lg-8">
          <input 
             type={type} 
             className={classnames("form-control",{'is-invalid':errors})}  
             id={id} 
             name={name}
             placeholder={placeholder}
             value={value}
             onChange={onChange}
             disabled={disabled}
             />
         {errors && <div className='invalid-feedback'>{errors} </div>}
        </div>
      </div>
    )
}

HorizontalFormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    errors: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

HorizontalFormGroup.defaultProps = {
    type: 'text',
    disabled:false
}


export default HorizontalFormGroup;