import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Link = ({ to, children, ...props }) => {
  if (to.startsWith('/')) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <GatsbyLink to={to} {...props}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a href={to} {...props}>
      {children}
    </a>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
