import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeStoreService } from 'src/app/services/theme-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isOpen: boolean;
  currentUrl: string;
  constructor(
    private themeStoreService: ThemeStoreService,
    private router: Router
  ) {
    this.isOpen = true;
    this.currentUrl = '/';
  }
  currentPath() {
    return window.location.pathname;
  }
  onRouteClick() {
    if (this.themeStoreService.getCurrentData().window.width <= 768) {
      this.themeStoreService.closeSidebar();
    }
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd ) => {
        this.currentUrl = event.urlAfterRedirects;
      });
    this.themeStoreService.themeData$.subscribe((data) => {
      this.isOpen = data.sidebar.isOpen;
    });
  }
}
