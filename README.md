# Front-end Coding Exercise
## Setup

## Folder Structure

After creation, your project should look like this:

```
kiosk/
  README.md
  node_modules/
  package.json
  package-lock.json
  public/
    index.html
    favicon.ico
  src/
    __test__/
    components/
    redux/
      actionCreators/
      reducers/
      configureStore.js
      selector.js
    services/
      apiService.js
      dataSource.json
    styles/
      App.css
      index.css
      style.js
    types/
      PromotionTypes.js
    App.js
    helper.js
    index.js
    serviceWorker.js
    setupTests
    .eslintrc
```
## Available Scripts
To run the app:
### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Test
I am using this combination of tools for test:
- Jest, a test runner;
- Enzyme, a testing utility for React;
- enzyme-to-json to convert Enzyme wrappers for Jest snapshot matcher.
You can run:
### `npm test`

To override the snapshots run:
### `npm test -- -u`

## Supported Browsers
By default, the generated project from create-react-app supports all modern browsers.<br>
Support for Internet Explorer 9, 10, and 11 requires [polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md).

## Assumptions
### fetching data can be happened using axios or fetch libraries.

## Configuration
### How to add a new promotion
### How to add a new product
### How to add a new scanned item