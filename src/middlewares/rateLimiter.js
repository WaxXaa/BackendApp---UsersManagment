import rateLimit from "express-rate-limit";
const ipRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Límite de solicitudes por IP
  keyGenerator: function (req /*, res*/) {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  },
  message: "Too many requests from this IP, please try again later."
})
export default ipRateLimit