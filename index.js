//* Follow Unix Philosophy for APIs → Do one thing. Do it well.

import dayjs from "dayjs";

// Utils

const percentToDecimal = percentage => percentage / 100;

// APIs
const calculateMonthlyPayment = ({
  principal = 0,
  monthlyInterestInPercentage = 0,
  noOfMonths = 0
}) => {
  const PRINCIPAL = principal;
  const MONTHLY_INTEREST_DECIMAL = percentToDecimal(
    monthlyInterestInPercentage
  );
  const NO_OF_MONTHS = noOfMonths;
  const numerator = PRINCIPAL * MONTHLY_INTEREST_DECIMAL;
  const denominator = 1 - Math.pow(1 + MONTHLY_INTEREST_DECIMAL, -NO_OF_MONTHS);
  const monthlyPaymentAmount = numerator / denominator;
  return monthlyPaymentAmount;
};

const calculateAmortization = ({
  principal = 0,
  monthlyInterestInPercentage = 0,
  noOfMonths = 0,
  monthlyPayment = 0,
  firstPaymentDate = null
}) => {
  const MONTHLY_PAYMENT = monthlyPayment;
  const MONTHLY_INTEREST_DECIMAL = percentToDecimal(
    monthlyInterestInPercentage
  );
  let FIRST_PAYMENT_DATE = null;
  //? Make firstPaymentDate required?
  if (dayjs(firstPaymentDate).isValid()) {
    FIRST_PAYMENT_DATE = dayjs(firstPaymentDate); // Since date starts with 0-index in js
  }

  // Let's calculate ⚡️
  const schedule = [];

  let startingBalance = principal;
  let currentPaymentDate = FIRST_PAYMENT_DATE;

  for (let i = 0; i < noOfMonths; i++) {
    const item = {};
    item.currentInterest = startingBalance * MONTHLY_INTEREST_DECIMAL;
    item.currentPrinciple = MONTHLY_PAYMENT - item.currentInterest;
    item.endingBalance = startingBalance - item.currentPrinciple;

    if (dayjs(currentPaymentDate).isValid()) {
      item.currentPaymentDate = currentPaymentDate.toDate();
      item.pastDate = dayjs(currentPaymentDate).isBefore(dayjs());
    }

    schedule.push(item);

    startingBalance = item.endingBalance;

    if (dayjs(currentPaymentDate).isValid()) {
      currentPaymentDate = currentPaymentDate.add("1", "month");
    }
  }
  return schedule;
};

const daysUntilDebtFree = ({ amortizationList = [] }) => {
  //TODO Are those validations are right?
  if (!amortizationList.length) {
    throw new Error("amortizationList");
  }
  if (!amortizationList[0].currentPaymentDate) {
    throw new Error("amortizationList item must have payment date");
  }

  const lastPayment =
    amortizationList[amortizationList.length - 1].currentPaymentDate;
  return dayjs(lastPayment).diff(dayjs(), "days");
};

// ***************
// Compound Interest
// ***************

// Equation: A = p * [[1 + (r/n)] ^ nt]
// Where:
// A = amount after time t
// p = principal amount (your initial investment)
// r = annual interest rate (divide the number by 100)
// t = number of years
// n = number of times the interest is compounded per year


const calculateCompoundInterest = ({
  principal = 0,
  annualInterestRate = 0,
  noOfYears = 0,
  compoundingTimesPerYear = 0
}) => {
  const PRINCIPAL = principal;
  const ANNUAL_INTEREST_RATE = annualInterestRate;
  const NO_OF_YEARS = noOfYears;
  const COMPUDING_TIMES_PER_YEAR = compoundingTimesPerYear;
  const amountAfterTime = (PRINCIPAL* Math.pow((1 + (ANNUAL_INTEREST_RATE/(COMPUDING_TIMES_PER_YEAR*100))), (COMPUDING_TIMES_PER_YEAR*NO_OF_YEARS)));
  return amountAfterTime;
};


module.exports = {
  calculateMonthlyPayment,
  calculateAmortization,
  daysUntilDebtFree,
  calculateCompoundInterest
};
