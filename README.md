# OpenReplay - Cypress

## 📌 Project Setup

### **1. Clone the Repository**
```sh
git clone 
cd cypress-ts-project
```

### **2. Install Dependencies**
```sh
yarn install
```

### **3. Set Up Environment Variables**
Create a **`.env`** file in the root directory and add:
```env
CYPRESS_PASSWORD=your-secure-password
```

### **4. Verify Cypress Installation**
To confirm Cypress is installed correctly, run:
```sh
npx cypress verify
```

---
## 🚀 Running Cypress Tests

### **1. Run Cypress in GUI Mode**
```sh
yarn cypress open
```
- This will open the **Cypress Test Runner**, where you can select and run tests interactively.

### **2. Run Cypress in Headless Mode**
```sh
yarn cypress run
```
- Runs all tests in the **CLI** without opening the UI.

### **3. Run a Specific Test File**
```sh
yarn cypress run --spec cypress/e2e/example.cy.ts
```
- Replace `example.cy.ts` with your test filename.

---
## 🛠 Configuration & Customization

### **1. Update Cypress Configuration**
Modify **`cypress.config.ts`** if you need to change the base URL:
```ts
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Change as needed
  },
});
```

### **2. Define Custom Commands**
Add reusable commands in **`cypress/support/commands.ts`**:
```ts
Cypress.Commands.add("login", () => {
  cy.fixture("user").then((user) => {
    user.password = Cypress.env("password");
    cy.request("POST", "/api/login", { email: user.email, password: user.password })
      .then((response) => {
        window.localStorage.setItem("authToken", response.body.token);
      });
  });
});
```
- Now, call `cy.login();` in any test.

### **3. Run Cypress Tests in CI/CD**
Add the following to `.github/workflows/cypress.yml` for GitHub Actions:
```yaml
name: Cypress Tests
on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Dependencies
        run: yarn install
      - name: Run Cypress Tests
        run: yarn cypress run
```

---
## 🎯 Best Practices
✅ Use **selectors** wisely (`data-test` attributes recommended)
✅ Keep tests **independent**
✅ Use **fixtures** for test data
✅ Avoid **hardcoded credentials** (use `.env`)
✅ Run tests in **headless mode for CI/CD**

---
## ❓ Need Help?
If you encounter issues, check:
- [Cypress Docs](https://docs.cypress.io)
- Run `yarn cypress open --config video=false` to debug faster.

---
🚀 Happy Testing! 🎯
