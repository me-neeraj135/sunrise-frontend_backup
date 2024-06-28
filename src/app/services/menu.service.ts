import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

interface Menu {
  Id: number;
  title: string;
  menuClass: string;
  isActive: boolean;
  userId: number;
  order: number;
}

interface SubMenu {
  subMenuId: number;
  menuId: number;
  title: string;
  route: string;
  subMenuClass: string;
  isActive: boolean;
  userId: number;
  subSubMenu?: SubSubMenu[];
}

interface SubSubMenu {
  subSubMenuId: number;
  subMenuId: number;
  title: string;
  route: string;
  subSubMenuClass: string;
  isActive: boolean;
  userId: number;
}

interface TransformedMenu {
  title: string;
  menuClass?: string;
  subMenuClass?: string;
  subMenu: TransformedSubMenu[];
}

interface TransformedSubMenu {
  title: string;
  route?: string;
  subSubMenu?: TransformedSubMenu[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  private getLoggedInUserId(): number {
    // Replace this with actual logic to get the logged-in user ID
    return 1;
  }

  getMenuData(): Observable<TransformedMenu[]> {
    const menuUrl = 'assets/data/menu.json';
    const subMenuUrl = 'assets/data/sub-menu.json';
    const loggedInUserId = this.getLoggedInUserId();

    return forkJoin([this.http.get<Menu[]>(menuUrl), this.http.get<SubMenu[]>(subMenuUrl)]).pipe(
      map(([menus, subMenus]) => {
        // Filter menus by logged-in user ID and sort by 'order'
        const filteredMenus = menus.filter(menu => menu.userId === loggedInUserId).sort((a, b) => a.order - b.order);

        const transformedMenus: TransformedMenu[] = filteredMenus.map((menu) => {
          const relevantSubMenus = subMenus.filter((subMenu) => subMenu.menuId === menu.Id);
          const transformedSubMenus: TransformedSubMenu[] = relevantSubMenus.map((subMenu) => ({
            title: subMenu.title,
            route: subMenu.route,
            subSubMenu: subMenu.subSubMenu?.map((subSub) => ({
              title: subSub.title,
              route: subSub.route,
            })),
          }));

          return {
            title: menu.title,
            menuClass: menu.menuClass,
            subMenuClass: relevantSubMenus.length ? relevantSubMenus[0].subMenuClass : undefined,
            subMenu: transformedSubMenus,
          };
        });

        return transformedMenus;
      })
    );
  }
}
