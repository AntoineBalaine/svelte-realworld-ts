export const dateFromNow = (numberOfDays = 6) => {
	const someDate = new Date();
	const numberOfDaysToAdd = numberOfDays;
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
	return someDate;
};
