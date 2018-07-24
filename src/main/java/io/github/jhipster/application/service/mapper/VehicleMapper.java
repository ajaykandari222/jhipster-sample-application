package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.VehicleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vehicle and its DTO VehicleDTO.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {

    @Mapping(source = "vehicleNumber.id", target = "vehicleNumberId")
    VehicleDTO toDto(Vehicle vehicle);

    @Mapping(source = "vehicleNumberId", target = "vehicleNumber")
    Vehicle toEntity(VehicleDTO vehicleDTO);

    default Vehicle fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vehicle vehicle = new Vehicle();
        vehicle.setId(id);
        return vehicle;
    }
}
