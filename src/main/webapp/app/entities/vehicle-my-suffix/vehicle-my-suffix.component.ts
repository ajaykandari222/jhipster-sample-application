import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicleMySuffix } from 'app/shared/model/vehicle-my-suffix.model';
import { Principal } from 'app/core';
import { VehicleMySuffixService } from './vehicle-my-suffix.service';

@Component({
    selector: 'jhi-vehicle-my-suffix',
    templateUrl: './vehicle-my-suffix.component.html'
})
export class VehicleMySuffixComponent implements OnInit, OnDestroy {
    vehicles: IVehicleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vehicleService: VehicleMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicleMySuffix[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVehicles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicleMySuffix) {
        return item.id;
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
