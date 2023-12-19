import { Injectable,OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface SidebarData {
  isOpen: boolean;
}

interface ThemeData {
  sidebar: SidebarData;
  window: {
    height: number;
    width: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ThemeStoreService implements OnDestroy {
  _resizeCallBack: any;
  private initialThemeData: ThemeData = {
    sidebar: {
      isOpen: true,
    },
    window: {
      height: 0,
      width: 0,
    },
  };
  private themeDataSource = new BehaviorSubject(this.initialThemeData);
  themeData$ = this.themeDataSource.asObservable();
  constructor() {
    this._resizeCallBack = () => {
      const width: number = document.body.clientWidth;
      const height: number = document.body.clientHeight;
      if (width >= 768) {
        this.openSidebar();
      } else {
        this.closeSidebar();
      }
      this.themeDataSource.next({
        ...this.themeDataSource.value,
        window: {
          height,
          width,
        },
      });
    };
    addEventListener('resize', this._resizeCallBack);
    this._resizeCallBack();
  }

  openSidebar(): void {
    this.themeDataSource.next({
      ...this.themeDataSource.value,
      sidebar: { isOpen: true },
    });
  }

  closeSidebar(): void {
    this.themeDataSource.next({
      ...this.themeDataSource.value,
      sidebar: { isOpen: false },
    });
  }
  getCurrentData() {
    return this.themeDataSource.value;
  }
  
  ngOnDestroy() {
    removeEventListener('resize', this._resizeCallBack);
  }
}
