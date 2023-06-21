import React, { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import styled from 'styled-components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

const Register = () => {
  const [loginValues, setLoginValues] = useState(initialState);

  //global state and useNavigate

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    // setLoginValues(e.target.value);
  };

  const toggleMember = () => {
    setLoginValues({ ...loginValues, isMember: !loginValues.isMember });
  };

  useEffect(() => {}, []);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo></Logo>
        <h3>{loginValues.isMember ? 'Login' : 'Register'}</h3>

        {loginValues.showAlert && <Alert></Alert>}

        {/* name field */}
        {loginValues.isMember || (
          <FormRow
            type={'text'}
            name={'name'}
            handleChange={handleChange}
            value={loginValues.name}
            labelText={'Name'}
          />
        )}
        {/* email field */}
        <FormRow
          type={'email'}
          name={'email'}
          handleChange={handleChange}
          value={loginValues.email}
          labelText={'Email'}
        />
        {/* password field */}
        <FormRow
          type={'password'}
          name={'password'}
          handleChange={handleChange}
          value={loginValues.password}
          labelText={'Password'}
        />

        <button type="submit" className="btn btn-block">
          Submit
        </button>

        <p>
          {loginValues.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {loginValues.isMember ? 'Register' : 'Login'}
          </button>
        </p>
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

  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    /* cursor: pointer; */
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
