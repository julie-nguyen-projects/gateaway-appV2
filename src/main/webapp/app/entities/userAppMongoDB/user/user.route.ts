import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from 'app/shared/model/userAppMongoDB/user.model';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserUpdateComponent } from './user-update.component';
import { UserDeletePopupComponent } from './user-delete-dialog.component';
import { IUser } from 'app/shared/model/userAppMongoDB/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<User>) => response.ok),
                map((user: HttpResponse<User>) => user.body)
            );
        }
        return of(new User());
    }
}

export const userRoute: Routes = [
    {
        path: '',
        component: UserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserDetailComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserUpdateComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserUpdateComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserDeletePopupComponent,
        resolve: {
            user: UserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Users'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
