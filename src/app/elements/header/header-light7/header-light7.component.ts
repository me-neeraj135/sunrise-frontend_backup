import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';

interface MenuType {
  title: string;
  route?: string;
  menuClass?: string;
  subMenuClass?: string;
  subMenu?: {
    title: string;
    route?: string;
    img?: string;
    themeColor?: string;
    subSubMenu?: {
      title: string;
      route: string;
    }[];
  }[];
}

@Component({
  selector: 'app-header-light7',
  templateUrl: './header-light7.component.html',
  styleUrls: ['./header-light7.component.css'],
})
export class HeaderLight7Component {
  cssUrl: any = '';
  collapseToggle: boolean = false;
  searchToggle: boolean = false;
  toggleMenu: string = '';
  toggleSubMenu: string = '';
  currentHref: string = '';
  activeMenu: string = '';
  menuData: MenuType[] = [];
  sidebarMenu: any;
  user: any;

  constructor(
    public router: Router,
    private menuService: MenuService,
    private backLocation: PlatformLocation,
    private location: Location,
    private authService: AuthService,
  ) {
    router.events.subscribe((val) => {
      this.currentHref = location.path() !== '' ? location.path() : 'Home';
    });

    backLocation.onPopState(() => {
      this.handleActiveMenu(window.location.pathname);
    });

    this.themeColor('2');
  }

  ngOnInit(): void {
    var user = this.checkLoginStatus();
    var userType = null;
    if(user != null){
      userType = user['userType']
    }
    this.getMenuData(userType);  
  }

  getMenuData(userType: any) {
    this.menuService.getMenuData(userType).subscribe((data) => {
      this.sidebarMenu = data;
    });
    this.handleActiveMenu(this.currentHref);
  }
  checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : null;
    return this.user;
  }

  themeColor(itme: any) {
    this.cssUrl = document.getElementById('cssFileUrl');
    this.cssUrl.setAttribute('href', 'assets/css/skin/skin-' + itme + '.css');
  }

  clickEvent() {
    this.collapseToggle = !this.collapseToggle;
  }

  searchOpen() {
    this.searchToggle = !this.searchToggle;
  }

  opneMenu(item: any) {
    this.toggleMenu = this.toggleMenu !== item.toString() ? item.toString() : ' ';
  }

  opneSubMenu(item: any) {
    this.toggleSubMenu = this.toggleSubMenu !== item.toString() ? item.toString() : ' ';
  }

  handleActiveMenu(val: any) {
    this.sidebarMenu?.forEach((data: any) => {
      data.subMenu?.forEach((item: any) => {
        if (item.route === val) {
          this.activeMenu = data.title;
        }
        item.subSubMenu?.forEach((subTtme: any) => {
          if (subTtme.route === val) {
            this.activeMenu = data.title;
          }
        });
      });
    });
  }

  handleLogout() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
