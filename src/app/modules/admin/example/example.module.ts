import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ExampleComponent} from 'app/modules/admin/example/example.component';
import {CardedLeftSidebar2PageScrollComponent} from '../page-scroll/left-sidebar-2.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {DemoSidebarModule} from "../../ui/page-layouts/common/demo-sidebar/demo-sidebar.module";

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent,
        CardedLeftSidebar2PageScrollComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        DemoSidebarModule
    ]
})
export class ExampleModule
{
}
