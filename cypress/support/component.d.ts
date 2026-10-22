/// <reference types="cypress" />
import { MountOptions, MountReturn } from 'cypress/react';

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
