import type { FilterCriteria, JobSector, HobbyType, Region } from '$lib/types/solution';

// Location keywords - multiple French words trigger the same regions
const LOCATION_KEYWORDS: Record<string, Region[]> = {
	// Sud de la France
	sud: ['provence-alpes-cote-azur', 'occitanie', 'nouvelle-aquitaine'],
	midi: ['provence-alpes-cote-azur', 'occitanie'],
	méditerranée: ['provence-alpes-cote-azur', 'occitanie'],
	mediterranee: ['provence-alpes-cote-azur', 'occitanie'],
	soleil: ['provence-alpes-cote-azur', 'occitanie', 'nouvelle-aquitaine'],
	chaleur: ['provence-alpes-cote-azur', 'occitanie'],
	provence: ['provence-alpes-cote-azur'],
	côte: ['provence-alpes-cote-azur', 'nouvelle-aquitaine', 'bretagne'],
	cote: ['provence-alpes-cote-azur', 'nouvelle-aquitaine', 'bretagne'],
	'côte d\'azur': ['provence-alpes-cote-azur'],
	riviera: ['provence-alpes-cote-azur'],
	paca: ['provence-alpes-cote-azur'],

	// Nord de la France
	nord: ['hauts-de-france', 'grand-est'],
	hauts: ['hauts-de-france'],
	flandre: ['hauts-de-france'],
	picardie: ['hauts-de-france'],
	champagne: ['grand-est'],

	// Ouest de la France
	ouest: ['bretagne', 'pays-de-la-loire', 'normandie'],
	bretagne: ['bretagne'],
	breton: ['bretagne'],
	finistère: ['bretagne'],
	finistere: ['bretagne'],
	morbihan: ['bretagne'],
	normandie: ['normandie'],
	normand: ['normandie'],
	calvados: ['normandie'],
	loire: ['pays-de-la-loire', 'centre-val-de-loire'],
	atlantique: ['pays-de-la-loire', 'nouvelle-aquitaine', 'bretagne'],

	// Est de la France
	est: ['grand-est', 'bourgogne-franche-comte'],
	alsace: ['grand-est'],
	lorraine: ['grand-est'],
	vosges: ['grand-est'],
	bourgogne: ['bourgogne-franche-comte'],
	franche: ['bourgogne-franche-comte'],
	jura: ['bourgogne-franche-comte'],

	// Montagne
	montagne: ['auvergne-rhone-alpes'],
	montagnes: ['auvergne-rhone-alpes'],
	alpes: ['auvergne-rhone-alpes', 'provence-alpes-cote-azur'],
	alpine: ['auvergne-rhone-alpes'],
	altitude: ['auvergne-rhone-alpes'],
	pyrénées: ['occitanie', 'nouvelle-aquitaine'],
	pyrenees: ['occitanie', 'nouvelle-aquitaine'],
	massif: ['auvergne-rhone-alpes'],
	auvergne: ['auvergne-rhone-alpes'],
	savoie: ['auvergne-rhone-alpes'],
	rhône: ['auvergne-rhone-alpes'],
	rhone: ['auvergne-rhone-alpes'],

	// Mer / Océan
	mer: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine', 'normandie', 'occitanie'],
	océan: ['bretagne', 'nouvelle-aquitaine', 'pays-de-la-loire'],
	ocean: ['bretagne', 'nouvelle-aquitaine', 'pays-de-la-loire'],
	plage: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine', 'occitanie'],
	plages: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine', 'occitanie'],
	littoral: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine', 'normandie'],
	bord: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine'],
	maritime: ['bretagne', 'nouvelle-aquitaine', 'normandie'],
	côtier: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine'],
	cotier: ['provence-alpes-cote-azur', 'bretagne', 'nouvelle-aquitaine'],

	// Ile-de-France / Paris
	paris: ['ile-de-france'],
	parisien: ['ile-de-france'],
	parisienne: ['ile-de-france'],
	'ile-de-france': ['ile-de-france'],
	'île-de-france': ['ile-de-france'],
	idf: ['ile-de-france'],
	capitale: ['ile-de-france'],
	banlieue: ['ile-de-france'],

	// Villes spécifiques
	lyon: ['auvergne-rhone-alpes'],
	lyonnais: ['auvergne-rhone-alpes'],
	marseille: ['provence-alpes-cote-azur'],
	marseillais: ['provence-alpes-cote-azur'],
	bordeaux: ['nouvelle-aquitaine'],
	bordelais: ['nouvelle-aquitaine'],
	toulouse: ['occitanie'],
	toulousain: ['occitanie'],
	nantes: ['pays-de-la-loire'],
	nantais: ['pays-de-la-loire'],
	nice: ['provence-alpes-cote-azur'],
	niçois: ['provence-alpes-cote-azur'],
	nicois: ['provence-alpes-cote-azur'],
	strasbourg: ['grand-est'],
	strasbourgeois: ['grand-est'],
	lille: ['hauts-de-france'],
	lillois: ['hauts-de-france'],
	rennes: ['bretagne'],
	rennais: ['bretagne'],
	montpellier: ['occitanie'],
	montpelliérain: ['occitanie'],
	grenoble: ['auvergne-rhone-alpes'],
	grenoblois: ['auvergne-rhone-alpes'],
	annecy: ['auvergne-rhone-alpes'],
	dijon: ['bourgogne-franche-comte'],
	dijonnais: ['bourgogne-franche-comte'],
	tours: ['centre-val-de-loire'],
	tourangeau: ['centre-val-de-loire'],
	orléans: ['centre-val-de-loire'],
	orleans: ['centre-val-de-loire'],

	// Régions par climat/ambiance
	campagne: ['centre-val-de-loire', 'bourgogne-franche-comte', 'normandie'],
	rural: ['centre-val-de-loire', 'bourgogne-franche-comte', 'nouvelle-aquitaine'],
	vert: ['bretagne', 'normandie', 'pays-de-la-loire'],
	verdure: ['bretagne', 'normandie', 'pays-de-la-loire'],
	nature: ['auvergne-rhone-alpes', 'bretagne', 'nouvelle-aquitaine'],
	tranquille: ['centre-val-de-loire', 'bourgogne-franche-comte', 'normandie'],
	calme: ['centre-val-de-loire', 'bourgogne-franche-comte', 'normandie'],
	doux: ['nouvelle-aquitaine', 'bretagne', 'pays-de-la-loire'],
	tempéré: ['bretagne', 'normandie', 'pays-de-la-loire'],
	tempere: ['bretagne', 'normandie', 'pays-de-la-loire']
};

// Job sector keywords - French terms
const JOB_KEYWORDS: Record<string, JobSector> = {
	// Tech / Informatique
	tech: 'tech',
	technologie: 'tech',
	informatique: 'tech',
	info: 'tech',
	développeur: 'tech',
	developpeur: 'tech',
	dev: 'tech',
	programmeur: 'tech',
	programmation: 'tech',
	software: 'tech',
	logiciel: 'tech',
	digital: 'tech',
	numérique: 'tech',
	numerique: 'tech',
	web: 'tech',
	internet: 'tech',
	startup: 'tech',
	'start-up': 'tech',
	data: 'tech',
	données: 'tech',
	donnees: 'tech',
	intelligence: 'tech',
	ia: 'tech',
	cloud: 'tech',
	cyber: 'tech',
	sécurité: 'tech',
	securite: 'tech',
	réseau: 'tech',
	reseau: 'tech',
	ingénieur: 'tech',
	ingenieur: 'tech',
	code: 'tech',
	coder: 'tech',
	coding: 'tech',

	// Santé
	santé: 'healthcare',
	sante: 'healthcare',
	médical: 'healthcare',
	medical: 'healthcare',
	médecin: 'healthcare',
	medecin: 'healthcare',
	docteur: 'healthcare',
	hôpital: 'healthcare',
	hopital: 'healthcare',
	clinique: 'healthcare',
	infirmier: 'healthcare',
	infirmière: 'healthcare',
	infirmiere: 'healthcare',
	soignant: 'healthcare',
	soins: 'healthcare',
	patient: 'healthcare',
	pharmacie: 'healthcare',
	pharmacien: 'healthcare',
	kiné: 'healthcare',
	kine: 'healthcare',
	kinésithérapeute: 'healthcare',
	dentiste: 'healthcare',
	sage: 'healthcare',
	aide: 'healthcare',
	paramédical: 'healthcare',
	paramedical: 'healthcare',
	laboratoire: 'healthcare',
	labo: 'healthcare',

	// Éducation
	éducation: 'education',
	education: 'education',
	enseignement: 'education',
	enseignant: 'education',
	professeur: 'education',
	prof: 'education',
	école: 'education',
	ecole: 'education',
	collège: 'education',
	college: 'education',
	lycée: 'education',
	lycee: 'education',
	université: 'education',
	universite: 'education',
	fac: 'education',
	faculté: 'education',
	formation: 'education',
	formateur: 'education',
	formatrice: 'education',
	pédagogie: 'education',
	pedagogie: 'education',
	instituteur: 'education',
	institutrice: 'education',
	maître: 'education',
	maitre: 'education',
	directeur: 'education',
	académie: 'education',
	academie: 'education',
	scolaire: 'education',
	étudiant: 'education',
	etudiant: 'education',

	// Tourisme
	tourisme: 'tourism',
	touristique: 'tourism',
	hôtel: 'tourism',
	hotel: 'tourism',
	hôtellerie: 'tourism',
	hotellerie: 'tourism',
	restaurant: 'tourism',
	restauration: 'tourism',
	cuisine: 'tourism',
	cuisinier: 'tourism',
	chef: 'tourism',
	serveur: 'tourism',
	serveuse: 'tourism',
	voyage: 'tourism',
	voyagiste: 'tourism',
	agence: 'tourism',
	guide: 'tourism',
	réception: 'tourism',
	reception: 'tourism',
	accueil: 'tourism',
	animation: 'tourism',
	animateur: 'tourism',
	animatrice: 'tourism',
	loisirs: 'tourism',
	vacances: 'tourism',
	hébergement: 'tourism',
	hebergement: 'tourism',
	camping: 'tourism',
	saisonnier: 'tourism',

	// Agriculture
	agriculture: 'agriculture',
	agricole: 'agriculture',
	agriculteur: 'agriculture',
	ferme: 'agriculture',
	fermier: 'agriculture',
	paysan: 'agriculture',
	élevage: 'agriculture',
	elevage: 'agriculture',
	éleveur: 'agriculture',
	eleveur: 'agriculture',
	culture: 'agriculture',
	cultivateur: 'agriculture',
	vigne: 'agriculture',
	vignoble: 'agriculture',
	viticulteur: 'agriculture',
	viticole: 'agriculture',
	vin: 'agriculture',
	bio: 'agriculture',
	biologique: 'agriculture',
	maraîcher: 'agriculture',
	maraicher: 'agriculture',
	légume: 'agriculture',
	legume: 'agriculture',
	fruit: 'agriculture',
	récolte: 'agriculture',
	recolte: 'agriculture',
	tracteur: 'agriculture',
	champ: 'agriculture',
	terre: 'agriculture',
	exploitation: 'agriculture',

	// Industrie / Manufacturing
	industrie: 'manufacturing',
	industriel: 'manufacturing',
	usine: 'manufacturing',
	production: 'manufacturing',
	fabrication: 'manufacturing',
	manufacture: 'manufacturing',
	ouvrier: 'manufacturing',
	technicien: 'manufacturing',
	maintenance: 'manufacturing',
	mécanique: 'manufacturing',
	mecanique: 'manufacturing',
	mécanicien: 'manufacturing',
	mecanicien: 'manufacturing',
	électricien: 'manufacturing',
	electricien: 'manufacturing',
	soudeur: 'manufacturing',
	opérateur: 'manufacturing',
	operateur: 'manufacturing',
	logistique: 'manufacturing',
	entrepôt: 'manufacturing',
	entrepot: 'manufacturing',
	magasinier: 'manufacturing',
	cariste: 'manufacturing',
	chaîne: 'manufacturing',
	chaine: 'manufacturing',
	qualité: 'manufacturing',
	qualite: 'manufacturing',
	btp: 'manufacturing',
	bâtiment: 'manufacturing',
	batiment: 'manufacturing',
	construction: 'manufacturing',
	chantier: 'manufacturing',

	// Services
	services: 'services',
	service: 'services',
	conseil: 'services',
	consultant: 'services',
	consulting: 'services',
	commerce: 'services',
	commercial: 'services',
	commerciale: 'services',
	vente: 'services',
	vendeur: 'services',
	vendeuse: 'services',
	marketing: 'services',
	communication: 'services',
	publicité: 'services',
	publicite: 'services',
	banque: 'services',
	bancaire: 'services',
	finance: 'services',
	financier: 'services',
	assurance: 'services',
	comptable: 'services',
	comptabilité: 'services',
	comptabilite: 'services',
	juridique: 'services',
	avocat: 'services',
	notaire: 'services',
	rh: 'services',
	ressources: 'services',
	recrutement: 'services',
	administration: 'services',
	administratif: 'services',
	secrétaire: 'services',
	secretaire: 'services',
	assistant: 'services',
	assistante: 'services',
	bureau: 'services',
	immobilier: 'services',
	agent: 'services'
};

// Hobby keywords - French terms
const HOBBY_KEYWORDS: Record<string, HobbyType> = {
	// Randonnée
	randonnée: 'hiking',
	randonnee: 'hiking',
	rando: 'hiking',
	randonneur: 'hiking',
	marche: 'hiking',
	marcher: 'hiking',
	sentier: 'hiking',
	sentiers: 'hiking',
	trek: 'hiking',
	trekking: 'hiking',
	balade: 'hiking',
	balades: 'hiking',
	promenade: 'hiking',
	chemin: 'hiking',
	chemins: 'hiking',
	forêt: 'hiking',
	foret: 'hiking',
	bois: 'hiking',
	montagne: 'hiking',
	sommet: 'hiking',
	grimpée: 'hiking',
	grimpee: 'hiking',
	escalade: 'hiking',
	alpinisme: 'hiking',
	nature: 'hiking',
	plein: 'hiking',
	outdoor: 'hiking',

	// Vélo / Cyclisme
	vélo: 'cycling',
	velo: 'cycling',
	bicyclette: 'cycling',
	cyclisme: 'cycling',
	cycliste: 'cycling',
	cycle: 'cycling',
	pédaler: 'cycling',
	pedaler: 'cycling',
	vtt: 'cycling',
	route: 'cycling',
	piste: 'cycling',
	tour: 'cycling',
	course: 'cycling',
	gravel: 'cycling',
	bike: 'cycling',

	// Sports nautiques
	mer: 'water-sports',
	marin: 'water-sports',
	maritime: 'water-sports',
	nautique: 'water-sports',
	nautisme: 'water-sports',
	bateau: 'water-sports',
	voile: 'water-sports',
	voilier: 'water-sports',
	navigation: 'water-sports',
	naviguer: 'water-sports',
	surf: 'water-sports',
	surfeur: 'water-sports',
	planche: 'water-sports',
	kite: 'water-sports',
	kitesurf: 'water-sports',
	paddle: 'water-sports',
	kayak: 'water-sports',
	canoë: 'water-sports',
	canoe: 'water-sports',
	plongée: 'water-sports',
	plongee: 'water-sports',
	nager: 'water-sports',
	natation: 'water-sports',
	piscine: 'water-sports',
	baignade: 'water-sports',
	plage: 'water-sports',
	océan: 'water-sports',
	ocean: 'water-sports',
	lac: 'water-sports',
	rivière: 'water-sports',
	riviere: 'water-sports',
	pêche: 'water-sports',
	peche: 'water-sports',
	pêcheur: 'water-sports',
	pecheur: 'water-sports',

	// Culture
	culture: 'culture',
	culturel: 'culture',
	culturelle: 'culture',
	musée: 'culture',
	musee: 'culture',
	musées: 'culture',
	exposition: 'culture',
	expo: 'culture',
	galerie: 'culture',
	art: 'culture',
	artiste: 'culture',
	artistique: 'culture',
	peinture: 'culture',
	sculpture: 'culture',
	théâtre: 'culture',
	theatre: 'culture',
	spectacle: 'culture',
	concert: 'culture',
	concerts: 'culture',
	musique: 'culture',
	musical: 'culture',
	opéra: 'culture',
	opera: 'culture',
	cinéma: 'culture',
	cinema: 'culture',
	film: 'culture',
	films: 'culture',
	lecture: 'culture',
	livre: 'culture',
	livres: 'culture',
	bibliothèque: 'culture',
	bibliotheque: 'culture',
	médiathèque: 'culture',
	mediatheque: 'culture',
	histoire: 'culture',
	historique: 'culture',
	patrimoine: 'culture',
	monument: 'culture',
	château: 'culture',
	chateau: 'culture',
	cathédrale: 'culture',
	cathedrale: 'culture',
	église: 'culture',
	eglise: 'culture',
	festival: 'culture',
	festivals: 'culture',

	// Gastronomie
	gastronomie: 'gastronomy',
	gastronomique: 'gastronomy',
	cuisine: 'gastronomy',
	culinaire: 'gastronomy',
	restaurant: 'gastronomy',
	restaurants: 'gastronomy',
	manger: 'gastronomy',
	gourmand: 'gastronomy',
	gourmet: 'gastronomy',
	saveur: 'gastronomy',
	saveurs: 'gastronomy',
	goût: 'gastronomy',
	gout: 'gastronomy',
	vin: 'gastronomy',
	vins: 'gastronomy',
	oenologie: 'gastronomy',
	œnologie: 'gastronomy',
	dégustation: 'gastronomy',
	degustation: 'gastronomy',
	cave: 'gastronomy',
	caves: 'gastronomy',
	vignoble: 'gastronomy',
	fromage: 'gastronomy',
	fromages: 'gastronomy',
	terroir: 'gastronomy',
	local: 'gastronomy',
	locaux: 'gastronomy',
	marché: 'gastronomy',
	marche: 'gastronomy',
	produit: 'gastronomy',
	produits: 'gastronomy',
	bio: 'gastronomy',
	chef: 'gastronomy',
	recette: 'gastronomy',
	recettes: 'gastronomy',
	pâtisserie: 'gastronomy',
	patisserie: 'gastronomy',
	boulangerie: 'gastronomy',
	épicerie: 'gastronomy',
	epicerie: 'gastronomy',

	// Sports d'hiver
	ski: 'winter-sports',
	skier: 'winter-sports',
	skieur: 'winter-sports',
	snowboard: 'winter-sports',
	snow: 'winter-sports',
	neige: 'winter-sports',
	hiver: 'winter-sports',
	hivernal: 'winter-sports',
	station: 'winter-sports',
	piste: 'winter-sports',
	pistes: 'winter-sports',
	téléski: 'winter-sports',
	teleski: 'winter-sports',
	télésiège: 'winter-sports',
	telesiege: 'winter-sports',
	remontée: 'winter-sports',
	remontee: 'winter-sports',
	luge: 'winter-sports',
	raquettes: 'winter-sports',
	raquette: 'winter-sports',
	nordique: 'winter-sports',
	fond: 'winter-sports',
	patinage: 'winter-sports',
	patiner: 'winter-sports',
	glace: 'winter-sports',
	glacier: 'winter-sports',
	alpin: 'winter-sports',
	altitude: 'winter-sports'
};

// Budget patterns - various French ways to express budget
const BUDGET_PATTERNS = [
	/budget\s*(de|d')?\s*(\d+)\s*€?/i,
	/budget\s*(max|maximum|maxi)?\s*:?\s*(\d+)/i,
	/loyer\s*(de|d')?\s*(\d+)\s*€?/i,
	/loyer\s*(max|maximum|maxi|moins\s*de|sous|inférieur|inferieur)?\s*:?\s*(\d+)/i,
	/moins\s*de\s*(\d+)\s*€?\s*(par\s*mois|\/\s*mois|euros?|mensuel)?/i,
	/max(?:imum|i)?\s*(\d+)\s*€?/i,
	/(\d+)\s*€\s*(max|maximum|maxi|par\s*mois)?/i,
	/sous\s*(?:les?)?\s*(\d+)\s*€?/i,
	/pas\s*plus\s*(?:de|d')?\s*(\d+)/i,
	/jusqu'à\s*(\d+)/i,
	/jusqua\s*(\d+)/i,
	/environ\s*(\d+)/i,
	/autour\s*(?:de|d')?\s*(\d+)/i,
	/(\d+)\s*euros?\s*(max|maximum|mensuel|par\s*mois)?/i
];

// Remote work keywords
const REMOTE_KEYWORDS = [
	'télétravail',
	'teletravail',
	'remote',
	'distance',
	'domicile',
	'maison',
	'home',
	'hybride',
	'flexible',
	'distanciel',
	'bureau à domicile',
	'travail à distance',
	'travail a distance',
	'depuis chez moi',
	'chez moi'
];

// Reset command keywords
const RESET_KEYWORDS = [
	'recommencer',
	'recommence',
	'reset',
	'réinitialiser',
	'reinitialiser',
	'tout afficher',
	'tout montrer',
	'annuler',
	'effacer',
	'repartir',
	'restart',
	'début',
	'debut',
	'nouvelle recherche',
	'refaire',
	'recommençons',
	'recommencons',
	'on recommence',
	'revoir tout',
	'toutes les solutions',
	'tout voir',
	'supprimer filtres',
	'enlever filtres',
	'retirer filtres',
	'sans filtre'
];

// Normalize text for comparison (remove accents, lowercase)
function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

// Check if word appears in text (word boundary aware)
function containsWord(text: string, word: string): boolean {
	const normalizedText = normalizeText(text);
	const normalizedWord = normalizeText(word);

	// For short words, require word boundaries
	if (normalizedWord.length <= 3) {
		const regex = new RegExp(`\\b${normalizedWord}\\b`, 'i');
		return regex.test(normalizedText);
	}

	// For longer words, simple includes is fine
	return normalizedText.includes(normalizedWord);
}

/**
 * Parse user message to extract filter criteria
 */
export function parseUserMessage(message: string): Partial<FilterCriteria> {
	const criteria: Partial<FilterCriteria> = {};
	const lowerMessage = message.toLowerCase();

	// Extract locations
	const matchedRegions = new Set<Region>();
	for (const [keyword, regions] of Object.entries(LOCATION_KEYWORDS)) {
		if (containsWord(lowerMessage, keyword)) {
			regions.forEach((r) => matchedRegions.add(r));
		}
	}
	if (matchedRegions.size > 0) {
		criteria.regions = Array.from(matchedRegions);
	}

	// Extract job sectors
	const matchedJobs = new Set<JobSector>();
	for (const [keyword, sector] of Object.entries(JOB_KEYWORDS)) {
		if (containsWord(lowerMessage, keyword)) {
			matchedJobs.add(sector);
		}
	}
	if (matchedJobs.size > 0) {
		criteria.jobSectors = Array.from(matchedJobs);
	}

	// Extract hobbies
	const matchedHobbies = new Set<HobbyType>();
	for (const [keyword, hobby] of Object.entries(HOBBY_KEYWORDS)) {
		if (containsWord(lowerMessage, keyword)) {
			matchedHobbies.add(hobby);
		}
	}
	if (matchedHobbies.size > 0) {
		criteria.hobbies = Array.from(matchedHobbies);
	}

	// Extract budget
	for (const pattern of BUDGET_PATTERNS) {
		const match = message.match(pattern);
		if (match) {
			// Find the numeric group (could be group 1 or 2 depending on pattern)
			const amount = parseInt(match[2] || match[1]);
			if (!isNaN(amount) && amount > 0 && amount < 10000) {
				criteria.maxRent = amount;
				break;
			}
		}
	}

	// Check for remote work
	for (const keyword of REMOTE_KEYWORDS) {
		if (containsWord(lowerMessage, keyword)) {
			criteria.remoteWork = true;
			break;
		}
	}

	return criteria;
}

/**
 * Check if message is a reset command
 */
export function isResetCommand(message: string): boolean {
	const lowerMessage = message.toLowerCase();
	return RESET_KEYWORDS.some((keyword) => containsWord(lowerMessage, keyword));
}

/**
 * Get a human-readable description of the criteria
 */
export function describeCriteria(criteria: Partial<FilterCriteria>): string[] {
	const descriptions: string[] = [];

	if (criteria.regions && criteria.regions.length > 0) {
		descriptions.push(`région: ${criteria.regions.join(', ')}`);
	}
	if (criteria.jobSectors && criteria.jobSectors.length > 0) {
		descriptions.push(`secteur: ${criteria.jobSectors.join(', ')}`);
	}
	if (criteria.maxRent) {
		descriptions.push(`budget: ${criteria.maxRent}€/mois`);
	}
	if (criteria.hobbies && criteria.hobbies.length > 0) {
		descriptions.push(`loisirs: ${criteria.hobbies.join(', ')}`);
	}
	if (criteria.remoteWork) {
		descriptions.push('télétravail');
	}

	return descriptions;
}
