import { Module } from '@nestjs/common';
import { OrganizationService } from './providers/organization.service';
import { OrganizationController } from './organization.controller';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
