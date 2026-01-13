import { Controller, Get } from '@nestjs/common';

@Controller('organization')
export class OrganizationController {
  @Get()
  public getAllOrganization() {
    return "Hello Orgs";
  }
}
