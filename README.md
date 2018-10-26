# Front-end Coding Exercise
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
    __test__/
    components/
    redux/
      actionCreators/
      reducers/
      configureStore.js
      selector.js
    resources/
      dataSource.json
    services/
      apiService.js
    styles/
      App.css
      index.css
      style.js
    types/
      PromotionTypes.js
    App.js
    promotionHelper.js
    index.js
    serviceWorker.js
    setupTests
    utilities.js
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

## Configuration
### How to add a new Promotion/Product/Scanned Item
Inside the /src/resources/dataSource.json there is a JSON file including products, promotions and scanned Items.
