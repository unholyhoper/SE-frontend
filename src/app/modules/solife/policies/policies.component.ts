import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Policy} from "../solife.types";
import {SolifeService} from "../solife.service";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
    selector: 'simple-fullwidth-1-content-scroll',
    templateUrl: './policies.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PoliciesComponent implements OnInit, AfterViewInit {
    policies: Policy[];
    displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
    // dataSource = new MatTableDataSource<PeriodicElement>(this.policies);
    dataSource: MatTableDataSource<Policy>;
    selection = new SelectionModel<Policy>(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    checkboxLabel(row?: Policy): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.policyNumber + 1}`;
    }

    /**
     * Constructor
     */
    constructor(private _solifeService: SolifeService
    ) {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this._solifeService.policies$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((policies: Policy[]) => {

                // Update the brands
                this.policies = policies;

                this.dataSource = new MatTableDataSource<Policy>(policies);
                // Mark for check
                // this._changeDetectorRef.markForCheck();
            });
    }

    cancelSelection(): void {
        this.selection.clear();
    }

}
