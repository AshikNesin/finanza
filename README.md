> Finanza 💰

Simple library to perform common personal financial operations

## Install

```
$ npm install finanza
```

## Usage

### calculateMonthlyPayment

```js
const monthlyPayment = calculateMonthlyPayment({
  principal: 15812.0,
  monthlyInterestInPercentage: 1.17,
  noOfMonths: 9
});

console.log(monthlyPayment); //  1861.2606240059595
```

### calculateAmortization

```js
const AM = calculateAmortization({
  principal: 15812.0,
  monthlyPayment: 1860.96,
  monthlyInterestInPercentage: 1.17,
  firstPaymentDate: "2018-06-15",
  noOfMonths: 9
});

/* console.log(AM) 👇
[ { currentInterest: 185.00039999999998,​​​​​
​​​​​    currentPrinciple: 1675.9596000000001,​​​​​
​​​​​    endingBalance: 14136.0404,​​​​​
​​​​​    currentPaymentDate: Fri Jun 15 2018 00:00:00 GMT+0530 (IST),​​​​​
​​​​​    pastDate: true },​​​​​
...
​​​​​  { currentInterest: 21.554225914525635,​​​​​
​​​​​    currentPrinciple: 1839.4057740854744,​​​​​
​​​​​    endingBalance: 2.835757070562977,​​​​​
​​​​​    currentPaymentDate: Fri Feb 15 2019 00:00:00 GMT+0530 (IST),​​​​​
​​​​​    pastDate: false } ]​​​​​

*/
```

**Note**
Month starts with 0-index in js. Make sure you pass proper month.

### daysUntilDebtFree

```js
daysUntilDebtFree({ amortizationList: AM }); // 242
```

## License

MIT © [Ashik Nesin](https://ashiknesin.com)
