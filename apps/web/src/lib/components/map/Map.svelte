<script lang="ts">
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { Map, Marker as LeafletMarker, DivIcon, LayerGroup } from 'leaflet';
    import { mapState } from '$lib/states/map.svelte';
    import type { MarkerType, LocationData } from '$lib/types/map';
    import HousingCard from "$lib/components/ui/housing-card/housing-card.svelte";
    import SolutionToolbar from "$lib/components/map/SolutionToolbar.svelte";

    let { center, zoom } = $props<{
        center: [number, number];
        zoom: number;
    }>();

    let map: Map;
    let mainMarker: LeafletMarker | null = null;
    let subMarkers: LeafletMarker[] = [];
    let markersLayerGroup: LayerGroup | null = null;
    let L: any;
    let isMapReady = $state(false);

    // État pour gérer le popover
    let activeLocation = $state<LocationData | null>(null);
    let popoverPosition = $state<{ x: number; y: number } | null>(null);
    let activeMarkerLatLng = $state<L.LatLng | null>(null);
    let popoverRef = $state<HTMLDivElement | null>(null);

    const ZOOM_THRESHOLD = 10;

    const markerClasses: Record<MarkerType, string> = {
        main: "w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 relative before:content-['●'] before:text-white before:text-xl before:relative before:z-[2] after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-full after:h-full after:rounded-full after:bg-blue-500 after:opacity-30 after:animate-marker-pulse",
        housing: "w-8 h-8 rounded-full bg-green-500 border-2 border-green-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['🏠'] before:text-base",
        hobby: "w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['🎨'] before:text-base",
        work: "w-8 h-8 rounded-full bg-red-500 border-2 border-red-700 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 before:content-['💼'] before:text-base"
    };

    function createCustomIcon(type: MarkerType): DivIcon {
        return L.divIcon({
            className: `custom-marker ${type}`,
            html: `<div class="${markerClasses[type]}"></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        });
    }

    function expand() {
        mapState.isExpanded = true;
        mapState.isVisible = false;
        mainMarker?.remove();
        subMarkers.forEach(marker => marker.addTo(map));

        const group = L.featureGroup(subMarkers);
        const bounds = group.getBounds();
        map.flyToBounds(bounds.pad(0.2), {
            duration: 0.5,
            easeLinearity: 0.5
        });
    }

    function collapse() {
        mapState.isExpanded = false;
        mapState.isVisible = true;
        subMarkers.forEach(marker => marker.remove());
        mainMarker?.addTo(map);
        
        // Fermer les popups
        closeDetails();
        
        map.flyTo(mainMarker.getLatLng(), ZOOM_THRESHOLD - 4, {
            duration: 0.5,
            easeLinearity: 0.5
        });
    }

    function handleMarkerClick(event: { latlng: L.LatLng }, location: LocationData) {
        if (location.type === 'main' && !mapState.isExpanded) {
            expand();
            return;
        }
        
        if (location.type !== 'main') {
            activeMarkerLatLng = event.latlng;
            updatePopoverPosition();
            activeLocation = location;
        }
    }

    function updatePopoverPosition() {
        if (!map || !activeMarkerLatLng) return;
        
        const point = map.latLngToContainerPoint(activeMarkerLatLng);
        popoverPosition = {
            x: point.x,
            y: point.y - 20
        };
    }

    function closeDetails() {
        activeLocation = null;
        popoverPosition = null;
        activeMarkerLatLng = null;
    }

    function handleMapClick() {
        if (activeLocation) {
            closeDetails();
        }
    }

    function clearAllMarkers() {
        // Remove main marker
        if (mainMarker) {
            mainMarker.remove();
            mainMarker = null;
        }

        // Remove all sub markers
        subMarkers.forEach(marker => marker.remove());
        subMarkers = [];

        // Clear layer group
        if (markersLayerGroup) {
            markersLayerGroup.clearLayers();
        }

        // Close any open popover
        closeDetails();
    }

    function createMarkers() {
        if (!map || !L) return;

        const { main, sub } = mapState.solutionData;

        // Create main marker
        const mainIcon = createCustomIcon(main.type);
        mainMarker = L.marker([main.lat, main.lng], {
            icon: mainIcon
        })
        .addTo(map)
        .on('click', (e: L.LeafletMouseEvent) => handleMarkerClick(e, main));

        // Create sub markers
        Object.values(sub).forEach(location => {
            const icon = createCustomIcon(location.type);
            const marker = L.marker([location.lat, location.lng], {
                icon
            })
            .on('click', (e: L.LeafletMouseEvent) => handleMarkerClick(e, location));
            subMarkers.push(marker);
        });
    }

    function fitBoundsToMarkers() {
        if (!map || !L || subMarkers.length === 0) return;

        const allMarkers = mainMarker ? [mainMarker, ...subMarkers] : subMarkers;
        const group = L.featureGroup(allMarkers);
        const bounds = group.getBounds();

        if (bounds.isValid()) {
            map.flyToBounds(bounds.pad(0.2), {
                duration: 0.5,
                easeLinearity: 0.5
            });
        }
    }

    function updateMarkers() {
        if (!isMapReady) return;

        const startTime = performance.now();

        clearAllMarkers();
        createMarkers();

        // Show sub markers if expanded
        if (mapState.isExpanded) {
            subMarkers.forEach(marker => marker.addTo(map));
            fitBoundsToMarkers();
        }

        const duration = performance.now() - startTime;
        if (duration > 500) {
            console.warn(`[Map] Marker update took ${duration.toFixed(2)}ms (target: <500ms)`);
        } else {
            console.debug(`[Map] Marker update completed in ${duration.toFixed(2)}ms`);
        }
    }

    function initializeMarkers() {
        if (!map || !L) return;

        createMarkers();

        // Add click handler on map
        map.on('click', handleMapClick);
    }

    // Reactive effect: update markers when solutionData changes
    $effect(() => {
        // Access solutionData to create dependency
        const _ = mapState.solutionData;

        if (isMapReady) {
            updateMarkers();
        }
    });

    function leafletMap(node: HTMLElement) {
        async function initMap() {
            const leaflet = await import('leaflet');
            L = leaflet;
            
            map = L.map(node, {
                zoomControl: false,
                attributionControl: true,
                center,
                zoom
            });
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            initializeMarkers();

            map.on('zoomend', () => {
                if (map.getZoom() < ZOOM_THRESHOLD && mapState.isExpanded) {
                    collapse();
                }
            });

            // Mettre à jour la position du popover lors du déplacement de la carte
            map.on('move', updatePopoverPosition);

            // Mark map as ready for reactive updates
            isMapReady = true;
        }

        initMap();

        return {
            destroy() {
                map?.remove();
            }
        };
    }

    onDestroy(() => {
        mainMarker?.remove();
        subMarkers.forEach(marker => marker?.remove());
    });
</script>

<div class="relative w-full h-full">
    <div 
        class="w-full h-full z-10 bg-gray-100 min-h-[400px] relative"
        use:leafletMap
    />

    {#if activeLocation && popoverPosition}
        <div 
            bind:this={popoverRef}
            class="absolute z-40 w-[300px] bg-white rounded-lg shadow-lg overflow-visible"
            style="left: {popoverPosition.x}px; top: {popoverPosition.y}px; transform: translate(-50%, -100%) translateY(-10px);"
            transition:fade={{ duration: 200 }}
        >
            <div class="relative">
                <button
                    class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:bg-white transition-colors z-10"
                    onclick={closeDetails}
                >✕</button>

                {#if activeLocation.type === 'housing'}
                    <HousingCard
                        images={[
                            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
                        ]}
                        title={activeLocation.title}
                        location="Le Marais, Paris"
                        price={150}
                        rating={4.8}
                        reviews={128}
                    />
                {:else}
                    <div class="p-4">
                        <h3 class="font-semibold mb-2">{activeLocation.title}</h3>
                        <p class="text-gray-600">Type: {activeLocation.type}</p>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    <div class="absolute inset-0 pointer-events-none z-50">
        <SolutionToolbar 
            isVisible={mapState.isExpanded} 
            solutionId={mapState.solutionData.main.id}
            solutionData={mapState.solutionData}
        />
    </div>

    {#if mapState.isExpanded}
        <button 
            class="absolute top-5 right-5 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 text-lg shadow-md hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-50"
            onclick={collapse}
            transition:fade
        >✕</button>
    {/if}
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
</style>