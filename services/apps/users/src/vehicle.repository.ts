import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/shared/database.index';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleRepository extends AbstractRepository<Vehicle> {
  protected readonly logger = new Logger(VehicleRepository.name);
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {
    super(vehicleRepository);
  }
}
