import { validateAdd, validateRemove } from '../../components/BasketControlHelper';

describe('validateAdd for Add button', () => {
  test('5 items in inventory - 3 items purchased - want to add 2 more', () => {
    const input = {
      quantity: 2,
      basketItem: {
        quantity: 3,
      },
      productInventory: 5,
    };
    const actual = validateAdd(input.quantity, input.basketItem, input.productInventory);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('5 items in inventory - 5 items purchased - want to add 2 more', () => {
    const input = {
      quantity: 2,
      basketItem: {
        quantity: 5,
      },
      productInventory: 5,
    };
    const actual = validateAdd(input.quantity, input.basketItem, input.productInventory);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  test('5 items in inventory - nothing purchased - want to add 2 more', () => {
    const input = {
      quantity: 2,
      basketItem: {
        quantity: 0,
      },
      productInventory: 5,
    };
    const actual = validateAdd(input.quantity, input.basketItem, input.productInventory);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('5 items in inventory - nothing purchased - want to add 6 more', () => {
    const input = {
      quantity: 6,
      basketItem: {
        quantity: 0,
      },
      productInventory: 5,
    };
    const actual = validateAdd(input.quantity, input.basketItem, input.productInventory);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  test('5 items in inventory - 2 items purchased - want to add 0 item', () => {
    const input = {
      quantity: 0,
      basketItem: {
        quantity: 2,
      },
      productInventory: 5,
    };
    const actual = validateAdd(input.quantity, input.basketItem, input.productInventory);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

describe('validateAdd for Remove button', () => {
  test('2 items purchased, want to remove 0', () => {
    const input = {
      quantity: 0,
      basketItem: {
        quantity: 2,
      },
    };
    const actual = validateRemove(input.quantity, input.basketItem);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  test('2 items purchased, want to remove 1', () => {
    const input = {
      quantity: 1,
      basketItem: {
        quantity: 2,
      },
    };
    const actual = validateRemove(input.quantity, input.basketItem);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('nothing purchased, want to remove 1', () => {
    const input = {
      quantity: 1,
      basketItem: {
        quantity: 0,
      },
    };
    const actual = validateRemove(input.quantity, input.basketItem);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  test('2 items purchased, want to remove 3', () => {
    const input = {
      quantity: 3,
      basketItem: {
        quantity: 2,
      },
    };
    const actual = validateRemove(input.quantity, input.basketItem);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});
