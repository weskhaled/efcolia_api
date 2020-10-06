// import * as CryptoJS from 'crypto-js';
import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';
/**
 * Password Transformer Class
 */
function convertCryptKey(strKey) {
  const newKey = Buffer.alloc(16, 0);
  const bufStrKey = Buffer.alloc(16, strKey);
  for (let i = 0; i < bufStrKey.length; i++) {
    // tslint:disable-next-line: no-bitwise
    newKey[i % 16] ^= bufStrKey[i];
  }
  return newKey;
}

function decrypt(cyphertext) {
  // although this function could run on the client - you should not store 'My very secret key' on the client, nor pass it
  // via API call. You should decrypt on the server.
  const dc = crypto.createDecipheriv(
    'aes-128-ecb',
    convertCryptKey('s43SkdoG6SkElg2d'),
    '',
  );
  const decrypted = dc.update(cyphertext, 'hex', 'utf8') + dc.final('utf8');
  return decrypted;
}
export class PasswordTransformer implements ValueTransformer {
  /**
   * Value to transform to
   * @param value string to hash
   */
  to(value) {
    return value
    // return CryptoJS.AES.encrypt(value, 's43SkdoG6SkElg2d').toString();
    // return crypto.createHmac('sha256', value).digest('hex');
  }

  /**
   * Grabs the string to hash
   * @param value value to return
   */
  from(value) {
    // return value
    return decrypt(value);
  }
}
