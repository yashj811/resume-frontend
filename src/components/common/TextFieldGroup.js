import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles/styles.css';


const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    onChange,
    type,
    id,
    errors,
    extraClass
}) => {
    return (
        <div className={`input-form ${extraClass}`}>
        <input 
           onChange={onChange}
           value={value} 
           type={type}
           placeholder={placeholder}
           name={name}
           className={classnames("input", {'is-invalid':errors})} 
           id={id}
         />
         <label className={`label`} htmlFor={id}>{label}</label>
         {errors && <div className='invalid-feedback'>{errors} </div>}
    </div>

    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    errors: PropTypes.string,
    extraClass: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
    type: 'text',
    extraClass: ''
}


export default TextFieldGroup;