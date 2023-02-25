import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
// import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import {BatchJobPagination, JobExecution} from "../batch.types";
import {BatchService} from "../launch/launch-batch.service";

@Component({
    selector     : 'simple-fullwidth-1-content-scroll',
    templateUrl  : './batch-jobs.component.html',
    styles         : [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class BatchJobsComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    jobExecutions$: Observable<JobExecution[]>;


    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: BatchJobPagination;
    searchInputControl: FormControl = new FormControl();
    selectedProduct: JobExecution | null = null;
    selectedProductForm: FormGroup;
    tagsEditMode: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _batchService: BatchService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            id               : [''],
            category         : [''],
            name             : ['', [Validators.required]],
            description      : [''],
            tags             : [[]],
            sku              : [''],
            barcode          : [''],
            brand            : [''],
            vendor           : [''],
            stock            : [''],
            reserved         : [''],
            cost             : [''],
            basePrice        : [''],
            taxPercent       : [''],
            price            : [''],
            weight           : [''],
            thumbnail        : [''],
            images           : [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active           : [false]
        });

        // Get the brands
        // this._batchService.brands$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((brands: InventoryBrand[]) => {
        //
        //         // Update the brands
        //         this.brands = brands;
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the categories
        // this._batchService.categories$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((categories: InventoryCategory[]) => {
        //
        //         // Update the categories
        //         this.categories = categories;
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the pagination
        this._batchService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: BatchJobPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the products
        this.jobExecutions$ = this._batchService.jobExecutions$;

        // Get the tags
        // this._batchService.tags$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((tags: InventoryTag[]) => {
        //
        //         // Update the tags
        //         this.tags = tags;
        //         this.filteredTags = tags;
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the vendors
        // this._batchService.vendors$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((vendors: InventoryVendor[]) => {
        //
        //         // Update the vendors
        //         this.vendors = vendors;
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._batchService.getJobExecutions(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        if ( this._sort && this._paginator )
        {
            // Set the initial sort
            this._sort.sort({
                id          : 'name',
                start       : 'asc',
                disableClear: true
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.closeDetails();
                    this.isLoading = true;
                    return this._batchService.getJobExecutions(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */
    toggleDetails(productId: number): void
    {
        // If the product is already selected...
        if ( this.selectedProduct && this.selectedProduct.id === productId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        // Get the product by id
        //TODO update this late
        // this._batchService.getProductById(productId)
        //     .subscribe((product) => {
        //
        //         // Set the selected product
        //         this.selectedProduct = product;
        //
        //         // Fill the form
        //         this.selectedProductForm.patchValue(product);
        //
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }

    /**
     * Close the details
     */
    closeDetails(): void
    {
        this.selectedProduct = null;
    }

    /**
     * Cycle through images of selected product
     */
    cycleImages(forward: boolean = true): void
    {
        // Get the image count and current image index
        const count = this.selectedProductForm.get('images').value.length;
        const currentIndex = this.selectedProductForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if ( forward )
        {
            this.selectedProductForm.get('currentImageIndex').setValue(nextIndex);
        }
        // If cycling backwards...
        else
        {
            this.selectedProductForm.get('currentImageIndex').setValue(prevIndex);
        }
    }

    // /**
    //  * Toggle the tags edit mode
    //  */
    // toggleTagsEditMode(): void
    // {
    //     this.tagsEditMode = !this.tagsEditMode;
    // }

    /**
     * Filter tags
     *
     * @param event
     */
    // filterTags(event): void
    // {
    //     // Get the value
    //     const value = event.target.value.toLowerCase();
    //
    //     // Filter the tags
    //     this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
    // }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    // filterTagsInputKeyDown(event): void
    // {
    //     // Return if the pressed key is not 'Enter'
    //     if ( event.key !== 'Enter' )
    //     {
    //         return;
    //     }
    //
    //     // If there is no tag available...
    //     if ( this.filteredTags.length === 0 )
    //     {
    //         // Create the tag
    //         this.createTag(event.target.value);
    //
    //         // Clear the input
    //         event.target.value = '';
    //
    //         // Return
    //         return;
    //     }
    //
    //     // If there is a tag...
    //     const tag = this.filteredTags[0];
    //     const isTagApplied = this.selectedProduct.tags.find(id => id === tag.id);
    //
    //     // If the found tag is already applied to the product...
    //     if ( isTagApplied )
    //     {
    //         // Remove the tag from the product
    //         this.removeTagFromProduct(tag);
    //     }
    //     else
    //     {
    //         // Otherwise add the tag to the product
    //         this.addTagToProduct(tag);
    //     }
    // }

    /**
     * Create a new tag
     *
     * @param title
     */
    // createTag(title: string): void
    // {
    //     const tag = {
    //         title
    //     };
    //
    //     // Create tag on the server
    //     this._inventoryService.createTag(tag)
    //         .subscribe((response) => {
    //
    //             // Add the tag to the product
    //             this.addTagToProduct(response);
    //         });
    // }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    // updateTagTitle(tag: InventoryTag, event): void
    // {
    //     // Update the title on the tag
    //     tag.title = event.target.value;
    //
    //     // Update the tag on the server
    //     this._batchService.updateTag(tag.id, tag)
    //         .pipe(debounceTime(300))
    //         .subscribe();
    //
    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Delete the tag
     *
     * @param tag
     */
    // deleteTag(tag: InventoryTag): void
    // {
    //     // Delete the tag from the server
    //     this._batchService.deleteTag(tag.id).subscribe();
    //
    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Add tag to the product
     *
     * @param tag
     */
    // addTagToProduct(tag: InventoryTag): void
    // {
    //     // Add the tag
    //     this.selectedProduct.tags.unshift(tag.id);
    //
    //     // Update the selected product form
    //     this.selectedProductForm.get('tags').patchValue(this.selectedProduct.tags);
    //
    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Remove tag from the product
     *
     * @param tag
     */
    // removeTagFromProduct(tag: InventoryTag): void
    // {
    //     // Remove the tag
    //     this.selectedProduct.tags.splice(this.selectedProduct.tags.findIndex(item => item === tag.id), 1);
    //
    //     // Update the selected product form
    //     this.selectedProductForm.get('tags').patchValue(this.selectedProduct.tags);
    //
    //     // Mark for check
    //     this._changeDetectorRef.markForCheck();
    // }

    /**
     * Toggle product tag
     *
     * @param tag
     * @param change
     */
    // toggleProductTag(tag: InventoryTag, change: MatCheckboxChange): void
    // {
    //     if ( change.checked )
    //     {
    //         this.addTagToProduct(tag);
    //     }
    //     else
    //     {
    //         this.removeTagFromProduct(tag);
    //     }
    // }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    // shouldShowCreateTagButton(inputValue: string): boolean
    // {
    //     return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    // }

    /**
     * Create product
     */
    // createProduct(): void
    // {
    //     // Create the product
    //     this._batchService.createProduct().subscribe((newProduct) => {
    //
    //         // Go to new product
    //         this.selectedProduct = newProduct;
    //
    //         // Fill the form
    //         this.selectedProductForm.patchValue(newProduct);
    //
    //         // Mark for check
    //         this._changeDetectorRef.markForCheck();
    //     });
    // }

    /**
     * Update the selected product using the form data
     */
    // not needed
    // updateSelectedProduct(): void
    // {
    //     // Get the product object
    //     const product = this.selectedProductForm.getRawValue();
    //
    //     // Remove the currentImageIndex field
    //     delete product.currentImageIndex;
    //
    //     // Update the product on the server
    //     this._batchService.updateProduct(product.id, product).subscribe(() => {
    //
    //         // Show a success message
    //         this.showFlashMessage('success');
    //     });
    // }

    /**
     * Delete the selected product using the form data
     */
//    Not needed
    // deleteSelectedProduct(): void
    // {
    //     // Open the confirmation dialog
    //     const confirmation = this._fuseConfirmationService.open({
    //         title  : 'Delete product',
    //         message: 'Are you sure you want to remove this product? This action cannot be undone!',
    //         actions: {
    //             confirm: {
    //                 label: 'Delete'
    //             }
    //         }
    //     });
    //
    //     // Subscribe to the confirmation dialog closed action
    //     confirmation.afterClosed().subscribe((result) => {
    //
    //         // If the confirm button pressed...
    //         if ( result === 'confirmed' )
    //         {
    //
    //             // Get the product object
    //             const product = this.selectedProductForm.getRawValue();
    //
    //             // Delete the product on the server
    //             this._batchService.deleteProduct(product.id).subscribe(() => {
    //
    //                 // Close the details
    //                 this.closeDetails();
    //             });
    //         }
    //     });
    // }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {

            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
