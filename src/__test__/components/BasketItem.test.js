import React from 'react';
import toJson from 'enzyme-to-json';

import BasketItem from "../../components/BasketItem";
import { Button } from '@material-ui/core';

describe("render BasketItem", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BasketItem.WrappedComponent
        basketItem={
          {
            quantity:7
          }
        }
        product={{}}
        inventoryQuantity={5}
        updateBasket={() => {}}
    />);
  });

  it("render the component", () => {
    expect(wrapper.length).toEqual(1);
  });
  it("match snapshots", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("textField events when all the inventory is purchased ", () => {
  let wrapper;
  beforeEach(() => 
  {
    wrapper = shallow(<BasketItem.WrappedComponent
        basketItem={
          {
            quantity:7
          }
        }
        product={{}}
        inventoryQuantity={7}
        updateBasket={() => {}}
    />).dive();
  });

  it("match snapshots", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("want to remove 5 items - add disable-remove enable", () => {
    const eventQuantity = { target: { value: 5 } };
    wrapper.find('TextField').at(0).simulate('change', eventQuantity);
    expect(wrapper.state().quantity).toEqual(5);
    let addButton = wrapper.find(Button).at(0);
    let removeButton = wrapper.find(Button).at(1);
    expect(addButton.props().disabled).toBe(true);
    expect(removeButton.props().disabled).toBe(false);
  });

  it("want to insert 10 - add disable-change value to purchased quantity-enable remove", () => {
    const eventQuantity = { target: { value: 10} };
    wrapper.find('TextField').at(0).simulate('change', eventQuantity);
    expect(wrapper.state().quantity).toEqual(7);
    let addButton = wrapper.find(Button).at(0);
    let removeButton = wrapper.find(Button).at(1);
    expect(addButton.props().disabled).toBe(true);
    expect(removeButton.props().disabled).toBe(false);
  });
});

describe("textField events When 3 of 7 inventory has been added", () => {
  let wrapper;
  beforeEach(() => 
  {
    wrapper = shallow(<BasketItem.WrappedComponent
        basketItem={
          {
            quantity:3
          }
        }
        product={{}}
        inventoryQuantity={7}
        updateBasket={() => {}}
    />).dive();
  });

  it("change textbox to 4 - add enable remove disable", () => {
    const eventQuantity = { target: { value: 4 } };
    wrapper.find('TextField').at(0).simulate('change', eventQuantity);
    let addButton = wrapper.find(Button).at(0);
    let removeButton = wrapper.find(Button).at(1);
    expect(wrapper.state().quantity).toEqual(4);
    expect(addButton.props().disabled).toBe(false);
    expect(removeButton.props().disabled).toBe(true);
  });

  it("change textbox to 2 -  add and remove enable", () => {
    const eventQuantity = { target: { value: 2} };
    wrapper.find('TextField').at(0).simulate('change', eventQuantity);
    let addButton = wrapper.find(Button).at(0);
    let removeButton = wrapper.find(Button).at(1);
    expect(wrapper.state().quantity).toEqual(2);
    expect(addButton.props().disabled).toBe(false);
    expect(removeButton.props().disabled).toBe(false);
  });
});

describe("textField events When 0 of 7 inventory has been added", () => {
  let wrapper;
  beforeEach(() => 
  {
    wrapper = shallow(<BasketItem.WrappedComponent
        basketItem={
          {
            quantity:0
          }
        }
        product={{}}
        inventoryQuantity={7}
        updateBasket={() => {}}
    />).dive();
  });

  it("not changing the texbox - add enable remove disable", () => {
    expect(wrapper.state().quantity).toEqual(1);
    let addButton = wrapper.find(Button).at(0);
    let removeButton = wrapper.find(Button).at(1);
    expect(addButton.props().disabled).toBe(false);
    expect(removeButton.props().disabled).toBe(true);
  });
});