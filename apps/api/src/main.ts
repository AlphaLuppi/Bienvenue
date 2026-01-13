import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let app: any;

async function bootstrap() {
	if (!app) {
		app = await NestFactory.create(AppModule);

		// Enable CORS for SvelteKit frontend
		app.enableCors({
			origin: process.env.FRONTEND_URL || 'http://localhost:5173',
			credentials: true
		});

		// Global validation pipe
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true
			})
		);

		// API prefix
		app.setGlobalPrefix('api');

		await app.init();
	}
	return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
	bootstrap().then((app) => {
		const port = process.env.PORT || 3000;
		app.listen(port, () => {
			console.log(`API running on http://localhost:${port}`);
		});
	});
}

// For Vercel serverless
export default async function handler(req: any, res: any) {
	const app = await bootstrap();
	const expressApp = app.getHttpAdapter().getInstance();
	return expressApp(req, res);
}
