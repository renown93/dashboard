import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsDataService } from 'src/app/services/product-store.service';
import { TableData } from 'src/app/shared/models/table-data.model';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableViewComponent implements OnInit, OnDestroy {
  productsData: TableData<Product>;
  private subscription: Subscription | null;

  constructor(
    private productsDataService: ProductsDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = null;
    this.productsData = {
      title: '',
      items: [],
      limit: 0,
      currentPage: 0,
      total: 0,
      skip: 0,
      totalPage: 0,
      orderDirection: 'asc',
      orderId: null,
      error: null,
      isLoading: false,
    };
  }

  performSort(event: { column: string; direction: 'asc' | 'desc' }) {
    const currentData = this.productsDataService.getCurrentData();
    this.productsDataService.performSort(event, currentData);
  }
  performFetch(event: { page: number; limit: number }) {
    
    this.productsDataService.performFetch({
      page: event.page,
      limit: event.limit,
    });
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.subscription = this.productsDataService.productsData$.subscribe(
      (data) => {
        this.productsData = data;
        this.cdr.markForCheck();
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe?.();
  }
}
