import CryptoJS from 'crypto-js';

export const encrypt = (message, passphrase) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, passphrase);
  return encryptedMessage.toString();
};

export const decrypt = (message, passphrase) => {
  const decryptedMessage = CryptoJS.AES.decrypt(message, passphrase);
  return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

export const decryptKey = () => {
  const apiKey = localStorage.getItem('apiKey');
  const username = localStorage.getItem('username');
  if (apiKey === undefined || username === undefined) return '';

  const decrpytedUsername = decrypt(username, apiKey);
  return decrypt(apiKey, decrpytedUsername);
};
