import { singleProductSale, groupPromotion, additionalProductDiscount } from "../promotionHelper";

import Money from '../Money';

const expectPromoResultsToBeEqual = (res1, res2)=>{
  if(res1.promoPrice === null){
    expect(res2.promoPrice).toBeNull();
  }else{
    expect(res1.promoPrice.equalsTo(res2.promoPrice)).toBe(true);
  }
  expect(res1.promoTotal.equalsTo(res2.promoTotal)).toBe(true);
  expect(res1.promoTitle).toEqual(res2.promoTitle);
}

describe("singleProductSale", () => {
  test('applicable promo', () => {
    const input = {
      payload: {
        productId: 1,
        salePrice: 2.1,
        title: "promo"
      },
      basketItem: {
        total: Money.fromNumber(6.2),
        quantity: 2
      }
    }
    const expected = {
      promoPrice: Money.fromNumber(2.1),
      promoTotal: Money.fromNumber(-2.00),
      promoTitle: "promo"
    }
    const actual = singleProductSale(input.payload, input.basketItem);
    expectPromoResultsToBeEqual(actual, expected);
  });
});

describe("groupPromotion", () => {
  let payload;

  beforeAll(() => {
    payload = {
      productId: 1,
      salePrice: 12.31,
      quantity: 2,
      title: "promo"
    };
  })

  test('Buy 2 for 12.31 , 1 item purchased', () => {
    const input = {
      payload: payload ,
      basketItem: {
        total: Money.fromNumber(7.2),
        quantity: 1
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal:  Money.fromNumber(0),
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);
    expectPromoResultsToBeEqual(actual, expected);

  });

  test('Buy 2 for 12.31 , 2 items purchased', () => {
    const input = {
      payload: payload,
      basketItem: {
        total: Money.fromNumber(14.4),
        quantity: 2
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(-2.09),
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);

    expectPromoResultsToBeEqual(actual, expected);
  });
  
  test('Buy 2 for 12.31 , 3 items purchased', () => {
    const input = {
      payload: payload,
      basketItem: {
        total: Money.fromNumber(21.6),
        quantity: 3
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(-2.09),
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);

    expectPromoResultsToBeEqual(actual, expected);
  });

});

describe("additionalProductDiscount", () => {
  let payload50;
  let payloadFree;
  
  beforeAll(() => {
    payload50 = {
      productId: 1,
      quantity: 2,
      salePercentage: 50,
      title: "promo"
    };
    payloadFree = {
      productId: 1,
      quantity: 2,
      salePercentage: 100,
      title: "promo"
    };
  })

  test('Buy 2 get the third with 50 percent, 2 items purchased', () => {
    const input = {
      payload: payload50,
      basketItem: {
        total: Money.fromNumber(4.42),
        quantity: 2
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(0),
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expectPromoResultsToBeEqual(actual, expected);
  });
  test('Buy 2 get the third with 50 percent, 3 items in basket', () => {
    const input = {
      payload: payload50,
      basketItem: {
        total: Money.fromNumber(6.63),
        quantity: 3
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(-1.10),
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);
  
    expectPromoResultsToBeEqual(actual, expected);
  });

  test('Buy 2 get the third free percent, 3 items purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: Money.fromNumber(6.63),
        quantity: 3
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(-2.21),
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expectPromoResultsToBeEqual(actual, expected);
  });

  test('Buy 2 get the third free, 6 items purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: Money.fromNumber(13.26),
        quantity: 6
      }
    }
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(-4.42),
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expectPromoResultsToBeEqual(actual, expected);
  });

  test('Buy 2 get the third free, 1 item purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: Money.fromNumber(2.21),
        quantity: 1
      }
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);
    const expected = {
      promoPrice: null,
      promoTotal: Money.fromNumber(0),
      promoTitle: "promo"
    }
    expectPromoResultsToBeEqual(actual, expected);
  });
});