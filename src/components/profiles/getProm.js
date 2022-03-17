

export const getProm = (arr) => arr.reduce((prev, current) => parseFloat(prev) + parseFloat(current) , 0) / arr.length;

