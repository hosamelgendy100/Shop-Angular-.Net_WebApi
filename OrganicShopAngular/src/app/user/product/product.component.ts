import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    ViewChild,OnInit
  } from "@angular/core";

import { shuffle } from "lodash-es";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { from } from "rxjs/observable/from";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { IPaginableProduct, IPagination,IProduct } from "./app.interfaces";
import { AppService } from "./app.service";

import {
    DatatablePaginationEvent,
    DatatableSelectionEvent,
    DatatableSortEvent,
    DatatableSortType,
    MatDataTableComponent,
    MatDataTablePaginationComponent
  } from "ng2-md-datatable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnDestroy,OnInit{
    title = "Product";

    Products$: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
    currentSelection$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  
    currentSortBy: string | undefined;
    currentSortType = DatatableSortType.None;
    currentPagination = {
      currentPage: 1,
      itemsPerPage: 8,
      totalCount: 0
    } as IPagination;
  
    @ViewChild(MatDataTableComponent) datatable: MatDataTableComponent;
    @ViewChild(MatDataTablePaginationComponent)
    pagination: MatDataTablePaginationComponent;
  
    private unmount$: Subject<void> = new Subject<void>();
  
    constructor(
      private appService: AppService,
      private changeDetectorRef: ChangeDetectorRef
    ) {
      
    }
  
    ngOnInit() {
      if (this.datatable) {
        from(this.datatable.selectionChange)
          .pipe(takeUntil(this.unmount$))
          .subscribe((e: DatatableSelectionEvent) => {
            this.currentSelection$.next(e.selectedValues);
            this.changeDetectorRef.detectChanges();
          });
  
        from(this.datatable.sortChange)
          .pipe(takeUntil(this.unmount$))
          .subscribe((e: DatatableSortEvent) =>
            this.fetchDemoDataSource(
              this.currentPagination.currentPage,
              this.currentPagination.itemsPerPage,
              e.sortBy,
              e.sortType
            )
          );
  
        from(this.pagination.paginationChange)
          .pipe(takeUntil(this.unmount$))
          .subscribe((e: DatatablePaginationEvent) =>
            this.fetchDemoDataSource(e.page, e.itemsPerPage)
          );
  
        this.fetchDemoDataSource();
      }
    }
  
    ngOnDestroy() {
      this.unmount$.next();
      this.unmount$.complete();
    }
  
    shuffleData() {
      this.Products$.next(shuffle(this.Products$.getValue()));
      this.currentSelection$.next([]);
      this.changeDetectorRef.detectChanges();
    }
  
    private fetchDemoDataSource(
      page: number = this.currentPagination.currentPage,
      limit: number = this.currentPagination.itemsPerPage,
      sortBy: string | undefined = this.currentSortBy,
      sortType: DatatableSortType = this.currentSortType
    ) {
      if (sortBy) {
        this.currentSortBy = sortBy;
        this.currentSortType = sortType;
      }
     console.log(this.appService.getProductList(
        page,
        limit,
        sortBy,
        sortType
      ));

      this.appService.getProductList( page,
        limit,
        sortBy,
        sortType
      ).
      then(response=>{
        const { product, pagination } = this.appService.getDemoDatasource(
          page,
          limit,
          sortBy,
          sortType
        )
        this.Products$.next(product);
        this.currentSelection$.next([]);
        this.currentPagination = pagination;
        this.changeDetectorRef.detectChanges();
      });   
     
    }
    DeleteBulk()
    {
      
    }
  }
 