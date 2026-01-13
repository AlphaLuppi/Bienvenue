export type MarkerType = 'main' | 'housing' | 'hobby' | 'work';
export type MessageSender = 'user' | 'assistant';

export interface LocationData {
	lat: number;
	lng: number;
	title: string;
	type: MarkerType;
}

export interface Location {
	id: string;
	title: string;
	type: MarkerType;
	lat: number;
	lng: number;
	price?: number;
	rating?: number;
	reviews?: number;
	images?: string[];
	surface?: number;
	description: string;
	amenities?: string[];
	distance?: number;
	transportMode?: 'walking' | 'cycling' | 'driving' | 'transit';
}

export interface MapState {
	isExpanded: boolean;
	isVisible: boolean;
	solutionData: {
		main: Location;
		sub: Record<string, Location>;
	};
}

export interface ChatMessage {
	id: number;
	content: string;
	sender: MessageSender;
	timestamp: Date;
}

export interface ChatState {
	isOpen: boolean;
	messages: ChatMessage[];
	newMessage: string;
	isSending: boolean;
}
