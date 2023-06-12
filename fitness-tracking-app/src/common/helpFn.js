import { NAME_MIN_LENGTH, NAME_MAX_LENGTH, MIN_WEIGHT, MAX_WEIGHT, MIN_HEIGHT, MAX_HEIGHT, phoneRegex } from "./constants";

export const modifyDate = (dateIso) => {
    const date = dateIso.slice(0,10);
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8);
    return `${day}/${month}/${year}`
  }

  export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = (totalMinutes % 60);
    return  `${hours}:${minutes}`;
  }

export const isErrorFirstName = (firstName) => firstName === "" || firstName.length <= NAME_MIN_LENGTH || firstName.length > NAME_MAX_LENGTH;

export const isErrorLastName = (lastName) => lastName === "" || lastName.length <=  NAME_MIN_LENGTH || lastName.length > NAME_MAX_LENGTH;

export const isErrorWeight = (weight) => weight === "" || weight < MIN_WEIGHT || weight > MAX_WEIGHT;

export const isErrorHeight = (height) => height === "" || height < MIN_HEIGHT || height > MAX_HEIGHT;

export const isErrorPhone = (phoneNumber) => phoneNumber === "" || !phoneRegex.test(phoneNumber);

export const isErrorBirthday = (birthdayDate) => birthdayDate === "";

export const isErrorGender = (gender) => gender === "";