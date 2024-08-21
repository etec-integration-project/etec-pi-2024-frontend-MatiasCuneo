import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirma que este es tu email",
    html: `<p>Haz click <a href="${confirmLink}">aqui</a> para verificar tu Email.</p>`
  });
};

export const sendResetMail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reestablece tu contraseña",
    html: `<p>Haz click <a href="${resetLink}">aqui</a> para reestablecer tu contraseña.</p>`
  });
};

export const sendTwoFactorMail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Codigo para Verificacion de Dos Pasos",
    html: `<p>Tu codigo de verificacion: ${token}</p>`
  });
};