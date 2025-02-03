describe("Login", () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it("should load the homepage", () => {
        cy.visit("/login");
        cy.title().should("include", "Login - OpenReplay");
        cy.contains("Login to your account").should("be.visible");
        cy.contains("Email Address").should("be.visible");
        cy.contains("Reset password").should("be.visible");
        cy.contains("Login with SSO").should("have.class", "pointer-events-none");
    });

    it("should show an error notification on invalid login", () => {
        cy.intercept("POST", "/api/login").as("loginRequest");

        cy.get('input[name="email"]').type("test@test.com");
        cy.get('input[name="password"]').type("password");

        cy.get("form").submit();
        cy.wait("@loginRequest");
        cy.get(".Toastify__toast").should("contain", "You've entered invalid Email or Password.");
    });

    it("should login successfully", () => {
        cy.intercept("POST", "/api/login").as("loginRequest");

        cy.get("input[name='email']").type(Cypress.env("email"));
        cy.get("input[name='password']").type(Cypress.env("password"));

        cy.get("form").submit();

        // Wait for the API request
        cy.wait("@loginRequest");
        cy.url().should("include", "/sessions");
    });
});



