import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { AddToWaitlistDto, WaitlistResponseDto } from './dto/waitlist.dto';

@Controller('waitlist')
export class WaitlistController {
	constructor(private readonly waitlistService: WaitlistService) {}

	/**
	 * Add email to waitlist - Public endpoint
	 */
	@Post()
	@HttpCode(HttpStatus.OK)
	async addToWaitlist(@Body() dto: AddToWaitlistDto): Promise<WaitlistResponseDto> {
		return this.waitlistService.addToWaitlist(dto);
	}

	/**
	 * Get waitlist count - Public endpoint for social proof
	 */
	@Get('count')
	async getCount(): Promise<{ count: number }> {
		const count = await this.waitlistService.getCount();
		return { count };
	}
}
