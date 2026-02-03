import type { LocationData, ChatMessage } from '$lib/types/map';

export const mapState = $state({
	isExpanded: false,
	isVisible: true,
	solutionData: {
		main: {
			lat: 47.081,
			lng: 2.3987,
			id: '1',
			title: 'Opportunité à Bourges',
			type: 'main' as const
		},
		sub: {
			housing: {
				lat: 47.085,
				lng: 2.3967,
				title: 'Logement disponible',
				type: 'housing' as const
			},
			hobby: {
				lat: 47.083,
				lng: 2.4007,
				title: 'Club de sport',
				type: 'hobby' as const
			},
			work: {
				lat: 47.079,
				lng: 2.3957,
				title: "Offre d'emploi",
				type: 'work' as const
			}
		}
	}
});
