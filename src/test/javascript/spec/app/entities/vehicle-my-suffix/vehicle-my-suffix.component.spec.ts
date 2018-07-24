/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { VehicleMySuffixComponent } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix.component';
import { VehicleMySuffixService } from 'app/entities/vehicle-my-suffix/vehicle-my-suffix.service';
import { VehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';

describe('Component Tests', () => {
    describe('VehicleMySuffix Management Component', () => {
        let comp: VehicleMySuffixComponent;
        let fixture: ComponentFixture<VehicleMySuffixComponent>;
        let service: VehicleMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [VehicleMySuffixComponent],
                providers: []
            })
                .overrideTemplate(VehicleMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VehicleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VehicleMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vehicles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
