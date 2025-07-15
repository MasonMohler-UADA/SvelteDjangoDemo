import { z } from 'zod/v4';

export const user = z.object({
	username: z
		.string()
		.min(3, { message: 'Username must be a minimum of 3 characters' })
		.max(24, { message: "Username can't be longer than 24 characters" }),
	password: z
		.string()
		.max(24, { message: "Passsword can't be longer than 24 characters" })
		.regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)
	// This regex will make sure the password is at least 8 characters
	// and contains at least 1 number, 1 uppercase letter, and one of the
	// specified special characters [!#$%&?].
});
