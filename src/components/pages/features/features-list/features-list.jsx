import classNames from 'classnames/bind';
import React from 'react';

import capacityImage from 'images/pages/features/capacity.png';
import communicationImage from 'images/pages/features/communication.png';
import managementImage from 'images/pages/features/management.png';
import scheduleImage from 'images/pages/features/schedule.png';

import FeatureButtons from './feature-buttons';
import FeatureCard from './feature-card';
import styles from './features-list.module.scss';

const cx = classNames.bind(styles);

const features = [
  {
    title: 'Capacity planning',
    description:
      'Set capacity limits and turn on alerts to limit access when the building reaches capacity. Ensure social distancing and avoid overcrowding.',
    image: capacityImage,
  },
  {
    title: 'Staggered schedules',
    description:
      'Create multiple user groups and assign staggered schedules to users. Deny access outside of a set schedule. Change and update schedules easily that employees can check from the app.',
    image: scheduleImage,
  },
  {
    title: 'PPE management',
    description:
      'Keep track of all your critical PPE inventory. Prioritize and track PPE allocation to highest at-risk employees.',
    image: managementImage,
  },
  {
    title: 'Employee communication',
    description:
      'Send out timely announcements for COVID-19 health-related news and guidelines, directly in the app. Ensure employees update critical contacts in case of emergency.',
    image: communicationImage,
  },
];

const FeaturesList = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onFeatureClick = (index) => setActiveIndex(index);
  const onProgressComplete = (index) => setActiveIndex((index + 1) % 4);

  return (
    <div className={cx('section')}>
      <div className={cx('wrapper')}>
        <FeatureButtons
          activeButtonIndex={activeIndex}
          onFeatureClick={onFeatureClick}
          onProgressComplete={onProgressComplete}
        />
        <div className={cx('cards-container')}>
          {features.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}`}
              feature={feature}
              isShowing={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesList;
