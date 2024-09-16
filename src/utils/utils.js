export const trunc = (text, maxLenght) =>
    text?.length > maxLenght ? text?.substring(0, maxLenght - 3) + '...' : text

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)
