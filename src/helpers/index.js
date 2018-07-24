import titleize from "titleize";

export const rentalType = isShared => (isShared ? "shared" : "entire");
export const toUpperCase = value => (value ? titleize(value) : "");
// export const titleize = title => {
//   return title.split(" ").map(s => {
//     const inner = s.split("");
//     return inner[0].toUpperCase() + inner.slice(1).join("");
//   });
//   return capitalized;
// };
