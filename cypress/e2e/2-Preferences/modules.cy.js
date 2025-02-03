describe("Modules - Preferences", () => {
    beforeEach(() => {
        cy.login();
        cy.visit("/client/modules");
    });

    it("should load the modules page and all modules", () => {
        // cy.title().should("include", "Modules - OpenReplay Preferences");
        cy.contains("Modules").should("be.visible");
        cy.contains("Co-Browse").should("be.visible");
        cy.contains("Recordings").should("be.visible");
        cy.contains("Notes").should("be.visible");
        cy.contains("Alerts").should("be.visible");
        cy.contains("Feature Flags").should("be.visible");
        cy.contains("Usability Tests").should("be.visible");
    });

    it("should update - Co-Browse", () => {
        cy.contains("Co-Browse")
            .parent()
            .parent()
            .within(() => {
                cy.get(".ant-switch")
                    .invoke("attr", "aria-checked")
                    .then((isChecked) => {
                        const isSwitchedOn = isChecked === "true"; // Convert attribute to boolean

                        // Click the switch
                        cy.get(".ant-switch").click();

                        // Verify Toast message (Move this outside `.within()`)
                        // cy.get(".Toastify__toast", {timeout: 5000})
                        //     .should("be.visible")
                        //     .should(
                        //         "contain",
                        //         isSwitchedOn ? "Module Co-Browse disabled" : "Module Co-Browse enabled"
                        //     );

                        // Toggle back
                        cy.contains("Co-Browse")
                            .parent()
                            .parent()
                            .within(() => {
                                cy.get(".ant-switch").click();
                            });

                        // Verify the second toggle message (Again, outside `.within()`)
                        // cy.get(".Toastify__toast", {timeout: 5000})
                        //     .should("be.visible")
                        //     .should(
                        //         "contain",
                        //         isSwitchedOn ? "Module Co-Browse enabled" : "Module Co-Browse disabled"
                        //     );
                    });
            });
    });

});
