import { z } from 'zod';

export default z.object({
	id: z.string().trim(),
	notes: z.string().trim().max(200).nullable().optional()
});
