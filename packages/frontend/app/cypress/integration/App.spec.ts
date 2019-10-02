describe("OPEN-SPACE e2e", function() {
  it("Submit a session", function() {
    cy.visit("/");
    cy.get("label")
      .contains("Title")
      .next("input")
      .first()
      .type("Serverless");
    cy.get("label")
      .contains("Location")
      .next("input")
      .first()
      .type("Location 3");
    cy.get("label")
      .contains("Presenter")
      .next("input")
      .first()
      .type("Enric");
    cy.get("label")
      .contains("Time")
      .next("input")
      .first()
      .type("15:00");
    return cy.get("form").submit();
  });
  // FIXME
  // remove this test for now since it's not stable enough
  // if not wait for a response after submitting session
  /*
  it('Delete submitted session', function () {
    cy.get('div').contains('Enric').parent().as('conferenceDiv');
    cy.get('@conferenceDiv').find('button.delete-session').as('buttonDelete');
    return cy.get('@buttonDelete').click();
  })
*/
});
