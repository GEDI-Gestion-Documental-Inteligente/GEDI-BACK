import { rateLimit } from 'express-rate-limit'

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100, // por temas de pruebas de desarrollo en cuanto al frontend, luego se lo cambiaria a 5 intentos
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'Ha superado el limite de intentos'
  //   statusCode: 429
})
