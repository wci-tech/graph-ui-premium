describe('Storybook', () => {
  it('should render button story correctly', () => {
    // Visit the Storybook URL (make sure it's running)
    cy.visit('http://localhost:6006'); // Default Storybook port

    // Check if the button component exists
    cy.get('button').should('exist');
  });
});
