import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origins = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: origins,
    methods: ['GET', 'OPTIONS'],
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
