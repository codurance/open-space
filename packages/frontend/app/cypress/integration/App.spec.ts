describe('OPEN-SPACE e2e', function() {

  it('Submit a session', function() {
    cy.visit('/')
    cy.get('label').contains('Title:').find('input').first().type('Serverless');
    cy.get('label').contains('Location:').find('input').first().type('Location 3');
    cy.get('label').contains('Presenter:').find('input').first().type('Enric');
    cy.get('label').contains('Time:').find('input').first().type('15:00');
    return cy.get('form').submit();
  })
  
  
  it('Delete submitted session', function() {
    cy.get('div').contains('Enric').parent().as('conferenceDiv');
    cy.get('@conferenceDiv').find('button.delete-session').as('buttonDelete');
    return cy.get('@buttonDelete').click();
  })
})