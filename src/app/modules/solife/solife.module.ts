import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {DemoSidebarModule} from '../ui/page-layouts/common/demo-sidebar/demo-sidebar.module';
import {SharedModule} from 'app/shared/shared.module';
import {DemoPlaceholderModule} from '../ui/page-layouts/common/demo-placeholder/demo-placeholder.module';
import {LayoutOverviewModule} from '../ui/page-layouts/common/layout-overview/layout-overview.module';
import {PropositionsComponent} from './propositions/propositions.component';
import {PoliciesComponent} from './policies/policies.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PolicyResolver} from "./solife.resolver";
import {MatPaginatorModule} from "@angular/material/paginator";
import {TableComponent} from "./thirdparty/table/table.component";

const solifeRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'policies',
                component: PoliciesComponent,
                resolve: {
                    policies: PolicyResolver,
                }
            },
            {
                path: 'propositions',
                component: PropositionsComponent
            }


        ]

    }
];

@NgModule({
    declarations: [
        PoliciesComponent,
        PropositionsComponent,
        TableComponent
    ],
    exports: [
        TableComponent
    ],
    imports: [
        RouterModule.forChild(solifeRoutes),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        SharedModule,
        DemoPlaceholderModule,
        DemoSidebarModule,
        LayoutOverviewModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule
    ]
})
export class SolifeModule {
}
