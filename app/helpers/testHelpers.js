import { shallow } from 'enzyme';
import React from 'react';

export const renderComponentWrapper = (component) => {
  const Component = () => component;
  return shallow(<Component />);
};
