import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dogs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/dogs' }),
	schema: z.object({
		// ===== REQUIRED FIELDS (minimum needed for listing) =====
		name: z.string(),
		breed: z.string(), // Can be "Mešťanček" or "Neznáme"
		age: z.string(), // e.g. "2 roky", "5 mesiacov", "Dospelý", "Senior"
		gender: z.enum(['Pes', 'Suka']),
		image: z.string(), // At least one main image
		description: z.string(), // Short description for cards

		// ===== STATUS & URGENCY =====
		adoptionStatus: z.enum(['Dostupný', 'Rezervovaný', 'Adoptovaný']).default('Dostupný'),
		urgent: z.boolean().default(false),
		specialNeeds: z.boolean().default(false),

		// ===== BASIC INFO (optional) =====
		size: z.enum(['Malý', 'Stredný', 'Veľký']).optional(),
		weight: z.string().optional(), // e.g. "25 kg"
		color: z.string().optional(), // e.g. "Hnedý", "Čierno-biely"
		chipNumber: z.string().optional(),
		arrivalDate: z.string().optional(), // Can be string like "December 2024" or date

		// ===== MEDIA =====
		images: z.array(z.string()).optional(), // Photo gallery
		videoUrl: z.string().optional(), // YouTube, Vimeo, or direct link

		// ===== HEALTH & CARE =====
		vaccinated: z.boolean().optional(),
		sterilized: z.boolean().optional(), // or castrated
		chipped: z.boolean().optional(),
		dewormed: z.boolean().optional(),
		health: z.string().optional(), // Detailed health info
		healthIssues: z.string().optional(), // Any ongoing issues
		medications: z.array(z.string()).optional(),
		dietaryNeeds: z.string().optional(),

		// ===== PERSONALITY & BEHAVIOR =====
		personality: z.string().optional(), // Detailed personality description
		characteristics: z.array(z.string()).optional(), // Quick traits list
		energyLevel: z.enum(['Nízka', 'Stredná', 'Vysoká']).optional(),
		temperament: z.string().optional(), // Friendly, shy, protective, etc.
		story: z.string().optional(), // Background story

		// ===== COMPATIBILITY =====
		goodWithKids: z.boolean().optional(),
		kidsAgeRecommendation: z.string().optional(), // e.g. "10+ rokov"
		goodWithDogs: z.boolean().optional(),
		goodWithCats: z.boolean().optional(),
		goodWithOtherPets: z.boolean().optional(),

		// ===== TRAINING & SKILLS =====
		houseTrained: z.boolean().optional(),
		leashTrained: z.boolean().optional(),
		commands: z.array(z.string()).optional(), // e.g. ["Sed", "Ľahni", "Poď"]
		trainingNeeds: z.string().optional(),

		// ===== LIVING REQUIREMENTS =====
		exerciseNeeds: z.string().optional(), // e.g. "2 hodiny denne"
		spaceNeeds: z.enum(['Byt', 'Dom so záhradou', 'Veľká záhrada', 'Nevadí']).optional(),
		timeCommitment: z.string().optional(),
		experienceRequired: z.enum(['Začiatočník', 'Stredne pokročilý', 'Skúsený']).optional(),
		aloneTimeTolerance: z.string().optional(),
		groomingNeeds: z.string().optional(),

		// ===== IDEAL HOME =====
		idealFamily: z.string().optional(), // Description of ideal adopter
		whyAdoptMe: z.array(z.string()).optional(), // Selling points

		// ===== ADOPTION INFO =====
		adoptionFee: z.number().optional(),
		specialRequirements: z.array(z.string()).optional(),

		// ===== METADATA =====
		featured: z.boolean().default(false), // Featured dog on homepage
		dateAdded: z.date().optional(),
		lastUpdated: z.date().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		// ===== REQUIRED FIELDS =====
		title: z.string(),
		description: z.string(), // Short excerpt for listing
		pubDate: z.date(), // Publication date
		author: z.string().default('Trenčianský útulok'),

		// ===== MEDIA =====
		image: z.string().optional(), // Featured image
		imageAlt: z.string().optional(), // Alt text for image

		// ===== CATEGORIZATION =====
		category: z.enum([
			'Príbehy',
			'Tipy a rady',
			'Novinky',
			'Adopcie',
			'Zdravie',
			'Výchova',
			'Dobrovoľníctvo',
			'Udalosti',
		]).optional(),
		tags: z.array(z.string()).optional(), // e.g. ["adopcia", "starostlivosť", "zima"]

		// ===== METADATA =====
		featured: z.boolean().default(false), // Featured on blog homepage
		draft: z.boolean().default(false), // Don't show if draft
		updatedDate: z.date().optional(), // Last update date
	}),
});

export const collections = {
	dogs,
	blog,
};
