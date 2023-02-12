import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Policy, ThirdParty} from "../../solife.types";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {takeUntil} from "rxjs";

@Component({
    selector     : 'data-table-for-selection',
    templateUrl  : './table.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, AfterViewInit
{
    dataSource: MatTableDataSource<any>;

    selection = new SelectionModel<ThirdParty>(true, []);
    @Input() persistents: any[];

    @Input() displayedColumns: string[];
        // = ['select', 'position', 'name', 'weight', 'symbol'];
    //
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row. + 1}`;
    }

    /**
     * Constructor
     */
    constructor()
    {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;

    }

    ngOnInit(): void {
        // this._solifeService.policies$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((policies: Policy[]) => {
        //
        //         // Update the brands
        //TODO initialise here
                this.dataSource = new MatTableDataSource<any>(this.persistents);
            //     // this._changeDetectorRef.markForCheck();
        //     // Mark for check
        // });
    }

    cancelSelection(): void {
        this.selection.clear();
    }
}
