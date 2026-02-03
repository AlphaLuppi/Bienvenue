<script lang="ts">
    import { chatState } from '$lib/states/chat.svelte';
    import type { ChatMessage } from '$lib/types/map';
    import { fly, fade } from 'svelte/transition';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
    import { cn } from "$lib/utils";

    function handleSendMessage() {
        if (!chatState.newMessage.trim()) return;
        
        const newMessage: ChatMessage = {
            id: chatState.messages.length + 1,
            content: chatState.newMessage,
            sender: 'user',
            timestamp: new Date()
        };
        
        chatState.messages = [...chatState.messages, newMessage];
        
        const userQuery = chatState.newMessage;
        chatState.newMessage = '';
        chatState.isSending = true;
        
        setTimeout(() => {
            const responseMessage: ChatMessage = {
                id: chatState.messages.length + 1,
                content: `J'ai trouvé plusieurs options correspondant à "${userQuery}". Vous pouvez les voir sur la carte.`,
                sender: 'assistant',
                timestamp: new Date()
            };
            chatState.messages = [...chatState.messages, responseMessage];
            chatState.isSending = false;
        }, 1500);
    }
</script>

<div 
    class={cn(
        "absolute left-4 top-4 bottom-4 w-full md:w-[400px] bg-background border flex flex-col transition-all duration-300 rounded-lg shadow-lg",
        chatState.isOpen 
            ? "translate-x-0 opacity-100" 
            : "-translate-x-full md:translate-x-0 md:opacity-100"
    )} 
    style="z-index: 1000;"
    transition:fly|local={{ x: -300, duration: 300, opacity: 1 }}
>
    <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">Assistant</h2>
        <Button 
            variant="ghost" 
            size="icon" 
            class="md:hidden"
            onclick={() => chatState.isOpen = false}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Button>
    </div>

    <ScrollArea class="flex-1 p-4">
        <div class="flex flex-col gap-4">
            {#each chatState.messages as msg}
                <div class={cn(
                    "flex gap-2 max-w-[85%]",
                    msg.sender === 'user' ? "self-end ml-auto" : "self-start"
                )}>
                    {#if msg.sender === 'assistant'}
                        <Avatar class="h-8 w-8 bg-muted">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    {/if}
                    
                    <div class={cn(
                        "rounded-lg p-3",
                        msg.sender === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                    )}>
                        <p>{msg.content}</p>
                        <div class="text-xs opacity-70 mt-1 text-right">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    
                    {#if msg.sender === 'user'}
                        <Avatar class="h-8 w-8 bg-muted">
                            <AvatarFallback>AB</AvatarFallback>
                        </Avatar>
                    {/if}
                </div>
            {/each}
            
            {#if chatState.isSending}
                <div class="flex gap-2 max-w-[85%] self-start" transition:fade>
                    <Avatar class="h-8 w-8 bg-muted">
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div class="rounded-lg p-3 bg-muted">
                        <div class="flex gap-1">
                            {#each Array(3) as _, i}
                                <div 
                                    class="animate-bounce w-2 h-2 bg-foreground/50 rounded-full"
                                    style="animation-delay: {i * 0.1}s;"
                                />
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </ScrollArea>
    
    <div class="p-4 border-t">
        <form class="flex items-center gap-2" onsubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <Input
                type="text"
                placeholder="Écrivez votre message..."
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </Button>
        </form>
    </div>
</div>