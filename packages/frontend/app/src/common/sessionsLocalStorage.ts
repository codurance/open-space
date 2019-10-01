
export const saveItemValue = (key: string, value: boolean) => {
  const keyValue = value ? "1":"0";
  localStorage.setItem(key, keyValue);
}

export const getItemValue = (key: number):boolean => {
    return localStorage.getItem(key.toString()) === "1";
}

 


