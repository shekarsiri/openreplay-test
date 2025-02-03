describe("Account - Preferences", () => {
    beforeEach(() => {
        cy.login();
    });

    it("should load the account page", () => {
        cy.visit('/client/account')
        cy.title().should("include", "Account - OpenReplay Preferences");
        cy.contains("Account").should("be.visible");
        cy.contains("Change Password").should("be.visible");
        cy.contains("Organization API Key").should("be.visible");
        cy.contains("Data Collection").should("be.visible");
    });

    it("should update the account details and persist changes after reload", () => {
        cy.visit("/client/account");

        // Ensure the form is visible
        cy.get('form[class*="profileSettings"]').should("be.visible");

        // Define new values
        const newAccountName = "Shekar Automated";
        const newOrganizationName = "OpenReplay";

        // Fill the form fields
        cy.get('input[name="accountName"]').clear().type(newAccountName);
        cy.get('input[name="organizationName"]').clear().type(newOrganizationName);

        // Spy on the actual API call
        cy.intercept("POST", "/api/account").as("updateAccount");

        // Submit the form
        cy.get('form[class*="profileSettings"]').submit();

        // Wait for API call to complete and check response
        cy.wait("@updateAccount").its("response.statusCode").should("eq", 200);


        // Reload the page
        cy.reload();

        cy.wait(2000);

        // Ensure the form is loaded after reload
        cy.get('form[class*="profileSettings"]').should("be.visible");

        // Verify that the updated values persist after reload
        cy.get('input[name="accountName"]').should("have.value", newAccountName);
        cy.get('input[name="organizationName"]').should("have.value", newOrganizationName);
    });
});
