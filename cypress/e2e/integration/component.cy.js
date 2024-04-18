describe('Notification Component Integration Tests', () => {
  beforeEach(() => {
    // Setting up intercepts if there are any API calls to fetch initial states
    cy.intercept('GET', '/api/preferences', {
      body: { email: false, sms: true, push: false }
    }).as('getPreferences');

    cy.visit('/preferences'); // Adjust the URL to where your component is actually rendered
    cy.wait('@getPreferences'); // Ensures the mock request completes before proceeding
  });

  it('correctly toggles and persists the email preference across components', () => {
    // Initial state check
    cy.contains('Email: false').should('exist');

    // Toggle email preference
    cy.contains('Email: false').click();
    cy.contains('Email: true').should('exist');

    // Mocking the API call that might save this preference
    cy.intercept('POST', '/api/preferences', {
      body: { success: true }
    }).as('savePreferences');

    // Assuming another component also displays this preference, simulate navigating to it
    cy.visit('/anotherComponentUsingSameContext');
    cy.wait('@savePreferences');
    
    // Check if the new state is reflected in another component
    cy.contains('Email: true').should('exist');
  });

  // Similarly test for SMS and Push notifications
  it('toggles SMS notification preference and checks persistence', () => {
    cy.contains('SMS: true').click();
    cy.contains('SMS: false').should('exist');

    // Assuming persistence via backend
    cy.intercept('POST', '/api/preferences', {
      body: { success: true }
    }).as('savePreferences');

    cy.visit('/anotherComponentUsingSameContext');
    cy.wait('@savePreferences');
    
    cy.contains('SMS: false').should('exist');
  });

  it('toggles push notification preference and checks persistence', () => {
    cy.contains('Push: false').click();
    cy.contains('Push: true').should('exist');

    // Mocking the save operation
    cy.intercept('POST', '/api/preferences', {
      body: { success: true }
    }).as('savePreferences');

    cy.visit('/anotherComponentUsingSameContext');
    cy.wait('@savePreferences');
    
    cy.contains('Push: true').should('exist');
  });
});
