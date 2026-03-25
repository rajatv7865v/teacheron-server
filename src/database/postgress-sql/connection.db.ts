import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Use env var when available; otherwise fall back to your local connection URL.
      url: 'postgresql://teacheron_user:StrongPassword123@localhost:5432/teacheron_db',
      autoLoadEntities: true, // Automatically load all entities
      synchronize: true, // Auto sync (disable in production)
    }),
  ],
})
export class DatabaseModule {}
