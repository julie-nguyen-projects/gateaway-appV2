import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IUser } from 'app/shared/model/userAppMongoDB/user.model';
import { UserService } from './user.service';
import { ICity } from 'app/shared/model/userAppMongoDB/city.model';
import { CityService } from 'app/entities/userAppMongoDB/city';

@Component({
    selector: 'jhi-user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {
    user: IUser;
    isSaving: boolean;

    cities: ICity[];
    birthdateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userService: UserService,
        protected cityService: CityService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ user }) => {
            this.user = user;
        });
        this.cityService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICity[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICity[]>) => response.body)
            )
            .subscribe((res: ICity[]) => (this.cities = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== undefined) {
            this.subscribeToSaveResponse(this.userService.update(this.user));
        } else {
            this.subscribeToSaveResponse(this.userService.create(this.user));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>) {
        result.subscribe((res: HttpResponse<IUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCityById(index: number, item: ICity) {
        return item.id;
    }
}
