// Ref: https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
// Test in jsfiddle: http://jsfiddle.net/cCX5y/3/
export const toFixedPrecision = function(num, precision) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}