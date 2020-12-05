import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './feature-card.module.scss';

const cx = classNames.bind(styles);

const FeatureCard = ({ feature, isShowing }) => {
  const [shouldRender, setRender] = React.useState(isShowing);

  React.useEffect(() => {
    if (isShowing) setRender(true);
  }, [isShowing]);

  const onAnimationEnd = () => {
    if (!isShowing) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className={cx('feature-card')}
        style={{ animation: `${isShowing ? styles.fadeIn : styles.fadeOut} 600ms` }}
        onAnimationEnd={onAnimationEnd}
      >
        <h2 className={cx('title')}>{feature.title}</h2>
        <p className={cx('description')}>{feature.description}</p>
        <div className={cx('imageWrapper')}>
          <img src={feature.image} alt={feature.title} />
        </div>
      </div>
    )
  );
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  isShowing: PropTypes.bool.isRequired,
};

export default FeatureCard;
