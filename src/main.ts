import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account/account.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  await app.listen(3030);
}
bootstrap();
