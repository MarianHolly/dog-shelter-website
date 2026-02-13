import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default('Trenčianský útulok'),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

const dogs = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		breed: z.string(),
		age: z.string(),
		gender: z.string(),
		size: z.string().optional(),
		image: z.string(),
		description: z.string(),
		urgent: z.boolean().default(false),
		featured: z.boolean().default(false),
		goodWithKids: z.boolean().optional(),
		goodWithDogs: z.boolean().optional(),
		goodWithCats: z.boolean().optional(),
		energyLevel: z.string().optional(),
	}),
});

const testimonials = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		dogName: z.string(),
		date: z.coerce.date(),
		rating: z.number().min(1).max(5),
		featured: z.boolean().default(false),
	}),
});

export const collections = {
	blog,
	dogs,
	testimonials,
};
