import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './feature-button.module.scss';

const cx = classNames.bind(styles);
const CIRCLE_RADIUS = 36;

const FeatureButton = ({ onProgressComplete, title, icon: Icon, id, isActive, onClick }) => {
  // Keep JS-driven animation outside of React for better performance
  const spinner = React.useMemo(
    () => ({
      rafHandle: -1,
      hasStopped: false,
      progress: 0,
      lastAnimated: performance.now(),
      render() {
        const circle = document.getElementById(`circle-${id}`);
        if (!circle) {
          return;
        }
        circle.style['stroke-dasharray'] = `${Math.PI * 2 * CIRCLE_RADIUS} ${
          Math.PI * 2 * CIRCLE_RADIUS
        }`;
        circle.style['stroke-dashoffset'] = Math.PI * 2 * CIRCLE_RADIUS * (1 - this.progress / 100);
      },
      start() {
        this.hasStopped = false;
        requestAnimationFrame(this.loop.bind(this));
      },
      stop() {
        this.hasStopped = true;
        this.progress = 100;
        this.render();
        if (this.rafHandle > 0) {
          cancelAnimationFrame(this.rafHandle);
        }
      },
      loop() {
        if (this.hasStopped) {
          return;
        }

        const now = performance.now();

        if (now - this.lastAnimated > 1000 / 60) {
          this.progress = (this.progress + 1) % 100;

          if (this.progress === 0) {
            onProgressComplete();
            this.hasStopped = true;
            return;
          }

          this.render();
          this.lastAnimated = now;
        }

        this.rafHandle = requestAnimationFrame(this.loop.bind(this));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    if (isActive) {
      spinner.start();
    } else {
      spinner.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className={cx('feature-button')} onClick={onClick}>
      <span className={cx('button-title')}>{title}</span>
      <div className={cx('button-icon', { 'button-icon--active': isActive })}>
        <svg
          className={cx('progress-ring')}
          height={2 * CIRCLE_RADIUS + 6}
          width={2 * CIRCLE_RADIUS + 6}
        >
          <circle
            id={`circle-${id}`}
            className={cx('progress-ring--circle')}
            strokeWidth="3"
            strokeLinecap="round"
            fill="transparent"
            r={CIRCLE_RADIUS}
            cx={CIRCLE_RADIUS + 2}
            cy={CIRCLE_RADIUS + 2}
          />
        </svg>
        <Icon />
      </div>
    </div>
  );
};

FeatureButton.propTypes = {
  onProgressComplete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FeatureButton;
