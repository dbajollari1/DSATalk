//create isotimestamp
const currentDate = new Date();
const isoTimestamp = currentDate.toISOString();
console.log(isoTimestamp);

//convert back to eastern standard time readable string
const thisDate = new Date(isoTimestamp)
const estDateString = thisDate.toLocaleString("en-US", { timeZone: "America/New_York" });
console.log(estDateString);