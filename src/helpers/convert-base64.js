export const toConvertBase64 = (inputString) => {
    const encodedData = Buffer.from(inputString).toString('base64');
    return encodedData;
};

