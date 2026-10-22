/// <reference types="cypress" />

import type { ReactNode } from 'react';
import type { MountReturn } from 'cypress/react';

import { customMount } from './wrapper';

declare global {
  namespace Cypress {
    interface Chainable {
      customMount(component: ReactNode): Chainable<MountReturn>;
    }
  }
}

Cypress.Commands.add('customMount', customMount);
