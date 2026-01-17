<script lang="ts">
	import { chatState } from '$lib/states/chat.svelte';
	import { applyFilter, resetFilters, getVisibleCount } from '$lib/states/demo.svelte';
	import { parseUserMessage, isResetCommand } from '$lib/demo/filter-engine';
	import {
		generateResponse,
		generatePromptResponse,
		generateResetResponse
	} from '$lib/demo/chat-responses';
	import type { ChatMessage } from '$lib/types/map';
	import { fly, fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { cn } from '$lib/utils';

	let messagesEndRef = $state<HTMLDivElement | null>(null);

	// Scroll to bottom when new messages are added
	function scrollToBottom() {
		// Use scrollIntoView on the end marker element
		const doScroll = () => {
			if (messagesEndRef) {
				messagesEndRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
			}
		};

		// Scroll after short delays to ensure content is rendered
		setTimeout(doScroll, 50);
		setTimeout(doScroll, 150);
		setTimeout(doScroll, 300);
	}

	async function handleSendMessage() {
		if (!chatState.newMessage.trim()) return;

		const userMessage = chatState.newMessage;

		// Add user message
		const newMessage: ChatMessage = {
			id: chatState.messages.length + 1,
			content: userMessage,
			sender: 'user',
			timestamp: new Date()
		};

		chatState.messages = [...chatState.messages, newMessage];
		chatState.newMessage = '';
		chatState.isSending = true;
		scrollToBottom();

		// Simulate typing delay
		await simulateTypingDelay();

		// Check for reset command
		if (isResetCommand(userMessage)) {
			resetFilters();
			addAssistantMessage(generateResetResponse());
			return;
		}

		// Parse user intent
		const parsedCriteria = parseUserMessage(userMessage);

		// Check if any criteria was detected
		if (Object.keys(parsedCriteria).length > 0) {
			const previousCount = getVisibleCount();

			// Apply filters
			const result = applyFilter(parsedCriteria);

			// Generate contextual response
			const response = generateResponse({
				criteria: parsedCriteria,
				matchCount: result.currentCount,
				previousCount: previousCount,
				matchedSolutions: result.matchedSolutions
			});

			addAssistantMessage(response);
		} else {
			// No criteria detected - prompt for more info
			addAssistantMessage(generatePromptResponse());
		}
	}

	function simulateTypingDelay(): Promise<void> {
		const delay = 800 + Math.random() * 700;
		return new Promise((resolve) => setTimeout(resolve, delay));
	}

	function addAssistantMessage(content: string) {
		const msg: ChatMessage = {
			id: chatState.messages.length + 1,
			content,
			sender: 'assistant',
			timestamp: new Date()
		};
		chatState.messages = [...chatState.messages, msg];
		chatState.isSending = false;
		scrollToBottom();
	}
</script>

<div
	class={cn(
		'absolute left-4 top-4 bottom-4 w-full md:w-[400px] bg-background border flex flex-col transition-all duration-300 rounded-lg shadow-lg',
		chatState.isOpen
			? 'translate-x-0 opacity-100'
			: '-translate-x-full md:translate-x-0 md:opacity-100'
	)}
	style="z-index: 1000;"
	transition:fly|local={{ x: -300, duration: 300, opacity: 1 }}
>
	<div class="flex items-center justify-between p-4 border-b">
		<div>
			<h2 class="text-lg font-semibold">Assistant Bienvenue</h2>
			<p class="text-xs text-muted-foreground">Trouvez votre nouvelle vie</p>
		</div>
		<Button
			variant="ghost"
			size="icon"
			class="md:hidden"
			onclick={() => (chatState.isOpen = false)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-x"
				><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line
				></svg
			>
		</Button>
	</div>

	<div class="flex-1 overflow-hidden">
		<ScrollArea class="h-full p-4">
			<div class="flex flex-col gap-4">
				{#each chatState.messages as msg}
					<div
						class={cn(
							'flex gap-2 max-w-[85%]',
							msg.sender === 'user' ? 'self-end ml-auto' : 'self-start'
						)}
					>
						{#if msg.sender === 'assistant'}
							<Avatar class="h-8 w-8 bg-primary/10">
								<AvatarFallback class="text-primary text-xs">AI</AvatarFallback>
							</Avatar>
						{/if}

						<div
							class={cn(
								'rounded-lg p-3',
								msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
							)}
						>
							<p class="text-sm">{msg.content}</p>
							<div class="text-xs opacity-70 mt-1 text-right">
								{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
							</div>
						</div>

						{#if msg.sender === 'user'}
							<Avatar class="h-8 w-8 bg-muted">
								<AvatarFallback>Moi</AvatarFallback>
							</Avatar>
						{/if}
					</div>
				{/each}

				{#if chatState.isSending}
					<div class="flex gap-2 max-w-[85%] self-start" transition:fade>
						<Avatar class="h-8 w-8 bg-primary/10">
							<AvatarFallback class="text-primary text-xs">AI</AvatarFallback>
						</Avatar>
						<div class="rounded-lg p-3 bg-muted">
							<div class="flex gap-1">
								{#each Array(3) as _, i}
									<div
										class="animate-bounce w-2 h-2 bg-foreground/50 rounded-full"
										style="animation-delay: {i * 0.15}s;"
									></div>
								{/each}
							</div>
						</div>
					</div>
				{/if}

				<!-- Scroll anchor -->
				<div bind:this={messagesEndRef}></div>
			</div>
		</ScrollArea>
	</div>

	<div class="p-4 border-t">
		<form class="flex items-center gap-2" onsubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
			<Input
				type="text"
				placeholder="Décrivez votre projet de vie..."
				bind:value={chatState.newMessage}
				onkeydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						handleSendMessage();
					}
				}}
				disabled={chatState.isSending}
			/>
			<Button type="submit" size="icon" disabled={chatState.isSending || !chatState.newMessage.trim()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-send"
					><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"
					></polygon></svg
				>
			</Button>
		</form>
	</div>
</div>
