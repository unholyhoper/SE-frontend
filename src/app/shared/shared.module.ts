import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BlankPageComponent} from './standard/blank-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {DemoPlaceholderModule} from "../modules/ui/page-layouts/common/demo-placeholder/demo-placeholder.module";
import {DemoSidebarModule} from "../modules/ui/page-layouts/common/demo-sidebar/demo-sidebar.module";
import {LayoutOverviewModule} from "../modules/ui/page-layouts/common/layout-overview/layout-overview.module";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations :[
        BlankPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatTabsModule,
        DemoPlaceholderModule,
        DemoSidebarModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BlankPageComponent
    ]
})
export class SharedModule
{
}
