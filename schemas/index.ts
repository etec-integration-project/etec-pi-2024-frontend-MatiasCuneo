import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.coerce.string().email({
    message: "El Email es obligatorio"
  }),
  password: z.coerce.string().min(1, {
    message: "La contraseña es obligatoria"
  }),
  code: z.optional(z.coerce.string().min(6, {
    message: "El codigo debe contener 6 caracteres"
  }))
});

export const RegisterSchema = z.object({
  name: z.coerce.string().min(1, {
    message: "El nombre es obligatorio"
  }),
  email: z.coerce.string().email({
    message: "El Email es obligatorio"
  }),
  password: z.coerce.string().min(6, {
    message: "La contraseña debe contener minimo 6 caracteres"
  }),
  rep_password: z.coerce.string().min(6, {
    message: "Las contraseñas no coinciden"
  })
}).refine((data) => data.password === data.rep_password, {
  message: "Las contraseñas no coinciden",
  path: ["rep_password"]
});

export const ResetSchema = z.object({
  email: z.coerce.string().email({
    message: "El Email es obligatorio"
  }),
});

export const NewPassSchema = z.object({
  password: z.coerce.string().min(1, {
    message: "La contraseña actual es obligatoria"
  }),
  new_password: z.coerce.string().min(6, {
    message: "La nueva contraseña debe contener minimo 6 caracteres"
  }),
  rep_password: z.coerce.string().min(6, {
    message: "Las contraseñas no coinciden"
  })
}).refine((data) => data.new_password === data.rep_password, {
  message: "Las contraseñas no coinciden",
  path: ["rep_password"]
});

export const SettingsSchema = z.object({
  name: z.optional(z.coerce.string()),
  email: z.optional(z.coerce.string().email()),
  isTFAEnabled: z.optional(z.boolean()),
  password: z.optional(z.string()),
  new_password: z.optional(z.string().min(6, {
    message: "La nueva contraseña debe contener minimo 6 caracteres"
  }))
}).refine((data) => {
  if (data.password && !data.new_password) return false;
  return true;
}, {
  message: "La nueva contraseña es obligatoria",
  path: ["new_password"]
}).refine((data) => {
  if (!data.password && data.new_password) return false;
  return true;
}, {
  message: "La contraseña es obligatoria",
  path: ["password"]
});