//import userModel from '../modelsls/userModel.js'
import { Resend } from 'resend'
//import codeGenerator from '../util/generateId.js'
const sendEmailService = async (userId) => {
  try {
    // const userData = await userModel.getUserInfoById(userId)
    const code = 4373// codeGenerator()
    const resend = new Resend('re_eLHJwCap_MHurHyvpeLQrSCuZPSkDHsRV');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@desti.verification.com',
      to: ['monstercat628@gmail.com', 'diegonavarro.work@gmail.com', 'alesemestre3@gmail.com'],
      subject: 'Verification Code',
      html: `<p>Has solicitado un cambio de contraseña para tu cuenta en Desti✈.</p>
      <p>Por favor, utiliza el siguiente código de verificación para completar el proceso:</p>
      <h2 style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">${code}</h2>
      <p>Este código de verificación es válido por un tiempo limitado. No compartas este código con nadie.</p>
      <p>Si no has solicitado un cambio de contraseña, puedes ignorar este correo electrónico.</p>
      <p>¡Que tengas un gran día!</p>`
    });
    if (error) {
      throw { status: 400, message: error }
    }

    return { status: 200, message: data }
  } catch (error) {
    throw error;
  }
}
export default sendEmailService