import type { Solution, JobSector, HobbyType, Region, CitySize, Climate } from '$lib/types/solution';

// City data for generating solutions
interface CityData {
	name: string;
	region: Region;
	lat: number;
	lng: number;
	citySize: CitySize;
	climate: Climate;
	primaryHobbies: HobbyType[];
	primaryJobs: JobSector[];
	baseRent: number;
}

const CITIES: CityData[] = [
	// Ile-de-France
	{ name: 'Paris', region: 'ile-de-france', lat: 48.8566, lng: 2.3522, citySize: 'large-city', climate: 'oceanic', primaryHobbies: ['culture', 'gastronomy'], primaryJobs: ['tech', 'services'], baseRent: 1500 },
	{ name: 'Versailles', region: 'ile-de-france', lat: 48.8014, lng: 2.1301, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'education'], baseRent: 1200 },
	{ name: 'Boulogne-Billancourt', region: 'ile-de-france', lat: 48.8397, lng: 2.2399, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tech', 'services'], baseRent: 1400 },
	{ name: 'Saint-Denis', region: 'ile-de-france', lat: 48.9362, lng: 2.3574, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['manufacturing', 'services'], baseRent: 950 },
	{ name: 'Montreuil', region: 'ile-de-france', lat: 48.8638, lng: 2.4483, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tech', 'services'], baseRent: 1100 },

	// Auvergne-Rhône-Alpes
	{ name: 'Lyon', region: 'auvergne-rhone-alpes', lat: 45.764, lng: 4.8357, citySize: 'large-city', climate: 'continental', primaryHobbies: ['cycling', 'gastronomy', 'culture'], primaryJobs: ['tech', 'healthcare', 'services'], baseRent: 900 },
	{ name: 'Grenoble', region: 'auvergne-rhone-alpes', lat: 45.1885, lng: 5.7245, citySize: 'medium-city', climate: 'mountain', primaryHobbies: ['hiking', 'winter-sports', 'cycling'], primaryJobs: ['tech', 'education'], baseRent: 700 },
	{ name: 'Annecy', region: 'auvergne-rhone-alpes', lat: 45.899, lng: 6.1294, citySize: 'small-town', climate: 'mountain', primaryHobbies: ['hiking', 'winter-sports', 'water-sports'], primaryJobs: ['tourism', 'services'], baseRent: 900 },
	{ name: 'Saint-Étienne', region: 'auvergne-rhone-alpes', lat: 45.4397, lng: 4.3872, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['cycling', 'hiking'], primaryJobs: ['manufacturing', 'services'], baseRent: 550 },
	{ name: 'Clermont-Ferrand', region: 'auvergne-rhone-alpes', lat: 45.7772, lng: 3.087, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['hiking', 'cycling'], primaryJobs: ['manufacturing', 'education'], baseRent: 600 },
	{ name: 'Villeurbanne', region: 'auvergne-rhone-alpes', lat: 45.7676, lng: 4.8799, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tech', 'services'], baseRent: 850 },
	{ name: 'Chambéry', region: 'auvergne-rhone-alpes', lat: 45.5646, lng: 5.9178, citySize: 'small-town', climate: 'mountain', primaryHobbies: ['hiking', 'winter-sports'], primaryJobs: ['tourism', 'services'], baseRent: 700 },
	{ name: 'Valence', region: 'auvergne-rhone-alpes', lat: 44.9334, lng: 4.8924, citySize: 'small-town', climate: 'continental', primaryHobbies: ['cycling', 'gastronomy'], primaryJobs: ['services', 'agriculture'], baseRent: 600 },

	// Provence-Alpes-Côte d'Azur
	{ name: 'Marseille', region: 'provence-alpes-cote-azur', lat: 43.2965, lng: 5.3698, citySize: 'large-city', climate: 'mediterranean', primaryHobbies: ['water-sports', 'culture', 'hiking'], primaryJobs: ['services', 'tourism', 'healthcare'], baseRent: 900 },
	{ name: 'Nice', region: 'provence-alpes-cote-azur', lat: 43.7102, lng: 7.262, citySize: 'large-city', climate: 'mediterranean', primaryHobbies: ['water-sports', 'culture'], primaryJobs: ['tourism', 'tech'], baseRent: 1100 },
	{ name: 'Toulon', region: 'provence-alpes-cote-azur', lat: 43.1242, lng: 5.928, citySize: 'medium-city', climate: 'mediterranean', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['services', 'manufacturing'], baseRent: 750 },
	{ name: 'Aix-en-Provence', region: 'provence-alpes-cote-azur', lat: 43.5297, lng: 5.4474, citySize: 'medium-city', climate: 'mediterranean', primaryHobbies: ['culture', 'hiking', 'gastronomy'], primaryJobs: ['education', 'tech'], baseRent: 950 },
	{ name: 'Avignon', region: 'provence-alpes-cote-azur', lat: 43.9493, lng: 4.8055, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tourism', 'agriculture'], baseRent: 700 },
	{ name: 'Cannes', region: 'provence-alpes-cote-azur', lat: 43.5528, lng: 7.0174, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['water-sports', 'culture'], primaryJobs: ['tourism', 'services'], baseRent: 1200 },
	{ name: 'Antibes', region: 'provence-alpes-cote-azur', lat: 43.5808, lng: 7.1239, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'tech'], baseRent: 1000 },
	{ name: 'Gap', region: 'provence-alpes-cote-azur', lat: 44.5594, lng: 6.0789, citySize: 'small-town', climate: 'mountain', primaryHobbies: ['hiking', 'winter-sports'], primaryJobs: ['services', 'tourism'], baseRent: 600 },

	// Nouvelle-Aquitaine
	{ name: 'Bordeaux', region: 'nouvelle-aquitaine', lat: 44.8378, lng: -0.5792, citySize: 'large-city', climate: 'oceanic', primaryHobbies: ['cycling', 'gastronomy', 'culture'], primaryJobs: ['tech', 'services', 'tourism'], baseRent: 900 },
	{ name: 'Biarritz', region: 'nouvelle-aquitaine', lat: 43.4832, lng: -1.5586, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['tourism', 'services'], baseRent: 1000 },
	{ name: 'Bayonne', region: 'nouvelle-aquitaine', lat: 43.4929, lng: -1.4748, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'gastronomy'], primaryJobs: ['tourism', 'services'], baseRent: 750 },
	{ name: 'Pau', region: 'nouvelle-aquitaine', lat: 43.2951, lng: -0.3708, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['hiking', 'cycling'], primaryJobs: ['services', 'education'], baseRent: 600 },
	{ name: 'La Rochelle', region: 'nouvelle-aquitaine', lat: 46.1591, lng: -1.1519, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'education'], baseRent: 800 },
	{ name: 'Limoges', region: 'nouvelle-aquitaine', lat: 45.8336, lng: 1.2611, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'hiking'], primaryJobs: ['manufacturing', 'services'], baseRent: 550 },
	{ name: 'Poitiers', region: 'nouvelle-aquitaine', lat: 46.5802, lng: 0.3404, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['education', 'services'], baseRent: 550 },
	{ name: 'Angoulême', region: 'nouvelle-aquitaine', lat: 45.6485, lng: 0.1560, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 500 },
	{ name: 'Arcachon', region: 'nouvelle-aquitaine', lat: 44.6608, lng: -1.1681, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 900 },

	// Occitanie
	{ name: 'Toulouse', region: 'occitanie', lat: 43.6047, lng: 1.4442, citySize: 'large-city', climate: 'mediterranean', primaryHobbies: ['cycling', 'culture', 'gastronomy'], primaryJobs: ['tech', 'manufacturing', 'education'], baseRent: 750 },
	{ name: 'Montpellier', region: 'occitanie', lat: 43.6108, lng: 3.8767, citySize: 'medium-city', climate: 'mediterranean', primaryHobbies: ['water-sports', 'culture', 'cycling'], primaryJobs: ['healthcare', 'education', 'tech'], baseRent: 800 },
	{ name: 'Nîmes', region: 'occitanie', lat: 43.8367, lng: 4.3601, citySize: 'medium-city', climate: 'mediterranean', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'tourism'], baseRent: 650 },
	{ name: 'Perpignan', region: 'occitanie', lat: 42.6986, lng: 2.8956, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['agriculture', 'tourism'], baseRent: 600 },
	{ name: 'Béziers', region: 'occitanie', lat: 43.3442, lng: 3.2150, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['water-sports', 'gastronomy'], primaryJobs: ['agriculture', 'tourism'], baseRent: 550 },
	{ name: 'Carcassonne', region: 'occitanie', lat: 43.2130, lng: 2.3491, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['culture', 'hiking'], primaryJobs: ['tourism', 'services'], baseRent: 550 },
	{ name: 'Albi', region: 'occitanie', lat: 43.9298, lng: 2.1480, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'education'], baseRent: 550 },
	{ name: 'Tarbes', region: 'occitanie', lat: 43.2328, lng: 0.0782, citySize: 'small-town', climate: 'mountain', primaryHobbies: ['hiking', 'winter-sports'], primaryJobs: ['services', 'manufacturing'], baseRent: 500 },
	{ name: 'Sète', region: 'occitanie', lat: 43.4075, lng: 3.6976, citySize: 'small-town', climate: 'mediterranean', primaryHobbies: ['water-sports', 'gastronomy'], primaryJobs: ['tourism', 'services'], baseRent: 700 },

	// Bretagne
	{ name: 'Rennes', region: 'bretagne', lat: 48.1173, lng: -1.6778, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['cycling', 'culture'], primaryJobs: ['tech', 'education', 'services'], baseRent: 700 },
	{ name: 'Brest', region: 'bretagne', lat: 48.3904, lng: -4.4861, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['services', 'manufacturing'], baseRent: 550 },
	{ name: 'Saint-Malo', region: 'bretagne', lat: 48.6493, lng: -2.0075, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['tourism', 'services'], baseRent: 700 },
	{ name: 'Vannes', region: 'bretagne', lat: 47.6586, lng: -2.7599, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 650 },
	{ name: 'Lorient', region: 'bretagne', lat: 47.7485, lng: -3.3670, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 550 },
	{ name: 'Quimper', region: 'bretagne', lat: 47.9960, lng: -4.1024, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'culture'], primaryJobs: ['services', 'tourism'], baseRent: 550 },
	{ name: 'Saint-Brieuc', region: 'bretagne', lat: 48.5141, lng: -2.7603, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['services', 'agriculture'], baseRent: 500 },
	{ name: 'Dinard', region: 'bretagne', lat: 48.6321, lng: -2.0674, citySize: 'village', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 750 },

	// Pays de la Loire
	{ name: 'Nantes', region: 'pays-de-la-loire', lat: 47.2184, lng: -1.5536, citySize: 'large-city', climate: 'oceanic', primaryHobbies: ['cycling', 'culture'], primaryJobs: ['tech', 'services', 'manufacturing'], baseRent: 800 },
	{ name: 'Angers', region: 'pays-de-la-loire', lat: 47.4784, lng: -0.5632, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['cycling', 'culture'], primaryJobs: ['services', 'education'], baseRent: 600 },
	{ name: 'Le Mans', region: 'pays-de-la-loire', lat: 48.0061, lng: 0.1996, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['cycling', 'culture'], primaryJobs: ['manufacturing', 'services'], baseRent: 550 },
	{ name: 'Saint-Nazaire', region: 'pays-de-la-loire', lat: 47.2736, lng: -2.2137, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['manufacturing', 'services'], baseRent: 600 },
	{ name: 'La Baule', region: 'pays-de-la-loire', lat: 47.2867, lng: -2.3932, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 850 },
	{ name: 'Les Sables-d\'Olonne', region: 'pays-de-la-loire', lat: 46.4974, lng: -1.7830, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 700 },

	// Grand Est
	{ name: 'Strasbourg', region: 'grand-est', lat: 48.5734, lng: 7.7521, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'gastronomy', 'cycling'], primaryJobs: ['services', 'tech', 'education'], baseRent: 750 },
	{ name: 'Reims', region: 'grand-est', lat: 49.2583, lng: 4.0317, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'gastronomy'], primaryJobs: ['services', 'manufacturing'], baseRent: 600 },
	{ name: 'Metz', region: 'grand-est', lat: 49.1193, lng: 6.1757, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'tech'], baseRent: 600 },
	{ name: 'Nancy', region: 'grand-est', lat: 48.6921, lng: 6.1844, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['education', 'healthcare'], baseRent: 550 },
	{ name: 'Mulhouse', region: 'grand-est', lat: 47.7508, lng: 7.3359, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['manufacturing', 'services'], baseRent: 550 },
	{ name: 'Colmar', region: 'grand-est', lat: 48.0794, lng: 7.3558, citySize: 'small-town', climate: 'continental', primaryHobbies: ['culture', 'gastronomy', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 650 },
	{ name: 'Troyes', region: 'grand-est', lat: 48.2973, lng: 4.0744, citySize: 'small-town', climate: 'continental', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 500 },

	// Hauts-de-France
	{ name: 'Lille', region: 'hauts-de-france', lat: 50.6292, lng: 3.0573, citySize: 'large-city', climate: 'oceanic', primaryHobbies: ['culture', 'gastronomy'], primaryJobs: ['services', 'tech', 'manufacturing'], baseRent: 700 },
	{ name: 'Amiens', region: 'hauts-de-france', lat: 49.8941, lng: 2.2958, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'healthcare'], baseRent: 550 },
	{ name: 'Dunkerque', region: 'hauts-de-france', lat: 51.0343, lng: 2.3768, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['manufacturing', 'services'], baseRent: 500 },
	{ name: 'Calais', region: 'hauts-de-france', lat: 50.9513, lng: 1.8587, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'cycling'], primaryJobs: ['services', 'tourism'], baseRent: 500 },
	{ name: 'Boulogne-sur-Mer', region: 'hauts-de-france', lat: 50.7264, lng: 1.6147, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['services', 'tourism'], baseRent: 500 },
	{ name: 'Valenciennes', region: 'hauts-de-france', lat: 50.3570, lng: 3.5235, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['manufacturing', 'services'], baseRent: 500 },

	// Normandie
	{ name: 'Rouen', region: 'normandie', lat: 49.4432, lng: 1.0993, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 650 },
	{ name: 'Caen', region: 'normandie', lat: 49.1829, lng: -0.3707, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['hiking', 'water-sports', 'culture'], primaryJobs: ['healthcare', 'education', 'services'], baseRent: 600 },
	{ name: 'Le Havre', region: 'normandie', lat: 49.4944, lng: 0.1079, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['water-sports', 'culture'], primaryJobs: ['services', 'manufacturing'], baseRent: 550 },
	{ name: 'Cherbourg', region: 'normandie', lat: 49.6337, lng: -1.6222, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['water-sports', 'hiking'], primaryJobs: ['services', 'manufacturing'], baseRent: 500 },
	{ name: 'Deauville', region: 'normandie', lat: 49.3583, lng: 0.0753, citySize: 'village', climate: 'oceanic', primaryHobbies: ['water-sports', 'culture'], primaryJobs: ['tourism', 'services'], baseRent: 900 },
	{ name: 'Honfleur', region: 'normandie', lat: 49.4186, lng: 0.2332, citySize: 'village', climate: 'oceanic', primaryHobbies: ['culture', 'water-sports'], primaryJobs: ['tourism', 'services'], baseRent: 700 },
	{ name: 'Étretat', region: 'normandie', lat: 49.7069, lng: 0.2059, citySize: 'village', climate: 'oceanic', primaryHobbies: ['hiking', 'water-sports'], primaryJobs: ['tourism', 'services'], baseRent: 650 },

	// Centre-Val de Loire
	{ name: 'Tours', region: 'centre-val-de-loire', lat: 47.3941, lng: 0.6848, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling', 'gastronomy'], primaryJobs: ['education', 'services', 'healthcare'], baseRent: 600 },
	{ name: 'Orléans', region: 'centre-val-de-loire', lat: 47.9029, lng: 1.9039, citySize: 'medium-city', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'education'], baseRent: 600 },
	{ name: 'Bourges', region: 'centre-val-de-loire', lat: 47.0810, lng: 2.3987, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 500 },
	{ name: 'Chartres', region: 'centre-val-de-loire', lat: 48.4469, lng: 1.4890, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['services', 'manufacturing'], baseRent: 550 },
	{ name: 'Blois', region: 'centre-val-de-loire', lat: 47.5861, lng: 1.3359, citySize: 'small-town', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 550 },
	{ name: 'Amboise', region: 'centre-val-de-loire', lat: 47.4133, lng: 0.9822, citySize: 'village', climate: 'oceanic', primaryHobbies: ['culture', 'cycling'], primaryJobs: ['tourism', 'services'], baseRent: 600 },

	// Bourgogne-Franche-Comté
	{ name: 'Dijon', region: 'bourgogne-franche-comte', lat: 47.322, lng: 5.0415, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['cycling', 'gastronomy', 'culture'], primaryJobs: ['services', 'education', 'healthcare'], baseRent: 600 },
	{ name: 'Besançon', region: 'bourgogne-franche-comte', lat: 47.2378, lng: 6.0241, citySize: 'medium-city', climate: 'continental', primaryHobbies: ['hiking', 'culture'], primaryJobs: ['manufacturing', 'education'], baseRent: 550 },
	{ name: 'Auxerre', region: 'bourgogne-franche-comte', lat: 47.7980, lng: 3.5674, citySize: 'small-town', climate: 'continental', primaryHobbies: ['gastronomy', 'cycling'], primaryJobs: ['services', 'agriculture'], baseRent: 500 },
	{ name: 'Beaune', region: 'bourgogne-franche-comte', lat: 47.0260, lng: 4.8400, citySize: 'village', climate: 'continental', primaryHobbies: ['gastronomy', 'cycling'], primaryJobs: ['tourism', 'agriculture'], baseRent: 600 },
	{ name: 'Chalon-sur-Saône', region: 'bourgogne-franche-comte', lat: 46.7806, lng: 4.8536, citySize: 'small-town', climate: 'continental', primaryHobbies: ['cycling', 'culture'], primaryJobs: ['manufacturing', 'services'], baseRent: 500 },
];

// Job titles by sector
const JOB_TITLES: Record<JobSector, string[]> = {
	tech: ['Développeur Full-Stack', 'Data Scientist', 'DevOps Engineer', 'Product Manager', 'UX Designer', 'Ingénieur Cloud', 'Développeur Mobile', 'Tech Lead'],
	healthcare: ['Infirmier(ère)', 'Médecin Généraliste', 'Aide-Soignant(e)', 'Kinésithérapeute', 'Pharmacien(ne)', 'Sage-Femme', 'Radiologue'],
	education: ['Professeur des Écoles', 'Enseignant Collège', 'Professeur Lycée', 'Formateur', 'Directeur d\'École', 'Conseiller Pédagogique'],
	tourism: ['Responsable Hôtelier', 'Guide Touristique', 'Chef de Réception', 'Animateur', 'Responsable Événementiel', 'Agent de Voyage'],
	agriculture: ['Agriculteur Bio', 'Viticulteur', 'Maraîcher', 'Éleveur', 'Technicien Agricole', 'Chef de Culture'],
	manufacturing: ['Ingénieur Production', 'Technicien Maintenance', 'Chef d\'Équipe', 'Opérateur CNC', 'Responsable Qualité', 'Logisticien'],
	services: ['Consultant', 'Chef de Projet', 'Commercial', 'Responsable RH', 'Comptable', 'Chargé de Communication', 'Juriste']
};

// Hobby place names
const HOBBY_PLACES: Record<HobbyType, string[]> = {
	hiking: ['Sentier des Crêtes', 'Randonnée du Lac', 'Circuit Nature', 'Chemin des Vignes', 'Parcours Forestier'],
	cycling: ['Piste Cyclable', 'Véloroute', 'Circuit VTT', 'Voie Verte', 'Boucle des Villages'],
	'water-sports': ['Club Nautique', 'École de Voile', 'Centre Aquatique', 'Spot de Surf', 'Base Nautique'],
	culture: ['Musée Municipal', 'Théâtre', 'Médiathèque', 'Centre Culturel', 'Galerie d\'Art'],
	gastronomy: ['Marché Local', 'Cave à Vins', 'Restaurant Gastronomique', 'Atelier Cuisine', 'Ferme Auberge'],
	'winter-sports': ['Station de Ski', 'Piste de Luge', 'École de Ski', 'Patinoire', 'Domaine Nordique']
};

// Housing types
const HOUSING_NAMES = ['Appartement lumineux', 'Studio moderne', 'T2 rénové', 'T3 spacieux', 'Maison de ville', 'Loft industriel', 'Duplex charme', 'Appartement vue mer', 'Résidence calme', 'Proche transports'];

// Seeded random for consistent generation
function seededRandom(seed: number): () => number {
	return function() {
		seed = (seed * 1103515245 + 12345) & 0x7fffffff;
		return seed / 0x7fffffff;
	};
}

// Generate sub-locations with offset
function generateSubLocations(mainLat: number, mainLng: number, city: string, hobby: HobbyType, job: JobSector, random: () => number) {
	const hobbyPlaces = HOBBY_PLACES[hobby];
	const jobTitles = JOB_TITLES[job];

	return {
		housing: {
			lat: mainLat + (random() * 0.02 - 0.01),
			lng: mainLng + (random() * 0.02 - 0.01),
			title: HOUSING_NAMES[Math.floor(random() * HOUSING_NAMES.length)],
			type: 'housing' as const,
			description: `Logement disponible à ${city}`
		},
		work: {
			lat: mainLat + (random() * 0.02 - 0.01),
			lng: mainLng + (random() * 0.02 - 0.01),
			title: jobTitles[Math.floor(random() * jobTitles.length)],
			type: 'work' as const,
			description: `Poste en CDI à ${city}`
		},
		hobby: {
			lat: mainLat + (random() * 0.02 - 0.01),
			lng: mainLng + (random() * 0.02 - 0.01),
			title: hobbyPlaces[Math.floor(random() * hobbyPlaces.length)],
			type: 'hobby' as const,
			description: `À proximité de ${city}`
		}
	};
}

// Generate 500 solutions
function generateSolutions(): Solution[] {
	const solutions: Solution[] = [];
	const random = seededRandom(42);
	let id = 1;

	// Generate multiple solutions per city with different job/hobby combinations
	for (const city of CITIES) {
		// Each city gets 5-8 solutions with different combinations
		const solutionsPerCity = Math.floor(random() * 4) + 5;

		for (let i = 0; i < solutionsPerCity && solutions.length < 500; i++) {
			// Pick job and hobby (primary or random)
			const usesPrimaryJob = random() > 0.3;
			const usesPrimaryHobby = random() > 0.3;

			const allJobs: JobSector[] = ['tech', 'healthcare', 'education', 'agriculture', 'tourism', 'manufacturing', 'services'];
			const allHobbies: HobbyType[] = ['hiking', 'cycling', 'water-sports', 'culture', 'gastronomy', 'winter-sports'];

			const jobSector = usesPrimaryJob
				? city.primaryJobs[Math.floor(random() * city.primaryJobs.length)]
				: allJobs[Math.floor(random() * allJobs.length)];

			const primaryHobby = usesPrimaryHobby
				? city.primaryHobbies[Math.floor(random() * city.primaryHobbies.length)]
				: allHobbies[Math.floor(random() * allHobbies.length)];

			// Generate 1-3 hobbies
			const hobbyTypes: HobbyType[] = [primaryHobby];
			if (random() > 0.5 && city.primaryHobbies.length > 1) {
				const secondHobby = city.primaryHobbies.find(h => h !== primaryHobby);
				if (secondHobby) hobbyTypes.push(secondHobby);
			}
			if (random() > 0.7) {
				const randomHobby = allHobbies[Math.floor(random() * allHobbies.length)];
				if (!hobbyTypes.includes(randomHobby)) hobbyTypes.push(randomHobby);
			}

			// Vary the rent a bit
			const rentVariation = Math.floor(random() * 300) - 150;
			const rent = Math.max(400, city.baseRent + rentVariation);

			// Vary salary based on job sector
			const baseSalaries: Record<JobSector, number> = {
				tech: 45000,
				healthcare: 38000,
				education: 35000,
				tourism: 28000,
				agriculture: 30000,
				manufacturing: 35000,
				services: 40000
			};
			const salaryVariation = Math.floor(random() * 15000) - 5000;
			const salary = baseSalaries[jobSector] + salaryVariation;

			// Slight position variation for markers
			const latOffset = (random() * 0.1 - 0.05);
			const lngOffset = (random() * 0.1 - 0.05);

			const solution: Solution = {
				id: String(id++),
				name: `${JOB_TITLES[jobSector][Math.floor(random() * JOB_TITLES[jobSector].length)]} à ${city.name}`,
				city: city.name,
				region: city.region,
				main: {
					lat: city.lat + latOffset,
					lng: city.lng + lngOffset,
					title: `Opportunité à ${city.name}`,
					type: 'main'
				},
				sub: generateSubLocations(city.lat + latOffset, city.lng + lngOffset, city.name, primaryHobby, jobSector, random),
				attributes: {
					region: city.region,
					citySize: city.citySize,
					climate: city.climate,
					jobSector,
					salary,
					remoteWork: jobSector === 'tech' ? random() > 0.3 : random() > 0.7,
					housingPrice: rent,
					housingType: random() > 0.7 ? 'house' : random() > 0.4 ? 'apartment' : 'studio',
					housingSize: Math.floor(random() * 60) + 25,
					hobbyTypes
				},
				visible: true,
				highlighted: false,
				matchScore: 100
			};

			solutions.push(solution);
		}
	}

	return solutions;
}

export const MOCK_SOLUTIONS: Solution[] = generateSolutions();
