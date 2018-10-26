import Money from './Money';

// function to convert JSONMoney to Money specified by 'price' key
export const mapProductJSONMoneyFunc = (item) => {
  if (!item.price) {
    return item;
  }
  return Object.assign({}, item, { price: Money.fromJSON(item.price) });
};
