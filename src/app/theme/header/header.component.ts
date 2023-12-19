import { Component, OnInit } from '@angular/core';
import { ThemeStoreService } from 'src/app/services/theme-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSidebarOpen: boolean;

  constructor(private themeStoreService: ThemeStoreService) {
    this.isSidebarOpen = false;
  }
  onToggle() {
    const isOpen = this.themeStoreService.getCurrentData().sidebar.isOpen;

    if (isOpen) return this.themeStoreService.closeSidebar();
    this.themeStoreService.openSidebar();
  }
  ngOnInit(): void {
    this.themeStoreService.themeData$.subscribe((data) => {
      this.isSidebarOpen = data.sidebar.isOpen;
    });
  }
}
