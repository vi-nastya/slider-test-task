import PropTypes from 'prop-types';
import React from 'react';

const MainLayout = ({ children }) => (
  <>
    <main>{children}</main>
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
