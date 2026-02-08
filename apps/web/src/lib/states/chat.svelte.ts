import { browser } from '$app/environment';
import type { ChatMessage } from '$lib/types/map';

// Determine initial isOpen state based on viewport width (desktop = open, mobile = closed)
const getInitialIsOpen = (): boolean => {
	if (!browser) return true; // SSR default
	return window.innerWidth >= 768;
};

export const chatState = $state({
	isOpen: getInitialIsOpen(),
	messages: [
		{
			id: 1,
			content:
				"Bonjour ! Je suis votre assistant pour vous aider à trouver votre nouvelle vie. Que recherchez-vous aujourd'hui ?",
			sender: 'assistant',
			timestamp: new Date()
		}
	] as ChatMessage[],
	newMessage: '',
	isSending: false
});
