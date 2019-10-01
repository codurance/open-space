export const saveItemValue = (key: number, value: boolean) => {
  localStorage.setItem(key.toString(), value.toString());
}

export const checkInterest = (key: number): boolean => {
  return localStorage.getItem(key.toString()) === "true";
}