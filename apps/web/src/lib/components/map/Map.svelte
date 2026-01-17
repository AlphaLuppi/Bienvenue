<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Map as LeafletMap, Marker as LeafletMarker, DivIcon, Polyline } from 'leaflet';
	import { demoState, completeAnimation, getVisibleSolutions } from '$lib/states/demo.svelte';
	import type { Solution } from '$lib/types/solution';
	import type { MarkerType } from '$lib/types/map';
	import HousingCard from '$lib/components/ui/housing-card/housing-card.svelte';
	import SolutionToolbar from '$lib/components/map/SolutionToolbar.svelte';

	let { center, zoom } = $props<{
		center: [number, number];
		zoom: number;
	}>();

	let map: LeafletMap;
	let L: any;
	let markerClusterGroup: any; // MarkerClusterGroup

	// Track markers by solution ID
	let mainMarkers: Map<string, LeafletMarker> = new Map();
	let subMarkers: Map<string, LeafletMarker[]> = new Map();
	let connectionLines: Polyline[] = [];

	// Currently expanded solution
	let expandedSolutionId = $state<string | null>(null);

	// Popover state
	let activeLocation = $state<{ type: MarkerType; title: string; solutionId: string } | null>(null);
	let popoverPosition = $state<{ x: number; y: number } | null>(null);
	let activeMarkerLatLng = $state<L.LatLng | null>(null);

	const ZOOM_THRESHOLD = 10;

	// Marker styling for sub-markers (housing, work, hobby)
	const subMarkerClasses: Record<Exclude<MarkerType, 'main'>, string> = {
		housing:
			'w-8 h-8 rounded-full bg-green-500 border-2 border-green-700 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110',
		hobby:
			'w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-700 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110',
		work: 'w-8 h-8 rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110'
	};

	// Sub-marker emojis
	const SUB_MARKER_EMOJI: Record<Exclude<MarkerType, 'main'>, string> = {
		housing: '🏠',
		work: '💼',
		hobby: '🎨'
	};

	// Create simple dot icon for main solution markers
	function createMainIcon(isHighlighted = false): DivIcon {
		const highlightClass = isHighlighted ? 'marker-highlight' : '';
		const baseClasses = 'w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-700 shadow-md transition-all duration-300 hover:scale-125';
		return L.divIcon({
			className: `custom-marker main ${highlightClass}`,
			html: `<div class="${baseClasses}"></div>`,
			iconSize: [16, 16],
			iconAnchor: [8, 8]
		});
	}

	// Create icon for sub-markers (housing, work, hobby)
	function createSubIcon(type: Exclude<MarkerType, 'main'>, isHighlighted = false): DivIcon {
		const highlightClass = isHighlighted ? 'marker-highlight' : '';
		const emoji = SUB_MARKER_EMOJI[type];
		return L.divIcon({
			className: `custom-marker ${type} ${highlightClass}`,
			html: `<div class="${subMarkerClasses[type]}"><span class="text-base">${emoji}</span></div>`,
			iconSize: [32, 32],
			iconAnchor: [16, 32]
		});
	}

	// Handle filtering
	async function handleFilterAnimation(): Promise<void> {
		if (!demoState.isAnimating || !map || !markerClusterGroup) return;

		const toHide = demoState.animationQueue;

		// Collapse any expanded solution first
		if (expandedSolutionId) {
			collapseExpanded();
		}

		// Remove non-matching markers from cluster
		for (const solutionId of toHide) {
			const marker = mainMarkers.get(solutionId);
			if (marker) {
				markerClusterGroup.removeLayer(marker);
			}
		}

		// Fit bounds to visible markers
		const visibleSolutions = getVisibleSolutions();
		if (visibleSolutions.length > 0) {
			const bounds = L.latLngBounds(visibleSolutions.map((s) => [s.main.lat, s.main.lng]));
			map.flyToBounds(bounds.pad(0.2), {
				duration: 0.8,
				easeLinearity: 0.5
			});
		}

		completeAnimation();
	}

	// Watch for animation triggers
	$effect(() => {
		if (demoState.isAnimating) {
			handleFilterAnimation();
		}
	});

	// Expand a solution to show sub-markers
	function expandSolution(solution: Solution): void {
		if (expandedSolutionId === solution.id) return;

		// Collapse previous if any
		if (expandedSolutionId) {
			collapseExpanded();
		}

		expandedSolutionId = solution.id;

		// Hide the main marker from the cluster
		const mainMarker = mainMarkers.get(solution.id);
		if (mainMarker && markerClusterGroup) {
			markerClusterGroup.removeLayer(mainMarker);
		}

		// Create and add sub-markers
		const subs: LeafletMarker[] = [];
		const subLocations = [
			{ ...solution.sub.housing, type: 'housing' as const },
			{ ...solution.sub.work, type: 'work' as const },
			{ ...solution.sub.hobby, type: 'hobby' as const }
		];

		for (const loc of subLocations) {
			const icon = createSubIcon(loc.type);
			const marker = L.marker([loc.lat, loc.lng], { icon })
				.addTo(map)
				.on('click', (e: L.LeafletMouseEvent) => {
					activeMarkerLatLng = e.latlng;
					updatePopoverPosition();
					activeLocation = { type: loc.type, title: loc.title, solutionId: solution.id };
				});
			subs.push(marker);
		}

		subMarkers.set(solution.id, subs);

		// Add connecting lines between all 3 sub-markers (triangle)
		const coords: [number, number][] = subLocations.map((l) => [l.lat, l.lng]);

		// Connect: housing -> work -> hobby -> housing (triangle)
		const triangleLine = L.polyline([coords[0], coords[1], coords[2], coords[0]], {
			color: '#000000',
			weight: 2,
			opacity: 0.8
		}).addTo(map);
		connectionLines.push(triangleLine);

		// Fit bounds to show all sub-markers
		const bounds = L.latLngBounds(coords);
		map.flyToBounds(bounds.pad(0.3), {
			duration: 0.5,
			easeLinearity: 0.5
		});
	}

	// Collapse expanded solution
	function collapseExpanded(): void {
		if (!expandedSolutionId) return;

		// Restore the main marker to the cluster
		const mainMarker = mainMarkers.get(expandedSolutionId);
		if (mainMarker && markerClusterGroup) {
			markerClusterGroup.addLayer(mainMarker);
		}

		const subs = subMarkers.get(expandedSolutionId);
		if (subs) {
			subs.forEach((marker: LeafletMarker) => {
				marker.remove();
			});
			subMarkers.delete(expandedSolutionId);
		}

		// Remove connecting lines
		connectionLines.forEach((line) => line.remove());
		connectionLines = [];

		closeDetails();
		expandedSolutionId = null;
	}

	// Update popover position on map move
	function updatePopoverPosition(): void {
		if (!map || !activeMarkerLatLng) return;
		const point = map.latLngToContainerPoint(activeMarkerLatLng);
		popoverPosition = {
			x: point.x,
			y: point.y - 20
		};
	}

	// Close details popover
	function closeDetails(): void {
		activeLocation = null;
		popoverPosition = null;
		activeMarkerLatLng = null;
	}

	// Handle map click
	function handleMapClick(): void {
		if (activeLocation) {
			closeDetails();
		}
	}

	// Initialize all solution markers with clustering
	function initializeMarkers(): void {
		if (!map || !L) return;

		// Create marker cluster group
		markerClusterGroup = L.markerClusterGroup({
			maxClusterRadius: 50,
			spiderfyOnMaxZoom: true,
			showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
			iconCreateFunction: (cluster: any) => {
				const count = cluster.getChildCount();
				let size = 'small';
				let className = 'marker-cluster-small';

				if (count > 50) {
					size = 'large';
					className = 'marker-cluster-large';
				} else if (count > 20) {
					size = 'medium';
					className = 'marker-cluster-medium';
				}

				return L.divIcon({
					html: `<div class="cluster-inner"><span>${count}</span></div>`,
					className: `marker-cluster ${className}`,
					iconSize: L.point(40, 40)
				});
			}
		});

		// Create markers for all visible solutions
		for (const solution of demoState.solutions) {
			if (!solution.visible) continue;

			const icon = createMainIcon(solution.highlighted);
			const marker = L.marker([solution.main.lat, solution.main.lng], { icon })
				.on('click', () => {
					expandSolution(solution);
				});

			// Add tooltip with city name and rent
			const tooltipContent = `<strong>${solution.city}</strong><br/>${solution.attributes.housingPrice}€/mois`;
			marker.bindTooltip(tooltipContent, {
				permanent: false,
				direction: 'top',
				offset: [0, -8]
			});

			mainMarkers.set(solution.id, marker);
			markerClusterGroup.addLayer(marker);
		}

		map.addLayer(markerClusterGroup);

		// Map click handler
		map.on('click', handleMapClick);
		map.on('move', updatePopoverPosition);

		// Collapse on zoom out
		map.on('zoomend', () => {
			if (map.getZoom() < ZOOM_THRESHOLD && expandedSolutionId) {
				collapseExpanded();
			}
		});
	}

	// Update markers when solutions become visible again (e.g., after reset)
	$effect(() => {
		if (!map || !L || !markerClusterGroup) return;

		// Check for solutions that need to be added back to the cluster
		for (const solution of demoState.solutions) {
			if (!solution.visible) continue;

			const existingMarker = mainMarkers.get(solution.id);

			// If marker exists and is in cluster, skip
			if (existingMarker && markerClusterGroup.hasLayer(existingMarker)) continue;

			// Create marker if it doesn't exist
			if (!existingMarker) {
				const icon = createMainIcon(solution.highlighted);
				const marker = L.marker([solution.main.lat, solution.main.lng], { icon })
					.on('click', () => {
						expandSolution(solution);
					});

				const tooltipContent = `<strong>${solution.city}</strong><br/>${solution.attributes.housingPrice}€/mois`;
				marker.bindTooltip(tooltipContent, {
					permanent: false,
					direction: 'top',
					offset: [0, -8]
				});

				mainMarkers.set(solution.id, marker);
				markerClusterGroup.addLayer(marker);
			} else {
				// Add existing marker back to cluster
				markerClusterGroup.addLayer(existingMarker);
			}
		}
	});

	// Leaflet initialization
	function leafletMap(node: HTMLElement) {
		async function initMap() {
			const leaflet = await import('leaflet');
			L = leaflet.default || leaflet;

			// Import markercluster plugin - it extends L globally
			await import('leaflet.markercluster');

			// MarkerClusterGroup is now available on the L object
			if (!L.markerClusterGroup && (L as any).MarkerClusterGroup) {
				L.markerClusterGroup = (options: any) => new (L as any).MarkerClusterGroup(options);
			}

			map = L.map(node, {
				zoomControl: false,
				attributionControl: true,
				center,
				zoom
			});

			L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
				subdomains: 'abcd',
				maxZoom: 19
			}).addTo(map);

			initializeMarkers();
		}

		initMap();

		return {
			destroy() {
				map?.remove();
			}
		};
	}

	// Get expanded solution data for toolbar
	let expandedSolution = $derived(
		expandedSolutionId ? demoState.solutions.find((s) => s.id === expandedSolutionId) : null
	);

	onDestroy(() => {
		mainMarkers.forEach((marker: LeafletMarker) => marker.remove());
		subMarkers.forEach((markers: LeafletMarker[]) => markers.forEach((m: LeafletMarker) => m.remove()));
		connectionLines.forEach((line) => line.remove());
	});
</script>

<div class="relative w-full h-full">
	<div class="w-full h-full z-10 bg-gray-100 min-h-[400px] relative" use:leafletMap></div>

	{#if activeLocation && popoverPosition}
		<div
			class="absolute z-40 w-[300px] bg-white rounded-lg shadow-lg overflow-visible"
			style="left: {popoverPosition.x}px; top: {popoverPosition.y}px; transform: translate(-50%, -100%) translateY(-10px);"
			transition:fade={{ duration: 200 }}
		>
			<div class="relative">
				<button
					class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:bg-white transition-colors z-10"
					onclick={closeDetails}
				>
					✕
				</button>

				{#if activeLocation.type === 'housing'}
					<HousingCard
						images={[
							'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
							'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
							'https://images.unsplash.com/photo-1566073771259-6a8506099945',
							'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
						]}
						title={activeLocation.title}
						location="Centre-ville"
						price={expandedSolution?.attributes.housingPrice || 800}
						rating={4.5}
						reviews={42}
					/>
				{:else}
					<div class="p-4">
						<h3 class="font-semibold mb-2">{activeLocation.title}</h3>
						<p class="text-gray-600 capitalize">
							{activeLocation.type === 'work' ? 'Emploi' : 'Loisirs'}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="absolute inset-0 pointer-events-none z-50">
		{#if expandedSolution}
			<SolutionToolbar
				isVisible={true}
				solutionId={expandedSolution.id}
				solutionData={{
					main: {
						...expandedSolution.main,
						id: expandedSolution.id,
						description: expandedSolution.name
					},
					sub: {
						housing: { ...expandedSolution.sub.housing },
						hobby: { ...expandedSolution.sub.hobby },
						work: { ...expandedSolution.sub.work }
					}
				}}
			/>
		{/if}
	</div>

	{#if expandedSolutionId}
		<button
			class="absolute top-5 right-5 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 text-lg shadow-md hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-50"
			onclick={collapseExpanded}
			transition:fade
		>
			✕
		</button>
	{/if}

	<!-- Solution count indicator -->
	<div
		class="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50 text-sm font-medium"
	>
		{getVisibleSolutions().length} solution{getVisibleSolutions().length > 1 ? 's' : ''} disponible{getVisibleSolutions().length > 1 ? 's' : ''}
	</div>
</div>

<style>
	:global(.custom-popup .leaflet-popup-content-wrapper) {
		padding: 0;
		overflow: hidden;
		border-radius: 1rem;
	}
	:global(.custom-popup .leaflet-popup-content) {
		margin: 0;
		width: 300px !important;
	}
	:global(.custom-popup .leaflet-popup-tip) {
		background: white;
	}

	/* Marker pulse animation for highlighting */
	:global(.marker-pulse-once) {
		animation: marker-pulse-once 0.6s ease-out;
	}

	@keyframes marker-pulse-once {
		0% {
			transform: scale(1);
			filter: brightness(1);
		}
		50% {
			transform: scale(1.4);
			filter: brightness(1.3);
		}
		100% {
			transform: scale(1);
			filter: brightness(1);
		}
	}

	/* Marker highlight state */
	:global(.marker-highlight) {
		filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
	}

	/* Cluster marker styles */
	:global(.marker-cluster) {
		background: transparent;
	}

	:global(.marker-cluster .cluster-inner) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		font-weight: 600;
		font-size: 14px;
		color: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease;
	}

	:global(.marker-cluster:hover .cluster-inner) {
		transform: scale(1.1);
	}

	:global(.marker-cluster-small .cluster-inner) {
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
	}

	:global(.marker-cluster-medium .cluster-inner) {
		background: linear-gradient(135deg, #8b5cf6, #6d28d9);
	}

	:global(.marker-cluster-large .cluster-inner) {
		background: linear-gradient(135deg, #f59e0b, #d97706);
	}
</style>
