import type { MarkerType } from './map';

export type JobSector = 'tech' | 'healthcare' | 'education' | 'agriculture' | 'tourism' | 'manufacturing' | 'services';
export type HobbyType = 'hiking' | 'cycling' | 'water-sports' | 'culture' | 'gastronomy' | 'winter-sports';
export type CitySize = 'village' | 'small-town' | 'medium-city' | 'large-city';
export type Climate = 'oceanic' | 'continental' | 'mediterranean' | 'mountain';
export type Region = 'ile-de-france' | 'auvergne-rhone-alpes' | 'provence-alpes-cote-azur' | 'nouvelle-aquitaine' | 'occitanie' | 'bretagne' | 'pays-de-la-loire' | 'grand-est' | 'hauts-de-france' | 'normandie' | 'centre-val-de-loire' | 'bourgogne-franche-comte';

export interface SolutionAttributes {
	// Location
	region: Region;
	citySize: CitySize;
	climate: Climate;

	// Work-related
	jobSector: JobSector;
	salary: number; // annual in euros
	remoteWork: boolean;

	// Housing-related
	housingPrice: number; // monthly rent in euros
	housingType: 'apartment' | 'house' | 'studio';
	housingSize: number; // m2

	// Lifestyle
	hobbyTypes: HobbyType[];
}

export interface SubLocation {
	lat: number;
	lng: number;
	title: string;
	type: MarkerType;
	description?: string;
	price?: number;
	details?: Record<string, string | number>;
}

export interface Solution {
	id: string;
	name: string;
	city: string;
	region: Region;
	main: {
		lat: number;
		lng: number;
		title: string;
		type: 'main';
	};
	sub: {
		housing: SubLocation;
		work: SubLocation;
		hobby: SubLocation;
	};
	attributes: SolutionAttributes;
	visible: boolean;
	highlighted: boolean;
	matchScore: number;
}

export interface FilterCriteria {
	regions?: Region[];
	locationKeywords?: string[]; // "sud", "nord", "montagne", etc.
	jobSectors?: JobSector[];
	maxRent?: number;
	hobbies?: HobbyType[];
	citySizes?: CitySize[];
	remoteWork?: boolean;
	climates?: Climate[];
}

export interface FilterResult {
	previousCount: number;
	currentCount: number;
	matchedSolutions: Solution[];
	appliedCriteria: Partial<FilterCriteria>;
}
