import type { LocationData, ChatMessage } from '$lib/types/map';

export const mapState = $state({
    isExpanded: false,
    isVisible: true,
    solutionData: {
        main: {
            lat: 47.0810,
            lng: 2.3987,
            id: "1",
            title: "Opportunité à Bourges",
            type: "main" as const
        },
        sub: {
            housing: {
                lat: 47.0850,
                lng: 2.3967,
                title: "Logement disponible",
                type: "housing" as const
            },
            hobby: {
                lat: 47.0830,
                lng: 2.4007,
                title: "Club de sport",
                type: "hobby" as const
            },
            work: {
                lat: 47.0790,
                lng: 2.3957,
                title: "Offre d'emploi",
                type: "work" as const
            }
        }
    }
});

export const chatState = $state({
    isOpen: true,
    messages: [{
        id: 1,
        content: "Bonjour ! Je suis votre assistant pour vous aider à trouver votre nouvelle vie. Que recherchez-vous aujourd'hui ?",
        sender: 'assistant',
        timestamp: new Date()
    }] as ChatMessage[],
    newMessage: '',
    isSending: false
}); 