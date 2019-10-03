import CryptoJS from 'crypto-js';

export const encrypt = (message, passphrase) => {
  const encryptedMessage = CryptoJS.AES.encrypt(message, passphrase);
  return encryptedMessage.toString();
};

export const decrypt = (message, passphrase) => {
  const decryptedMessage = CryptoJS.AES.decrypt(message, passphrase);
  console.log(decryptedMessage)
  return decryptedMessage.toString(CryptoJS.enc.Utf8);
};
