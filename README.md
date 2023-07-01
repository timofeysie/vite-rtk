# Vite RTK

A Vite project with a [Redux+TS template](https://redux.js.org/introduction/getting-started) (using the `degit` tool to clone and extract the template)

## vite-template-redux

Uses

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://github.com/testing-library/react-testing-library)
- app compatible with [Create React App](https://create-react-app.dev/)

Project started with the following command:

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner
- `npx cypress open` - run cypress

## Some

```js
selectedItems.some((item) => item.id === id)
```

The ```selectedItems.some((item) => item.id === id)``` code is checking if the ```selectedItems``` array contains an item with the same id as the one passed in as an argument.

The ```some()``` method returns a boolean value indicating whether at least one element in the array satisfies the condition specified in the callback function. In this case, the condition is that the id of the current element being checked is equal to the id passed in as an argument.

So if there is at least one item in the ```selectedItems``` array with the same id as the one passed in as an argument, then some() will return true. Otherwise, it will return false.

To make the function more readable, we can do this:

```js
  const handleItemSelect = (id: number) => {
    const selectedItem = data.find((item) => item.id === id)
    const sameItemExists = selectedItems.some((item) => item.id === id);
    if (selectedItem && !sameItemExists) {
      setSelectedItems([...selectedItems, selectedItem])
    }
  }
```

## Delete `␍`eslintprettier/prettier

solved with:

Create a .eslintrc.js file with this:

```txt
endOfLine: 'off'
```

And a .prettierrc.js file with this:

```txt
endOfLine: 'auto'
```

## Cypress with Cucumber setup

Install cypress:

npm install –save-dev cypress

./node_modules/.bin/cypress open ( This is used to get the necessary default configs in place).

Once the initial setup is completed

Create cypress.config.js and add the following:

{
    specPattern: "cypress/e2e/\*_/_.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    baseUrl: "http://127.0.0.1:5173/",
},

### Installing cypress xpaths

npm install -D cypress-xpath

And add the following code line in the e2e.js file in the support folder.

```js
require('cypress-xpath');
```

However, since this cypress installation is created in a Typescript app, import is used.  And the file is called e2e.ts, not .js as is the same for most files.

```ts
import 'cypress-xpath'
```

### Setting up Cucumber

npm install --save-dev cypress-cucumber-preprocessor

For vanilla Javascript apps, the following const should be added to cypress.config.js file:

```js
const cucumber = require('cypress-cucumber-preprocessor').default
```

Since this cypress installation is created 

Afterwards in the same file inside setupNodeEvents the following code should be added

on('file:preprocessor', cucumber())

In package.json file and add the following

```json
,
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": false,
    "stepDefinitions": "cypress/support/step_definitions/",
    "filterSpecs": true,
    "omitFiltered": true
  },
```

### TypeError: cucumber is not a function

The error is occurring after the above steps.  It may be a version issue.

```json
    "cucumber": "^6.0.7",
    "cypress": "^12.5.1",
    "cypress-cucumber-preprocessor": "^4.3.1",
    "cypress-xpath": "^2.0.1",
```

The vanilla JS project:

```json
  "devDependencies": {
    "@cypress/xpath": "^2.0.3",
    "cypress": "^12.5.1",
    "cypress-cucumber-preprocessor": "^4.3.1",
    "cypress-cucumber-tagging": "^1.0.3",
    "cypress-mochawesome-reporter": "^3.3.0",
    "cypress-xpath": "^2.0.1"
  },
```

Notice there is no vanilla cucumber there, just cypress-cucumber-preprocessor.

Also, the current version of cypress is 12.16.0.

npm install --save-dev @types/cypress-cucumber-preprocessor

This doesn't help.  At the end of [this discussion](https://stackoverflow.com/questions/68845897/cypress-adding-cucumber) on the subject, the poster says: *Well, it doesn't work here, and no one dealing with Cypress seems to know one bit about TypeScript. So I'll just have to give up on Cypress. – user9347168 Aug 23, 2021 at 7:34*

For this repo it seems like cucumber is the issue, as cypress was able to run the initial e2e configuration.  However, the goal here is to use cucumber, so I will give up on cypress also.

### Gherkin

Add the following VSCode extension: Cucumber (Gherkin) Full Support

Next goto the settings of the installed extension and click edit in settings.json and add the following

"cucumberautocomplete.customParameters": [
],
"cucumberautocomplete.strictGherkinCompletion": true,
"cucumberautocomplete.steps": [
    "cypress/support/step_definitions/*.js"  //This is to run all the step definitions
],

There is no settings.json file in either project.

## Vite Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
