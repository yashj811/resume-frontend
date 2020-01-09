import React, {useState, Fragment} from 'react';
import { Input,Icon} from 'antd';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './css/Contacts.css';

const Skills = () => {

  const [fields, setFields] = useState([{ value: null }]);

  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    setFields(values);
  }

  const handleAdd = () => {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
    console.log(fields.length)
  }

  const handleRemove = (e) => {
    const values = [...fields];
    values.splice(e.target.id, 1);
    setFields(values);
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(fields);
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit} className='contact-form'>
            <button type="button" className='btn btn-info' onClick={handleAdd}>Add Skill </button>
            <span className="badge ml-3 badge-success badge-warning">{`${fields.length}/12`}</span>
        <div className="row">
        {/* <div className="col-6">  */}
            {fields.map((field, idx) => {
              return (
                <div key={`${field}-${idx}`} className="col-6">
                  <Input
                    prefix={<Icon type="bulb"  />}
                    type="text"
                    placeholder="Enter text"
                    value={field.value || ""}
                    onChange={e => handleChange(idx, e)}
                  />
                  <IconButton id={idx} onClick={handleRemove} color="secondary" >
                  <DeleteIcon />
                </IconButton>
                </div>
              );
            })}
          </div>
        {/* <div className="col-6">
        <Input
          placeholder="Twitter"
          // value={twitter}
          onChange={handleChange}
          id={'twitter'}
          name={'twitter'}
          prefix={<Icon type="bulb"  />}
        />
        </div> */}
        {/* </div> */}
        <div className='d-flex justify-content-center'>
          <button type="button"  className="btn btn-info contact-btn">Edit</button>
          <button type="submit" className="btn btn-info contact-btn">Save</button>
        </div>
            </form>
        </Fragment>

    )
}


export default Skills;