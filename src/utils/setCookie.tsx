const setCookie = (name: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  let cookieValue = `${name}=${value};${expires};domain=my-shop-junchoi.vercel.app;path=/;SameSite=Lax`;
  if (window.location.protocol === 'https:') {
    cookieValue += ';Secure';
  }
  document.cookie = cookieValue;
};

export default setCookie;
