import { User } from "./User";

export const setInterest = (key: number, value: boolean) => {
  localStorage.setItem(key.toString(), value.toString());
};

export const checkInterest = (key: number): boolean => {
  return localStorage.getItem(key.toString()) === "true";
};

export const storeUserInformation = (user: User): void => {
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userEmail", user.email);
  localStorage.setItem("userName", user.name);
};

export const retrieveUserInformation = (): Promise<User> => {
  return new Promise(resolve => {
    const storedId = localStorage.getItem("userId");
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");

    const returnUser: User = {
      id: storedId ? storedId : "",
      email: storedEmail ? storedEmail : "",
      name: storedName ? storedName : ""
    };

    resolve(returnUser);
  });
};

export const isUserLoggedIn: Function = (): Promise<Boolean> => {
  return new Promise(resolve => {
    if (localStorage.getItem("userId")) resolve(true);
    else resolve(false);
  });
};
