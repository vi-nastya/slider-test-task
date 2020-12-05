import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './feature-card.module.scss';

const cx = classNames.bind(styles);

const FeatureCard = ({ feature, isShowing, dotsBgPosition }) => {
  const [isRendering, setIsRendering] = React.useState(isShowing);

  React.useEffect(() => {
    if (isShowing) {
      setIsRendering(true);
    }
  }, [isShowing]);

  const onAnimationEnd = () => {
    if (!isShowing) {
      setIsRendering(false);
    }
  };

  return (
    isRendering && (
      <div
        className={cx('feature-card')}
        style={{ animation: `${isShowing ? styles.fadeIn : styles.fadeOut} 600ms` }}
        onAnimationEnd={onAnimationEnd}
      >
        <h2 className={cx('title')}>{feature.title}</h2>
        <p className={cx('description')}>{feature.description}</p>
        <div
          className={cx('image-wrapper', {
            'image-wrapper--dots-bottom': dotsBgPosition === 'bottom',
            'image-wrapper--dots-top': dotsBgPosition === 'top',
          })}
        >
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
  dotsBgPosition: PropTypes.oneOf(['bottom', 'top']).isRequired,
};

export default FeatureCard;
