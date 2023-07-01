import { defineConfig } from "cypress";
import cucumber from "cypress-cucumber-preprocessor";
import { beforeRunHook, afterRunHook } from "cypress-mochawesome-reporter/lib";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
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