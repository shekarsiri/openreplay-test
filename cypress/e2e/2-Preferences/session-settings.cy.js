describe("Sessions Listings - Preferences", () => {
    beforeEach(() => {
        cy.login();
        cy.visit("/client/sessions-listing");
    });

    it("should load the sessions listings page", () => {
        cy.title().should("include", "Sessions Listings - OpenReplay Preferences");
        cy.contains("Listing Visibility").should("be.visible");
        cy.contains("Default Playing Option").should("be.visible");
        cy.contains("Default Timezone").should("be.visible");
        cy.contains("Mouse Trail").should("be.visible");
        cy.contains("Player Debug Logs").should("be.visible");
    });

    it("should update - Listing Visibility", () => {
        cy.contains("Listing Visibility")
            .parent() // Get the direct parent element
            .within(() => {

                cy.get('[class*="-indicatorContainer"]').first().click();
                cy.get('[class*="-menu"]').contains("Less than").click();
                cy.get('input[name="count"]').clear().type('10');

                cy.get('[class*="-indicatorContainer"]').eq(1).click();
                cy.get('[class*="-menu"]').contains("Mins").click();

                cy.contains("Update").click();
            });
        cy.get(".Toastify__toast").should("contain", "Listing visibility settings saved successfully");
    });

    it("should update - Default Timezone", () => {
        cy.contains("Default Playing Option")
            .parent() // Get the direct parent element
            .within(() => {
                cy.get(".ant-switch").click();
            });
        cy.get(".Toastify__toast").should("contain", "Default playing option saved successfully");
    });


    it("should update - Player Debug Logs", () => {
        cy.contains("Player Debug Logs")
            .parent() // Get the direct parent element
            .within(() => {
                // Click the dropdown
                cy.get(".ant-switch").click();
            });
    });

});
