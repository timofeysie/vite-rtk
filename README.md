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

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
