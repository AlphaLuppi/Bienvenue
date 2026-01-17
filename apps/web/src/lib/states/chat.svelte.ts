import type { ChatMessage } from '$lib/types/map';

// Use $state with object properties for proper reactivity
export const chatState = $state({
	isOpen: true,
	messages: [
		{
			id: 1,
			content:
				'Bonjour ! Je suis votre assistant pour trouver votre nouvelle vie en France. Dites-moi ce que vous recherchez : région, type de travail, loisirs, budget...',
			sender: 'assistant' as const,
			timestamp: new Date()
		}
	] as ChatMessage[],
	newMessage: '',
	isSending: false
});
