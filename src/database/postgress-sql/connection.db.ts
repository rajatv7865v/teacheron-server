import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or your database host
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      autoLoadEntities: true, // Automatically load all entities
      synchronize: true, // Auto sync (disable in production)
    }),
  ],
})
export class DatabaseModule {}
