import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.{cy.js,cy.jsx,cy.ts,cy.tsx,spec.js}',
  },
});