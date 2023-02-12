import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TableComponent} from '../../solife/thirdparty/table/table.component';
import {PeriodicElement} from "../../solife/policies/policies.component";
import {ThirdParty} from "../../solife/solife.types";

@Component({
    selector     : 'simple-fullwidth-1-content-scroll',
    templateUrl  : './launch-batch.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LaunchBatchComponent implements OnInit
{

    horizontalStepperForm: FormGroup;
    dp: string[] ;

    data: ThirdParty[];
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
    }

    ngOnInit(): void {

        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                type : ['', Validators.required],
                language: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName : ['', Validators.required],
                userName : ['', Validators.required],
                about    : ['']
            }),
            step3: this._formBuilder.group({
                byEmail          : this._formBuilder.group({
                    companyNews     : [true],
                    featuredProducts: [false],
                    messages        : [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
        });

        this.data = [
            {
                fullName: 'fullName', nationality: 'nationality', address: 'address',
                age: 15, birthDate: 'birdDate', gender: 'gender', email: 'email'
            }
        ];
        this.dp = ['name', 'nat', 'address', 'age', 'birdDate', 'gender', 'email'];


// console.log(this.horizontalStepperForm.get('step1.type').value);
    }

    change(): void {
        console.log(this.horizontalStepperForm.get('type'));
    }
    onSelectionChange(event):void {
        console.log(event.value);
        // perform some logic based on the selected value
    }
}
