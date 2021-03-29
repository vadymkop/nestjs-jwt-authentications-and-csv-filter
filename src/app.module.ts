import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entity/product.entity';
import { EmailsFilterMiddleware } from './emails-filter/middleware/emails-filter.middleware';
import { databaseSettings } from './database/database.settings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseSettings(),
      entities: [UserEntity, ProductEntity],
    }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmailsFilterMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.POST });
  }
}
