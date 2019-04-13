import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'country',
                loadChildren: './userAppMongoDB/country/country.module#UserAppMongoDbCountryModule'
            },
            {
                path: 'city',
                loadChildren: './userAppMongoDB/city/city.module#UserAppMongoDbCityModule'
            },
            {
                path: 'country',
                loadChildren: './userAppMongoDB/country/country.module#UserAppMongoDbCountryModule'
            },
            {
                path: 'user',
                loadChildren: './userAppMongoDB/user/user.module#UserAppMongoDbUserModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EpikedinEntityModule {}
