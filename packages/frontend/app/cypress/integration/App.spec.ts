describe("OPEN-SPACE e2e", function() {
  it("Submit a session", function() {
    cy.server();
    cy.route("POST", "/api/sessions").as("postSession");
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

    cy.route("/api/sessions").as("getSessions");
    cy.get("form").submit();

    cy.wait("@postSession");
    cy.wait("@getSessions");
  });

  it("Edit a session", function() {
    cy.server();
    cy.route("/api/sessions").as("getSessions");

    // get card to edit
    cy.get("div")
      .contains("Enric")
      .parent()
      .parent()
      .as("sessionDiv");

    // get Edit button
    cy.get("@sessionDiv")
      .find(".edit-session")
      .as("edit");

    // perform Edit
    cy.get("@edit").click();

    // check correct card is being edited
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

    // edit card
    cy.get("label")
      .contains("Time")
      .next("input")
      .type("16:00");

    cy.get("form").submit();

    cy.wait("@getSessions");

    // check card was edited
    cy.get("@sessionDiv")
      .children(".extra")
      .should("have.html", "Location 3 @ 16:00");
  });

  it("Delete submitted session", function() {
    // get card to edit
    cy.get("div")
      .contains("Enric")
      .parent()
      .parent()
      .as("sessionDiv");

    // get Delete button
    cy.get("@sessionDiv")
      .find(".delete-session")
      .as("buttonDelete");

    // perform Delete
    return cy.get("@buttonDelete").click();
  });
});
