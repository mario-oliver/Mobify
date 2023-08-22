import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="all-jobs">All Jobs</Link>
        <Link to="add-job">Add Job</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
`;

export default SharedLayout;
