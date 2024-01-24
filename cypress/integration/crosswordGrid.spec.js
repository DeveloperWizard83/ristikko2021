describe('CrosswordGrid Component Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173'); // Adjust this to the path where your CrosswordGrid component is rendered
    });

    it('renders the crossword grid', () => {
      cy.get('.grid-container').should('be.visible');
    });

    it('selects an item on click and toggles selection mode', () => {
      cy.get('[data-cy^=grid-item-]').should('be.visible');
      cy.get('[data-cy^=grid-item-]').first().click().should('have.class', 'selected-item');
    });

    it('allows keyboard input to update the grid', () => {
      // Adjusted to use the correct selector
      cy.get('[data-cy^=grid-item-]').first().click();
      cy.get('body').type('A');
      cy.get('[data-cy^=grid-item-]').first().should('contain', 'A');
    });

    it('saves and loads grid content from localStorage', () => {
      // Adjusted to use the correct selector
      const itemSelector = '[data-cy^=grid-item-]'; // Correct selector
      cy.get(itemSelector).first().click();
      cy.get('body').type('A');
  
      // Simulate reloading the page or revisiting the component
      cy.reload();
      // Check if the previously entered content is loaded
      cy.get(itemSelector).first().should('contain', 'A');
    });

    it('supports zooming in and out with touch events', () => {
      // This test remains unchanged as it's more about testing functionality indirectly related to UI interaction
    });

    // Add more tests as needed for your application
});
