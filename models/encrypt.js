const crypto = require('crypto');

// Encryption function
exports.encrypt = (text, secretKey='12345678901234567890123456789012') => {
    const iv = '1234567890123456'; // Generate random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

// Decryption function
exports.decrypt = (encryptedText, secretKey='12345678901234567890123456789012')=>{
    const encryptedBuffer = Buffer.from(encryptedText, 'hex');
    const iv = '1234567890123456';  // Extract IV from encrypted text
    const encryptedData = encryptedBuffer.slice(16); // Extract encrypted data from encrypted text

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const secretKey = '12345678901234567890123456789012';
exports.encryptObject = (obj)=>{
    const plaintext = JSON.stringify(obj);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
}

// Decryption function
exports.decryptToObject=(encryptedText)=>{
    const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
    const encryptedData = encryptedText.slice(32);

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}
