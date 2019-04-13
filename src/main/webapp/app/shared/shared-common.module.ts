import { NgModule } from '@angular/core';

import { EpikedinSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EpikedinSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EpikedinSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EpikedinSharedCommonModule {}
