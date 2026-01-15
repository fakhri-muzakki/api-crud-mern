import Joi from 'joi';
import { type ICreateUser } from '../types/user';

export const createUserSchema = Joi.object<ICreateUser>({
  name: Joi.string().min(3).max(50).allow(null, ''),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required().messages({
    'any.only': 'Gender hanya boleh MALE atau FEMALE',
    'string.base': 'Gender harus berupa teks',
    'any.required': 'Gender wajib diisi',
  }),
});

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
    'number.max': 'Page cannot exceed 100',
  }),
  limit: Joi.number().integer().min(1).default(5).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
  }),
});

export const idParamSchema = Joi.object({
  id: Joi.string().length(25), // contoh jika pakai cuid
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(null, ''),
  email: Joi.string().email({ tlds: { allow: false } }),

  gender: Joi.string().valid('MALE', 'FEMALE').messages({
    'any.only': 'Gender hanya boleh MALE atau FEMALE',
    'string.base': 'Gender harus berupa teks',
  }),
})
  .min(1)
  .messages({
    'object.min': 'Minimal satu field harus diisi untuk update',
  });
