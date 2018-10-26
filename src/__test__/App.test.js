import React from 'react';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

import App from '../App';

const mockStore = configureStore()
const store = mockStore({})

describe('renders without crashing', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App store={store}/>);
  });

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
