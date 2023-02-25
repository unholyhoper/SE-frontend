import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import {DemoPlaceholderModule} from '../ui/page-layouts/common/demo-placeholder/demo-placeholder.module';
import {DemoSidebarModule} from '../ui/page-layouts/common/demo-sidebar/demo-sidebar.module';
import {LayoutOverviewModule} from '../ui/page-layouts/common/layout-overview/layout-overview.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {BatchConfigComponent} from './config/batch-config.component';
import {BatchJobsComponent} from './jobs/batch-jobs.component';
import {LaunchBatchComponent} from './launch/launch-batch.component';
import {TableComponent} from "../solife/thirdparty/table/table.component";
import {SolifeModule} from "../solife/solife.module";
import {JobExecutionsResolver} from "./batch.resolvers";

const solifeRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'config',
                component: BatchConfigComponent,
            },
            {
                path: 'jobs',
                component: BatchJobsComponent,
                resolve  : {
                    jobs    : JobExecutionsResolver,
                }
            },
            {
                path: 'launch',
                component: LaunchBatchComponent
            }


        ]

    }
];

@NgModule({
    declarations: [
        LaunchBatchComponent,
        BatchJobsComponent,
        BatchConfigComponent
    ],
    imports: [
        RouterModule.forChild(solifeRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        DemoPlaceholderModule,
        DemoSidebarModule,
        LayoutOverviewModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatStepperModule,
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        MatStepperModule,
        MatInputModule,
        SolifeModule

    ]
})
export class BatchModule {
}
