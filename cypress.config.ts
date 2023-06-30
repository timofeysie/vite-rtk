import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const cucumber = require("cypress-cucumber-preprocessor").default;
      const {
        beforeRunHook,
        afterRunHook,
      } = require("cypress-mochawesome-reporter/lib");

      on("file:preprocessor", cucumber());
      require("cypress-mochawesome-reporter/plugin")(on);
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
    },

    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    baseUrl: "http://127.0.0.1:5173/",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

});
