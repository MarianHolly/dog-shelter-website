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
		// Core identity
		name: z.string(),
		breed: z.string(),
		age: z.string(),
		gender: z.string(),
		size: z.string().optional(),
		weight: z.string().optional(),
		color: z.string().optional(),

		// Media
		image: z.string(),
		images: z.array(z.string()).optional(),
		videoUrl: z.string().optional(),

		// Description & personality
		description: z.string(),
		personality: z.string().optional(),
		characteristics: z.array(z.string()).optional(),
		idealFamily: z.string().optional(),
		whyAdoptMe: z.array(z.string()).optional(),

		// Status & visibility
		adoptionStatus: z.enum(['available', 'reserved', 'adopted']).default('available'),
		urgent: z.boolean().default(false),
		featured: z.boolean().default(false),
		specialNeeds: z.boolean().optional(),
		arrivalDate: z.string().optional(),

		// Compatibility
		goodWithKids: z.boolean().optional(),
		kidsAgeRecommendation: z.string().optional(),
		goodWithDogs: z.boolean().optional(),
		goodWithCats: z.boolean().optional(),
		goodWithOtherPets: z.boolean().optional(),

		// Energy & training
		energyLevel: z.string().optional(),
		houseTrained: z.boolean().optional(),
		leashTrained: z.boolean().optional(),
		commands: z.array(z.string()).optional(),
		trainingNeeds: z.string().optional(),
		experienceRequired: z.string().optional(),

		// Living requirements
		exerciseNeeds: z.string().optional(),
		spaceNeeds: z.string().optional(),
		timeCommitment: z.string().optional(),
		aloneTimeTolerance: z.string().optional(),
		groomingNeeds: z.string().optional(),

		// Health
		vaccinated: z.boolean().optional(),
		sterilized: z.boolean().optional(),
		chipped: z.boolean().optional(),
		dewormed: z.boolean().optional(),
		health: z.string().optional(),
		healthIssues: z.string().optional(),
		medications: z.array(z.string()).optional(),
		dietaryNeeds: z.string().optional(),

		// Adoption
		adoptionFee: z.number().optional(),
		specialRequirements: z.array(z.string()).optional(),
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
