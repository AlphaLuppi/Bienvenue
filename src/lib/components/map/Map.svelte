<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import type { Map, Marker as LeafletMarker, DivIcon } from 'leaflet';
    import { mapState } from '$lib/states/map.svelte';
    import type { MarkerType } from '$lib/types/map';

    let { center, zoom } = $props<{
        center: [number, number];
        zoom: number;
    }>();

    let map: Map;
    let mainMarker: LeafletMarker;
    let subMarkers: LeafletMarker[] = [];
    let L: any;

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
        
        map.flyTo(mainMarker.getLatLng(), ZOOM_THRESHOLD - 1, {
            duration: 0.5,
            easeLinearity: 0.5
        });
    }

    function initializeMarkers() {
        if (!map || !L) return;

        const { main, sub } = mapState.solutionData;

        // Initialiser le marqueur principal
        const mainIcon = createCustomIcon(main.type);
        mainMarker = L.marker([main.lat, main.lng], {
            icon: mainIcon
        })
        .bindPopup(main.title)
        .addTo(map)
        .on('click', expand);

        // Initialiser les sous-marqueurs
        Object.values(sub).forEach(location => {
            const icon = createCustomIcon(location.type);
            const marker = L.marker([location.lat, location.lng], {
                icon
            }).bindPopup(location.title);
            subMarkers.push(marker);
        });
    }

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

<div 
    class="w-full h-full z-10 bg-gray-100 min-h-[400px] relative"
    use:leafletMap
>
    {#if mapState.isExpanded}
        <button 
            class="absolute top-5 right-5 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 text-lg shadow-md hover:bg-gray-100 hover:scale-110 transition-all duration-300 z-[9999]"
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