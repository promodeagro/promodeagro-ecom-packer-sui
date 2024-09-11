// import { REGEX_TYPE } from "CommonData";

// export const LOCAL_STORAGE_CONSTANTS = {
//   CURRENT_USER: "currentUser",
// };

// export const getCurrentUser = () => {
//   const user = JSON.parse(
//     localStorage.getItem(LOCAL_STORAGE_CONSTANTS.CURRENT_USER) || null
//   );



// export const setCurrentUser = (user) => {
//   if (user) {
//     localStorage.setItem(
//       LOCAL_STORAGE_CONSTANTS.CURRENT_USER,
//       JSON.stringify(user)
//     );
//   }
// };

export const upperCaseLengthInStr = (string) => {
  let str = "" + string;
  return str.length - str.replace(/[A-Z]/g, "").length;
};

export const lowerCaseLengthInStr = (string) => {
  let str = "" + string;
  return str.length - str.replace(/[a-z]/g, "").length;
};

export const localStorageClear = () => {
  localStorage.clear();
};

export const convertDigitToThousand = (value) => {
  return value >= 1000
    ? Number.isInteger(value / 1000)
      ? parseInt(value / 1000) + "k"
      : Number(value / 1000).toFixed(1) + "k"
    : value;
};

export const getFormattedDate = (dateString) => {
  try {
    if (dateString) {
      let date = new Date(dateString);

      let day = `${date.getDate()}`.padStart(2, "0");
      let month = `${date.getMonth() + 1}`.padStart(2, "0");
      let year = date.getFullYear();

      let hours = date.getHours();
      hours = `${hours % 12}`.padStart(2, "0");
      let minutes = `${date.getMinutes()}`.padStart(2, "0");

      let amPm = hours >= 12 ? "PM" : "AM";

      return `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    return null;
  }
};




export const generateRandomPassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let pwd = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    pwd += chars.substring(randomNumber, randomNumber + 1);
  }
  return pwd;
};




export const isAlphaNumeric = (str) => {
  var alphaNumericRegex = REGEX_TYPE.ALPHA_NUMERIC;
  return alphaNumericRegex.test(str);
};

export const isAlphabet = (str) => {
  var alphabetRegex = REGEX_TYPE.ALPHABET;
  return alphabetRegex.test(str);
};






export const getDateInWeek = (date) => {
  // Create a new Date object for the target date
  const targetDate = new Date(date); // Use your desired date here

  // Calculate the day of the month
  const dayOfMonth = targetDate.getDate();

  // Calculate the week number (1 for the first week, 2 for the second week, and so on)
  const weekNumber = Math.ceil(dayOfMonth / 7);

  return weekNumber;
};

export const makeSlugForString = (str) => {
  try {
    return str
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  } catch (error) {
    return str;
  }
};

