import titleize from "titleize";
import * as moment from "moment";

export const rentalType = isShared => (isShared ? "shared" : "entire");
export const toUpperCase = value => (value ? titleize(value) : "");
// export const titleize = title => {
//   return title.split(" ").map(s => {
//     const inner = s.split("");
//     return inner[0].toUpperCase() + inner.slice(1).join("");
//   });
//   return capitalized;
// };

export const pretifyDate = date => moment(date).format("MMM Do YY");

export const getRangeOfDates = (startAt, endAt, dateFormat = "Y/MM/DD") => {
  const tempDates = [];
  const momentEndAt = moment(endAt);
  let momentStartAt = moment(startAt);

  while (momentStartAt < momentEndAt) {
    tempDates.push(momentStartAt.format(dateFormat));
    momentStartAt = momentStartAt.add(1, "day");
  }

  tempDates.push(momentEndAt.format(dateFormat));

  return tempDates;
};
