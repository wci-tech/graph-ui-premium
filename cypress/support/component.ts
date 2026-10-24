import type { MountOptions, MountReturn } from '@cypress/react';
import { mount } from '@cypress/react';

import 'cypress-axe';
import './commands';

// Augment the Cypress namespace for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount a React component using @cypress/react18.
       * @param component - The React component to mount
       * @param options - Additional options for the mount function
       * @returns Chainable<MountReturn>
       */
      mount(component: React.ReactNode, options?: MountOptions): Chainable<MountReturn>;
    }
  }
}

// Add the custom mount command
Cypress.Commands.add('mount', mount);

// Example usage:
// cy.mount(<MyComponent />);
