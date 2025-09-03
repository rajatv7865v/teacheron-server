import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Payout Api')
    .setDescription('Authantication, Verification, Payout Api docs')
    .setVersion('1.0')
    .addCookieAuth('access-token', {
      type: 'apiKey',
      in: 'cookie',
    })
    .addServer(
      `http://localhost:${process.env.APP_PORT || 3000}/api/v1/`,
      'Local environment',
    )
    .addServer('https://minibackend.budgetree.in/api/v1', 'Staging')
    // .addTag('User', 'Operations about user management')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
