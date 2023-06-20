import React, { useState, useEffect } from 'react';
import { Logo } from '../components';
import styled from 'styled-components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  //global state and useNavigate

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChange = (e) => {
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo></Logo>
        <h3>Login</h3>

        {/* name field */}
        <div className="form-row">
          <label className="form-label">name</label>
          <input
            className="form-input"
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
          ></input>
        </div>
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }

  .btn {
    margin-top: 1rem;
  }

  /* .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  } */
`;

export default Register;
