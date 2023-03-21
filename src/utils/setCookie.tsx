const setCookie = (name: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};domain=https://my-shop-self.vercel.app`;
};

export default setCookie;
