export const verifConnAlfresco = async(_req, _res, next) => {
  const URL_AUTH_API = process.env.URL_AUTH_API;
  const URL_HOST = process.env.URL_HOST;
  try {
    const prueba = await fetch(
      `http://${URL_HOST}:8080/${URL_AUTH_API}/tickets`,
      {
        method: 'POST',
      },
    )
      .then(() => {
        return {
          ok: true,
          msg: 'Conexión exitosa con alfresco',
        };
      })
      .catch((error) => {
        if (error.cause.code === 'ECONNREFUSED') {
          return {
            ok: false,
            msg: 'No se pudo realizar la conexión con alfresco',
          };
        }
      });
    if (!prueba.ok) {
      throw new Error(prueba.msg);
    }
    return prueba.msg;
  } catch (error) {
    console.log('');
    console.error({ error: error.message });
    console.log('');
    process.exit(1);
  }
};
