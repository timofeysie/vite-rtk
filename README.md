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

## Cucumber

Project setup.

npm install –save-dev cypress@12.5.1

./node_modules/.bin/cypress open ( This is used to get the necessary default configs in place).

Once the initial setup is completed

Goto cypress.config.js and add the following commands , these commands should be inside the e2e : {}

{
    specPattern: "cypress/e2e/\*_/_.{js,jsx,ts,tsx,feature}",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    baseUrl: "https://devappcf.quantflo.com/",
},
Installing cypress xpaths
Enter the following command on the terminal to install cypress-xpath:

npm install -D cypress-xpath
And add the following code line in the e2e.js file in the support folder.

require('cypress-xpath');
Setting up Cucumber
Enter the following command on the terminal

npm install --save-dev cypress-cucumber-preprocessor
The following const should be added to cypress.config.js file:

const cucumber = require('cypress-cucumber-preprocessor').default
Afterwards in the same file inside setupNodeEvents the following code should be added

on('file:preprocessor', cucumber())
Goto the package.json file and add the following

"cypress-cucumber-preprocessor": {
"nonGlobalStepDefinitions": false,
"stepDefinitions": "cypress/support/step_definitions/",
Next the following extension should be added into visual studio code:

Extension Name : Cucumber (Gherkin) Full Support

Next goto the settings of the installed extension and click edit in settings.json and add the following

"cucumberautocomplete.customParameters": [
],
"cucumberautocomplete.strictGherkinCompletion": true,
"cucumberautocomplete.steps": [
    "cypress/support/step_definitions/*.js"  //This is to run all the step definitions
],
To run the code

npx cypress open

## Vite Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
