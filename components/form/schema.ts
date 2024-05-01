import { z } from 'zod';

export const schema = z.object({
  firstName: z.string().min(2, { message: 'The fist name must contain at least 2 characters' }),
  lastName: z.string().min(2, { message: 'The last name must contain at least 2 characters' }),
  staffId: z
    .number()
    .min(6, { message: 'Staff id must be at least 6 digits long' })
    .positive('Staff id must be positive')
    .optional(),
});
