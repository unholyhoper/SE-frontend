import {
    AfterViewInit,
    ChangeDetectorRef,
    AfterContentChecked,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ThirdParty, ThirdPartyLegacy} from "../../solife/solife.types";
import {SolifeService} from "../../solife/solife.service";
import {Subject, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {BatchService} from "./launch-batch.service";

@Component({
    selector: 'simple-fullwidth-1-content-scroll',
    templateUrl: './launch-batch.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LaunchBatchComponent implements OnInit, AfterViewInit, AfterContentChecked {
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    horizontalStepperForm: FormGroup;
    dp: string[];

    data: ThirdParty[];
    dataColumns: string[];

    dataSource: MatTableDataSource<ThirdParty>;

    selection = new SelectionModel<ThirdParty>(true, []);

    displayedColumns: string[] = ['select', 'identifier', 'name', 'nationality', 'legal address', 'email'];


    selectedThirdPartyIdentifiers: number[];
    selectedThirdPartyNames: string[];

    policies: string[];

    dataSelected: boolean;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // name
    //nationalIdentifierCountry
    // legalAddress.street legalAddress.postalCode legalAddress.town
    // preferredEmailAddress.email


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder, private _solifeService: SolifeService,private _batchService: BatchService, private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {

        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                type: ['', Validators.required],
                language: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                policies: ['', Validators.required],
                // userName: ['', Validators.required],
                // about: ['']
            }),
            step3: this._formBuilder.group({
                parameters: this._formBuilder.group({
                    mailNotification: [true],
                    jsonExtraction: [false],
                    messages: [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });

        this._solifeService.thirdParties$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((policies: ThirdParty[]) => {

                // Update the brands
                this.data = policies;
                // this.dataSource = new MatTableDataSource<ThirdParty>(this.data);
                this.dataSource = new MatTableDataSource<ThirdParty>(this.data);
                // this.dataSource.paginator=this.paginator;
                // Mark for check
                // this._changeDetectorRef.markForCheck();
            });
        // this.dataSource.paginator = this.paginator;
// console.log(this.horizontalStepperForm.get('step1.type').value);
    }

    ngAfterContentChecked() {

        this._changeDetectorRef.detectChanges();

    }

    change(): void {
        console.log(this.horizontalStepperForm.get('type'));
    }

    onSelectionChange(event): void {
        console.log(event.value);
        // perform some logic based on the selected value


    }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;

    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows(): void {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ThirdParty): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        this.selectedThirdPartyNames = this.selection.selected.map(value => value.name);


        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.identifier + 1}`;
    }

    submit(): void {
        const policyNumbers: string[] = this.horizontalStepperForm.get('step2.policies').value;
        const mailNotification: boolean = this.horizontalStepperForm.get('step3.parameters.mailNotification').value;
        const jsonExtraction: boolean = this.horizontalStepperForm.get('step3.parameters.jsonExtraction').value;
        console.log('policyNumbers ',policyNumbers);
        console.log('mailNotification ',mailNotification);
        console.log('jsonExtraction ',jsonExtraction);
        this._batchService.launchBatch(policyNumbers,mailNotification,jsonExtraction).subscribe((response) => {
            // this.policies = response.map(policy => policy.policyNumber);
            // console.log("policies", this.policies)
        });
    }

    updateSelectedData(): void {
        console.log(this.selection.selected);
        this.selectedThirdPartyIdentifiers = this.selection.selected.map(value => value.identifier);
        this._solifeService.getPoliciesByThirdParty(this.selection.selected.map(tp => tp.identifier).join(',')).subscribe((response) => {
            this.policies = response.map(policy => policy.policyNumber);
            console.log("policies", this.policies)
            ;
        });
        console.log(this.selectedThirdPartyIdentifiers);

    }

}
