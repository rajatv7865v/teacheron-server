import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1', // ⚠️ IMPORTANT (not localhost)
      port: 5432,
      username: 'teacheron_user',
      password: 'StrongPassword123',
      database: 'teacheron_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
