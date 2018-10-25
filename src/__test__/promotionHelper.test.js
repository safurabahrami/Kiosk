import { singleProductSale, groupPromotion, additionalProductDiscount } from "../promotionHelper";
describe("singleProductSale", () => {
  test('applicable promo', () => {
    const input = {
      payload: {
        productId: 1,
        salePrice: 2.1,
        title: "promo"
      },
      basketItem: {
        total: 6.2,
        quantity: 2
      }
    }
    const expected = {
      promoPrice: "2.1",
      promoTotal: "-2.00",
      promoTitle: "promo"
    }
    const actual = singleProductSale(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
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
        total: 7.2,
        quantity: 1
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "0.00",
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
  });

  test('Buy 2 for 12.31 , 2 items purchased', () => {
    const input = {
      payload: payload,
      basketItem: {
        total: 14.4,
        quantity: 2
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "-2.09",
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
  });
  
  test('Buy 2 for 12.31 , 3 items purchased', () => {
    const input = {
      payload: payload,
      basketItem: {
        total: 21.6,
        quantity: 3
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "-2.09",
      promoTitle: "promo"
    }
    const actual = groupPromotion(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
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
        total: 4.42,
        quantity: 2
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "0.00",
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
  });
  test('Buy 2 get the third with 50 percent, 3 items in basket', () => {
    const input = {
      payload: payload50,
      basketItem: {
        total: 6.63,
        quantity: 3
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "-1.10",
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);
  
    expect(actual).toEqual(expected);
  });

  test('Buy 2 get the third free percent, 3 items purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: 6.63,
        quantity: 3
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "-2.21",
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
  });

  test('Buy 2 get the third free, 6 items purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: 13.26,
        quantity: 6
      }
    }
    const expected = {
      promoPrice: "",
      promoTotal: "-4.42",
      promoTitle: "promo"
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);

    expect(actual).toEqual(expected);
  });

  test('Buy 2 get the third free, 1 item purchased', () => {
    const input = {
      payload: payloadFree,
      basketItem: {
        total: 2.21,
        quantity: 1
      }
    }
    const actual = additionalProductDiscount(input.payload, input.basketItem);
    const expected = {
      promoPrice: "",
      promoTotal: "0.00",
      promoTitle: "promo"
    }
    expect(actual).toEqual(expected);
  });
});