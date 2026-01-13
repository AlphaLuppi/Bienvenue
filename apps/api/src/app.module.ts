import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.local', '.env']
		}),
		SupabaseModule,
		AuthModule,
		ProfileModule
	]
})
export class AppModule {}
