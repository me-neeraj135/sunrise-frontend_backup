import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin, map } from 'rxjs'

interface Menu {
  _id: number
  title: string
  menuClass: string
  isActive: boolean
  userId: string
  orderBy: number
}

interface SubMenu {
  _id: number
  menuId: number
  title: string
  route: string
  subMenuClass: string
  isActive: boolean
  userId: number
  subSubMenu?: SubSubMenu[]
}

interface SubSubMenu {
  subSubMenuId: number
  subMenuId: number
  title: string
  route: string
  subSubMenuClass: string
  isActive: boolean
  userId: number
}

interface TransformedMenu {
  title: string
  menuClass?: string
  subMenuClass?: string
  subMenu: TransformedSubMenu[]
}

interface TransformedSubMenu {
  title: string
  route?: string
  subSubMenu?: TransformedSubMenu[]
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'http://localhost:5000/api/menus'

  constructor(private http: HttpClient) {}

  private getLoggedInUserId(): number {
    // Replace this with actual logic to get the logged-in user ID
    return 1
  }

  getMenuData3(): Observable<TransformedMenu> {
    return this.http.get<any>(this.apiUrl)
  }

  getMenuData(userType: any): Observable<TransformedMenu[]> {
    const menuUrl = 'http://localhost:5000/api/menus'
    const subMenuUrl = 'http://localhost:5000/api/submenus'
    const loggedInUserId =
      userType == 'admin'
        ? '66a5d530e5d656345c0862be'
        : '6693c7b58b3d3bde81ec497a'

    return forkJoin([
      this.http.get<Menu[]>(menuUrl),
      this.http.get<SubMenu[]>(subMenuUrl),
    ]).pipe(
      map(([menus, subMenus]) => {
        // Filter menus by logged-in user ID and sort by 'order'
        const filteredMenus = menus
          .filter((menu) => menu.userId === loggedInUserId)
          .sort((a, b) => a.orderBy - b.orderBy)

        const transformedMenus: TransformedMenu[] = filteredMenus.map(
          (menu) => {
            const relevantSubMenus = subMenus.filter(
              (subMenu) => subMenu.menuId === menu._id,
            )
            const transformedSubMenus: TransformedSubMenu[] = relevantSubMenus.map(
              (subMenu) => ({
                title: subMenu.title,
                route: subMenu.route,
                subSubMenu: subMenu.subSubMenu?.map((subSub) => ({
                  title: subSub.title,
                  route: subSub.route,
                })),
              }),
            )

            return {
              title: menu.title,
              menuClass: menu.menuClass,
              subMenuClass: relevantSubMenus.length
                ? relevantSubMenus[0].subMenuClass
                : undefined,
              subMenu: transformedSubMenus,
            }
          },
        )

        return transformedMenus
      }),
    )
  }
}
