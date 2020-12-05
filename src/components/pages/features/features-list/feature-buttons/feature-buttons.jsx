import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import CapacityIcon from 'images/pages/features/icons/capacity.inline.svg';
import CommunicationIcon from 'images/pages/features/icons/communication.inline.svg';
import ManagementIcon from 'images/pages/features/icons/management.inline.svg';
import ScheduleIcon from 'images/pages/features/icons/schedule.inline.svg';

import FeatureButton from './feature-button/feature-button';
import styles from './feature-buttons.module.scss';

const cx = classNames.bind(styles);

const buttons = [
  {
    title: 'Capacity planning',
    icon: CapacityIcon,
  },
  {
    title: 'Staggered schedules',
    icon: ScheduleIcon,
  },
  {
    title: 'PPE management',
    icon: ManagementIcon,
  },
  {
    title: 'Employee communication',
    icon: CommunicationIcon,
  },
];

const FeatureButtons = ({ activeButtonIndex, onProgressComplete, onFeatureClick }) => {
  return (
    <div className={cx('feature-buttons')}>
      {buttons.map((button, index) => (
        <FeatureButton
          title={button.title}
          icon={button.icon}
          key={`button-${index}`}
          id={index}
          isActive={activeButtonIndex === index}
          onClick={() => onFeatureClick(index)}
          onProgressComplete={() => onProgressComplete(index)}
        />
      ))}
    </div>
  );
};

FeatureButtons.propTypes = {
  activeButtonIndex: PropTypes.number.isRequired,
  onProgressComplete: PropTypes.func.isRequired,
  onFeatureClick: PropTypes.func.isRequired,
};

export default FeatureButtons;
