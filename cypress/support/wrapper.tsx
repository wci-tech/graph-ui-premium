import { mount } from '@cypress/react';

import { TestWrapper } from '../utils/TestWrapper';

export function customMount(children: React.ReactNode) {
  return mount(<TestWrapper>{children}</TestWrapper>);
}
