describe("OPEN-SPACE e2e", function() {
  it("Should redirect to a login page", () => {
    cy.server();
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("Submit a session", function() {
    window.localStorage.setItem("userId", "123456789");
    window.localStorage.setItem("userEmail", "test@codurance.com");
    window.localStorage.setItem("userName", "Test User");

    cy.server();
    cy.route("POST", "/api/sessions").as("postSession");

    cy.visit("/");
    cy.get(".add-session-button").click();
    cy.get("label")
      .contains("Title")
      .next("input")
      .first()
      .type("Serverless");
    cy.get(".selectLocation").click();
    cy.get("label")
      .contains("Title")
      .click();
    cy.get("input.presenter").type("test user");
    cy.get(".typeDropdown").click();
    cy.get("label")
      .contains("Title")
      .click();
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
      .contains("David")
      .closest(".session")
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
      .should("have.value", "Session 1");
    cy.get("label")
      .contains("Presenter")
      .next("input")
      .should("have.value", "David");
    cy.get(".typeDropdown").click();
    cy.get("label")
      .contains("Title")
      .click();
    cy.get("label")
      .contains("Time")
      .next("input")
      .should("have.value", "11:00");

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
      .should("have.html", "Location 1 @ 16:00");
  });

  it("Delete submitted session", function() {
    // get card to edit
    cy.get("div")
      .contains("David")
      .closest(".session")
      .as("sessionDiv");

    // get Delete button
    cy.get("@sessionDiv")
      .find(".delete-session")
      .as("buttonDelete");

    // perform Delete
    return cy.get("@buttonDelete").click();
  });
});
