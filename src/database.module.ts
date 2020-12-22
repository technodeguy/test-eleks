import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123',
      database: 'test_eleks',
      entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    })
  ],
})
export class DatabaseModule {}