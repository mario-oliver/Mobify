import React from 'react';

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        className="form-input"
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
      ></input>
    </div>
  );
};

export default FormRow;
