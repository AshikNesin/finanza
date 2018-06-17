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
