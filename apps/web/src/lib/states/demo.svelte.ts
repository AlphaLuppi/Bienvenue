import type { Solution, FilterCriteria, FilterResult } from '$lib/types/solution';
import { MOCK_SOLUTIONS } from '$lib/data/mock-solutions';

// Deep clone solutions to avoid mutation issues
function cloneSolutions(): Solution[] {
	return MOCK_SOLUTIONS.map((s) => ({
		...s,
		main: { ...s.main },
		sub: {
			housing: { ...s.sub.housing },
			work: { ...s.sub.work },
			hobby: { ...s.sub.hobby }
		},
		attributes: { ...s.attributes, hobbyTypes: [...s.attributes.hobbyTypes] },
		visible: true,
		highlighted: false,
		matchScore: 100
	}));
}

// Create reactive state
export const demoState = $state({
	solutions: cloneSolutions(),
	activeCriteria: {} as FilterCriteria,
	isAnimating: false,
	animationQueue: [] as string[] // IDs of solutions to animate out
});

// Computed getters
export function getVisibleSolutions(): Solution[] {
	return demoState.solutions.filter((s) => s.visible);
}

export function getVisibleCount(): number {
	return demoState.solutions.filter((s) => s.visible).length;
}

export function getHiddenSolutions(): Solution[] {
	return demoState.solutions.filter((s) => !s.visible);
}

// Filter solutions based on criteria
function applyFilterLogic(solutions: Solution[], criteria: FilterCriteria): Solution[] {
	return solutions.map((solution) => {
		let matches = true;
		let score = 100;

		// Location filter (regions or location keywords)
		if (criteria.regions && criteria.regions.length > 0) {
			if (!criteria.regions.includes(solution.attributes.region)) {
				matches = false;
			}
		}

		// Job sector filter
		if (criteria.jobSectors && criteria.jobSectors.length > 0) {
			if (!criteria.jobSectors.includes(solution.attributes.jobSector)) {
				matches = false;
			} else {
				score += 20;
			}
		}

		// Budget filter
		if (criteria.maxRent !== undefined) {
			if (solution.attributes.housingPrice > criteria.maxRent) {
				matches = false;
			} else {
				// Bonus for being under budget
				const savings = criteria.maxRent - solution.attributes.housingPrice;
				score += Math.min(20, savings / 50);
			}
		}

		// Hobbies filter (at least one match required)
		if (criteria.hobbies && criteria.hobbies.length > 0) {
			const hobbyMatches = criteria.hobbies.filter((h) =>
				solution.attributes.hobbyTypes.includes(h)
			);
			if (hobbyMatches.length === 0) {
				matches = false;
			} else {
				score += hobbyMatches.length * 15;
			}
		}

		// City size filter
		if (criteria.citySizes && criteria.citySizes.length > 0) {
			if (!criteria.citySizes.includes(solution.attributes.citySize)) {
				matches = false;
			}
		}

		// Remote work filter
		if (criteria.remoteWork === true && !solution.attributes.remoteWork) {
			score -= 20; // Penalty but not exclusion
		}

		// Climate filter
		if (criteria.climates && criteria.climates.length > 0) {
			if (!criteria.climates.includes(solution.attributes.climate)) {
				matches = false;
			}
		}

		return {
			...solution,
			visible: matches,
			matchScore: matches ? Math.round(score) : 0
		};
	});
}

// Apply filter and return result
export function applyFilter(newCriteria: Partial<FilterCriteria>): FilterResult {
	const previousCount = getVisibleCount();
	const previouslyVisible = getVisibleSolutions().map((s) => s.id);

	// Merge new criteria with existing
	const merged: FilterCriteria = { ...demoState.activeCriteria };

	// Merge arrays (don't replace, accumulate)
	if (newCriteria.regions) {
		merged.regions = [...(merged.regions || []), ...newCriteria.regions];
	}
	if (newCriteria.jobSectors) {
		merged.jobSectors = [...(merged.jobSectors || []), ...newCriteria.jobSectors];
	}
	if (newCriteria.hobbies) {
		merged.hobbies = [...(merged.hobbies || []), ...newCriteria.hobbies];
	}
	if (newCriteria.citySizes) {
		merged.citySizes = [...(merged.citySizes || []), ...newCriteria.citySizes];
	}
	if (newCriteria.climates) {
		merged.climates = [...(merged.climates || []), ...newCriteria.climates];
	}
	if (newCriteria.maxRent !== undefined) {
		merged.maxRent = newCriteria.maxRent;
	}
	if (newCriteria.remoteWork !== undefined) {
		merged.remoteWork = newCriteria.remoteWork;
	}
	if (newCriteria.locationKeywords) {
		merged.locationKeywords = [...(merged.locationKeywords || []), ...newCriteria.locationKeywords];
	}

	demoState.activeCriteria = merged;

	// Apply filter logic
	demoState.solutions = applyFilterLogic(demoState.solutions, merged);

	// Find which solutions to animate out
	const nowVisible = getVisibleSolutions().map((s) => s.id);
	const toHide = previouslyVisible.filter((id) => !nowVisible.includes(id));

	demoState.animationQueue = toHide;
	demoState.isAnimating = toHide.length > 0;

	return {
		previousCount,
		currentCount: getVisibleCount(),
		matchedSolutions: getVisibleSolutions(),
		appliedCriteria: newCriteria
	};
}

// Reset all filters
export function resetFilters(): void {
	demoState.activeCriteria = {};
	demoState.solutions = cloneSolutions();
	demoState.isAnimating = false;
	demoState.animationQueue = [];
}

// Mark animation as complete
export function completeAnimation(): void {
	demoState.isAnimating = false;
	demoState.animationQueue = [];
}

// Highlight specific solutions
export function highlightSolutions(ids: string[]): void {
	demoState.solutions = demoState.solutions.map((s) => ({
		...s,
		highlighted: ids.includes(s.id)
	}));
}

// Clear all highlights
export function clearHighlights(): void {
	demoState.solutions = demoState.solutions.map((s) => ({
		...s,
		highlighted: false
	}));
}
