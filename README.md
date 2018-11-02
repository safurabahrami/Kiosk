# Simple Self Checkout App

![Demo](https://github.com/safurabahrami/Kiosk/raw/master/kiosk.gif)

## Getting Started
Run ``` npm install ``` to install dependencies based on the package.json
For debugging you might use react developer tools
Main used libraries: React, React-redux, material-ui

## Folder Structure

My project would look like this:

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
    __test__/ --> using jest and enzyme for testing (used the same structure)
    components/ --> components and related helpers are in this folder
    redux/  --> Actions, ActionTypes, reducers, and related configuration for store
      actionCreators/
      reducers/
      configureStore.js
      selector.js
    resources/  --> dataSource for the app
      dataSource.json
    services/  --> helpers for API call or other services
      apiService.js
      promotionService.js
    styles/ --> style related files
      index.css
      style.js
    types/ --> general types
      PromotionTypes.js
    index.js
    serviceWorker.js
    setupTests
    utilities.js
    .eslintrc.js --> eslint config based on airbnb
```
## Available Scripts
To run the app:
### `npm install`
Downloads the project dependencies based on the package.json

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

## Lint
I am using eslint rule which are subset of airbnb style guide.
To run eslint over the project and see all the errors:
`./node_modules/.bin/eslint "src/**/*.js"`

Some issues can be fixed automatically using the command:
`./node_modules/.bin/eslint --fix "src/**/*.js"`



## Supported Browsers
By default, the generated project from create-react-app supports all modern browsers.<br>
Support for Internet Explorer 9, 10, and 11 requires [polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md).

## Assumptions
- Fetching data can be happened using axios or fetch libraries.
- This project is a Single Page Web application. Scanned Items exists in the kiosk and in this page I am using this data.
- Promotions with specific structure is defined.
- Inventory for each product exist under the product object.
- We might have multiple entires with the same product in the scanned item’s JSON.
- We only have the valid (not expired) promotion for each product (in JSON) and we don't have multiple promotions for a product.
- User can not enter quantity that exceeds the maximum of remained inventory and in-basket quantity for the product (to be able to also remove the product)
- Kiosk’s inventory doesn’t update during the checkout process .
- As scanned list and itemized receipt grow, scroll bar is used to show the content.
- Each promotion is only applicable to one product kind
- Scanned item quantity will not proceed the inventory amount so the scanned item JSON is valid based on inventory



## Future works
- I have some tests for different part of the project, I need to add more tests to extend the coverage
- For pricing issues (floating-point logic and arithmetic), I am using a Money class with simple implementation based on [this](https://martinfowler.com/eaaCatalog/money.html). For further implementation, it might be good to use libraries such as [dinero](https://sarahdayan.github.io/dinero.js/)
- Inventory amount can be updated using web socket or API calls later if needed
- More tests can be added for have more coverage
- Adding Reselect to add more efficiency to the project
- Search bar could be added to have a better user experience using the app
- logging can be added
- Translation/Language file can be added
- Using css preprocessor would be helpful to add more flexibility
- Improving the UI/UX
- Only effective promotions will be shown on the receipt items but as a future work one can show the related promotion on each of the scanned items
- Add style preprocessor (Sass) and make the styles more consistent
- Add Error handlers and request failure handlers
- Receipt layout can be more user friendly
- Adding regex not to allow user insert +/- sign in quantity input


## Configuration
### How to add a new Promotion/Product/Scanned Item
Inside the /src/resources/ there is a dataSource.json file which includes products, promotions and scanned Items with a simple structure. You can add new product, scanned item and promotion there.

Promotions: In each promotion we have the promotion type and its specific payload which can be different for different promotion types. if we want to add new promotion type we need to add the handler/implementation for that promotion in /src/services/promotionService.js

Products: In each product we have a simple structure with the related inventory (number of items in kiosk's inventory). I could have a separate array of inventories as well to have more flat state.

ScannedItems: Items which we are assuming have been scanned by user with no specific order. We can have multiple records for each item.


