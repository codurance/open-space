describe("OPEN-SPACE e2e", function() {
  it("Submit a session", function() {
    cy.server();
    cy.route("/api/sessions").as("postSession");
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

    cy.get("form").submit();

    cy.wait("@postSession");
  });

  it("Edit a session", function() {
    cy.get("div.description")
      .contains("Enric")
      .closest(".session")
      .as("sessionDiv");
    cy.get("@sessionDiv")
      .next(".edit-session")
      .as("edit");
    cy.get("@edit").click();

    // assert after clicking edit button, form shows present values
    cy.get("label")
      .contains("Title")
      .next("input")
      .should("have.value", "Serverless");
    cy.get("label")
      .contains("Location")
      .next("input")
      .should("have.value", "Location 3");
    cy.get("label")
      .contains("Presenter")
      .next("input")
      .should("have.value", "Enric");
    cy.get("label")
      .contains("Time")
      .next("input")
      .should("have.value", "15:00");

    // return cy.get('form').submit();
  });

  it("Delete submitted session", function() {
    cy.get("div")
      .contains("Enric")
      .parent()
      .as("conferenceDiv");
    cy.get("@conferenceDiv")
      .find("button.delete-session")
      .as("buttonDelete");
    return cy.get("@buttonDelete").click();
  });
});
