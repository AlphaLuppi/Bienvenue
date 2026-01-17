import type { FilterCriteria, FilterResult, Solution } from '$lib/types/solution';

export interface ResponseContext {
	criteria: Partial<FilterCriteria>;
	matchCount: number;
	previousCount: number;
	matchedSolutions: Solution[];
}

// Response templates organized by trigger type
const TEMPLATES = {
	location: {
		sud: [
			'Le sud de la France, excellent choix ! Soleil, mer et douceur de vivre. J\'ai trouvé {count} opportunités dans cette région.',
			'Direction le Midi ! {count} solutions vous attendent sous le soleil du sud.'
		],
		nord: [
			'Le nord a beaucoup à offrir ! {count} opportunités correspondent à votre recherche.',
			'Cap vers le nord ! J\'ai identifié {count} solutions dans cette région.'
		],
		ouest: [
			'L\'ouest et ses côtes magnifiques ! {count} opportunités vous y attendent.',
			'La Bretagne et ses environs regorgent de possibilités. {count} solutions correspondent.'
		],
		montagne: [
			'La montagne vous appelle ! {count} opportunités au pied des sommets.',
			'Entre lacs et montagnes, {count} solutions s\'offrent à vous.'
		],
		mer: [
			'La vie au bord de mer, quel rêve ! {count} opportunités près de l\'océan.',
			'Les embruns vous attendent ! {count} solutions en bord de mer.'
		],
		default: [
			'J\'ai trouvé {count} opportunités dans cette région.',
			'{count} solutions correspondent à cette localisation.'
		]
	},

	jobSector: {
		tech: [
			'Super ! Le secteur tech est en pleine expansion en France. {count} opportunités correspondent.',
			'Excellent choix ! {count} villes proposent des postes tech intéressants.',
			'Le numérique recrute partout ! J\'ai trouvé {count} opportunités dans la tech.'
		],
		healthcare: [
			'Le secteur de la santé recrute activement. {count} solutions correspondent.',
			'La santé, un secteur porteur ! {count} opportunités pour vous.'
		],
		education: [
			'L\'éducation offre de belles opportunités. {count} solutions dans l\'enseignement.',
			'Former les générations futures ! {count} postes dans l\'éducation.'
		],
		tourism: [
			'Le tourisme, secteur dynamique ! {count} opportunités vous attendent.',
			'Vivre du tourisme en France ! {count} solutions correspondent.'
		],
		services: [
			'Les services sont très présents. {count} opportunités dans ce secteur.',
			'{count} solutions dans le secteur des services.'
		],
		default: [
			'{count} opportunités correspondent à ce secteur d\'activité.',
			'J\'ai trouvé {count} postes dans ce domaine.'
		]
	},

	budget: [
		'Avec un budget de {amount}€/mois, {count} options s\'offrent à vous.',
		'J\'ai filtré les logements sous {amount}€. Il reste {count} solutions.',
		'Budget de {amount}€ max ? Parfait, {count} opportunités correspondent.',
		'{count} solutions avec un loyer inférieur à {amount}€.'
	],

	hobbies: {
		hiking: [
			'Vous aimez la randonnée ! {count} destinations offrent de superbes sentiers.',
			'La rando, excellent choix ! {count} solutions près de beaux parcours.'
		],
		cycling: [
			'Amateur de vélo ! {count} villes avec d\'excellentes pistes cyclables.',
			'{count} solutions pour les passionnés de cyclisme.'
		],
		'water-sports': [
			'Proche de l\'eau ! {count} solutions vous permettent de pratiquer les sports nautiques.',
			'La mer ou les lacs à portée de main ! {count} opportunités.'
		],
		culture: [
			'Féru de culture ! {count} villes avec une riche offre culturelle.',
			'Musées, théâtres, concerts... {count} solutions pour les amateurs de culture.'
		],
		gastronomy: [
			'La gastronomie française à portée ! {count} solutions pour les gourmets.',
			'{count} villes réputées pour leur terroir et leur cuisine.'
		],
		'winter-sports': [
			'Les sports d\'hiver vous attirent ! {count} solutions près des stations.',
			'Ski et neige au programme ! {count} opportunités en montagne.'
		],
		default: [
			'{count} solutions correspondent à vos loisirs préférés.',
			'Vos hobbies sont accessibles dans {count} destinations.'
		]
	},

	narrowDown: [
		'Nous avons réduit les options de {previous} à {count} solutions.',
		'Ça se précise ! Plus que {count} opportunités qui cochent toutes les cases.',
		'De {previous} à {count} solutions, on affine !',
		'Le choix se resserre : {count} solutions restantes.'
	],

	singleResult: [
		'Parfait ! Une solution se démarque : {name} à {city}. C\'est peut-être votre futur chez-vous !',
		'Bingo ! {name} à {city} correspond parfaitement à tous vos critères.',
		'Une pépite trouvée : {name} à {city}. Elle coche toutes les cases !'
	],

	fewResults: [
		'Excellent ! {count} solutions correspondent parfaitement. Je les mets en évidence sur la carte.',
		'On y est presque ! {count} opportunités répondent à tous vos critères.',
		'{count} solutions idéales identifiées. Regardez sur la carte !'
	],

	noResults: [
		'Hmm, aucune solution ne correspond à tous vos critères. Voulez-vous élargir votre recherche ?',
		'Ces critères sont un peu restrictifs. Que diriez-vous d\'augmenter votre budget ou d\'être flexible sur le secteur ?',
		'Je n\'ai trouvé aucun match parfait. Essayez de modifier un critère ?'
	],

	noCriteria: [
		'Je n\'ai pas bien compris. Pouvez-vous me dire dans quel secteur vous souhaitez travailler ? (tech, santé, éducation...)',
		'Dites-moi en plus sur vos préférences ! Budget logement ? Loisirs préférés ? Région ?',
		'Qu\'est-ce qui compte le plus pour vous : le travail, le logement, ou les activités ?',
		'Parlez-moi de votre projet : où voulez-vous vivre ? Quel type de travail cherchez-vous ?'
	],

	reset: [
		'Parfait ! J\'ai réinitialisé la recherche. Toutes les 18 solutions sont à nouveau visibles. Par quoi voulez-vous commencer ?',
		'C\'est reparti de zéro ! 18 opportunités vous attendent. Que recherchez-vous ?',
		'Recherche réinitialisée ! Dites-moi vos préférences pour affiner.'
	],

	remoteWork: [
		'Le télétravail, c\'est important ! {count} solutions offrent cette flexibilité.',
		'Travail à distance possible dans {count} opportunités.'
	]
};

// Helper to select random template
function pickRandom<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to fill template variables
function fillTemplate(
	template: string,
	vars: Record<string, string | number>
): string {
	return template.replace(/{(\w+)}/g, (_, key) => String(vars[key] || ''));
}

// Detect which location keyword was used
function getLocationKeyword(criteria: Partial<FilterCriteria>): string {
	if (!criteria.regions || criteria.regions.length === 0) return 'default';

	const regions = criteria.regions;
	if (
		regions.some((r) =>
			['provence-alpes-cote-azur', 'occitanie', 'nouvelle-aquitaine'].includes(r)
		)
	) {
		return 'sud';
	}
	if (regions.some((r) => ['hauts-de-france', 'grand-est'].includes(r))) {
		return 'nord';
	}
	if (
		regions.some((r) => ['bretagne', 'pays-de-la-loire', 'normandie'].includes(r))
	) {
		return 'ouest';
	}
	if (regions.includes('auvergne-rhone-alpes')) {
		return 'montagne';
	}
	return 'default';
}

/**
 * Generate a contextual response based on filter results
 */
export function generateResponse(context: ResponseContext): string {
	const { criteria, matchCount, previousCount, matchedSolutions } = context;
	const vars: Record<string, string | number> = {
		count: matchCount,
		previous: previousCount
	};

	// No results
	if (matchCount === 0) {
		return pickRandom(TEMPLATES.noResults);
	}

	// Single result - special case
	if (matchCount === 1 && matchedSolutions.length > 0) {
		const solution = matchedSolutions[0];
		vars.name = solution.name;
		vars.city = solution.city;
		return fillTemplate(pickRandom(TEMPLATES.singleResult), vars);
	}

	// Very few results (2-3)
	if (matchCount <= 3) {
		return fillTemplate(pickRandom(TEMPLATES.fewResults), vars);
	}

	// Build response based on what criteria was applied
	let response = '';

	// Location-based response
	if (criteria.regions && criteria.regions.length > 0) {
		const locationKey = getLocationKeyword(criteria);
		const templates = TEMPLATES.location[locationKey as keyof typeof TEMPLATES.location] || TEMPLATES.location.default;
		response = fillTemplate(pickRandom(templates), vars);
	}
	// Job sector response
	else if (criteria.jobSectors && criteria.jobSectors.length > 0) {
		const sector = criteria.jobSectors[0];
		const templates = TEMPLATES.jobSector[sector as keyof typeof TEMPLATES.jobSector] || TEMPLATES.jobSector.default;
		response = fillTemplate(pickRandom(templates), vars);
	}
	// Budget response
	else if (criteria.maxRent !== undefined) {
		vars.amount = criteria.maxRent;
		response = fillTemplate(pickRandom(TEMPLATES.budget), vars);
	}
	// Hobby response
	else if (criteria.hobbies && criteria.hobbies.length > 0) {
		const hobby = criteria.hobbies[0];
		const templates = TEMPLATES.hobbies[hobby as keyof typeof TEMPLATES.hobbies] || TEMPLATES.hobbies.default;
		response = fillTemplate(pickRandom(templates), vars);
	}
	// Remote work response
	else if (criteria.remoteWork) {
		response = fillTemplate(pickRandom(TEMPLATES.remoteWork), vars);
	}

	// Add narrowing suffix if we reduced the count significantly
	if (previousCount > 0 && matchCount < previousCount && matchCount > 3) {
		if (response) {
			response += ' ' + fillTemplate(pickRandom(TEMPLATES.narrowDown), vars);
		} else {
			response = fillTemplate(pickRandom(TEMPLATES.narrowDown), vars);
		}
	}

	return response || fillTemplate('{count} solutions correspondent à vos critères.', vars);
}

/**
 * Generate a response when no criteria was detected
 */
export function generatePromptResponse(): string {
	return pickRandom(TEMPLATES.noCriteria);
}

/**
 * Generate a response for reset command
 */
export function generateResetResponse(): string {
	return pickRandom(TEMPLATES.reset);
}
