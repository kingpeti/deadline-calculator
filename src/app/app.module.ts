import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { RouterModule } from 'src/router/router.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    CommonModule,

    // Routes
    RouterModule.forRoot(),
  ],
})
export class AppModule {}
