export const modifyDate = (dateIso) => {
    const date = dateIso.slice(0,10);
    const year = date.substring(0,4);
    const month = date.substring(5,7);
    const day = date.substring(8);
    return `${day}.${month}, ${year}`
  }

  export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = (totalMinutes % 60);
    return  `${hours}:${minutes}`;
  }

  