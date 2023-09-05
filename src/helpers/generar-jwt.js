import jwt from 'jsonwebtoken';

export const generarJwt = (uid = '',secret, expiresIn = '1h') => {
    const payload = { uid };
    return new Promise((resolve, reject) => {

        jwt.sign(payload, secret, {
            expiresIn
        },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Error al generar token');
                }
                resolve(token);
            }
        );
    });
};