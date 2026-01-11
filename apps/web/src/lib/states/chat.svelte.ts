import type { ChatMessage } from '$lib/types/map';

let isOpen = $state(window?.innerWidth >= 768 || false);
let messages = $state<ChatMessage[]>([
    {
        id: 1,
        content: "Bonjour ! Je suis votre assistant. Comment puis-je vous aider à trouver votre nouvelle vie ?",
        sender: 'assistant',
        timestamp: new Date()
    }
]);
let newMessage = $state('');
let isSending = $state(false);

export const chatState = {
    isOpen,
    messages,
    newMessage,
    isSending
}; 