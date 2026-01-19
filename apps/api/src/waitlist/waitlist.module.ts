import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
	imports: [SupabaseModule],
	controllers: [WaitlistController],
	providers: [WaitlistService],
	exports: [WaitlistService]
})
export class WaitlistModule {}
