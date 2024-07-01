import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Location, PlatformLocation } from '@angular/common'
import { MenuService } from 'src/app/services/menu.service'
import { AuthService } from 'src/app/services/auth.service'
interface MenuType {
  title: string
  route?: string

  menuClass?: string
  subMenuClass?: string
  subMenu?: {
    title: string
    route?: string
    img?: string
    themeColor?: string
    subSubMenu?: {
      title: string
      route: string
    }[]
  }[]
}

@Component({
  selector: 'app-header-light7',
  templateUrl: './header-light7.component.html',
  styleUrls: ['./header-light7.component.css'],
})
export class HeaderLight7Component {
  cssUrl: any = ''
  collapseToggle: boolean = false
  searchToggle: boolean = false
  toggleMenu: string = ''
  toggleSubMenu: string = ''
  currentHref: string = ''
  activeMenu: string = ''
  menuData: Transformer[] = []
  sidebarMenu: any
  user: any

  constructor(
    public router: Router,
    private menuService: MenuService,
    private backLocation: PlatformLocation,
    private location: Location,
    private authService: AuthService,
  ) {
    router.events.subscribe((val) => {
      // console.log('router.event-', val)

      if (location.path() != '') {
        this.currentHref = location.path()
      } else {
        this.currentHref = 'Home'
      }
    })

    backLocation.onPopState(() => {
      // back click get url
      // console.log('window-location-path-', window.location.pathname)

      this.handleActiveMenu(window.location.pathname)
    })

    this.themeColor('2')
  }

  ngOnInit(): void {
    this.getMenuData()
    const userData = localStorage.getItem('currentUser')
    console.log('uddd', userData)
    if (userData) {
      this.user = JSON.parse(userData)
    }
  }

  getMenuData() {
    this.menuService.getMenuData().subscribe((data) => {
      this.sidebarMenu = data
    })
    this.handleActiveMenu(this.currentHref)
  }

  themeColor(itme: any) {
    this.cssUrl = document.getElementById('cssFileUrl')
    this.cssUrl.setAttribute('href', 'assets/css/skin/skin-' + itme + '.css')
  }
  clickEvent() {
    // console.log('this', this.collapseToggle)

    this.collapseToggle = !this.collapseToggle
  }
  searchOpen() {
    this.searchToggle = !this.searchToggle
  }
  opneMenu(item: any) {
    console.log('opn', item)

    if (this.toggleMenu != item.toString()) {
      this.toggleMenu = item.toString()
    } else {
      this.toggleMenu = ' '
    }
  }
  opneSubMenu(item: any) {
    if (this.toggleSubMenu != item.toString()) {
      console.log('opn submenu-', item)

      this.toggleSubMenu = item.toString()
    } else {
      this.toggleSubMenu = ' '
    }
  }

  handleActiveMenu(val: any) {
    this.sidebarMenu?.map((data: any, ind: any) => {
      data.subMenu?.map((item: any, ind: any) => {
        // console.log('data', item)

        if (item.route == val) {
          this.activeMenu = data.title
        }
        item.subSubMenu?.map((subTtme: any, ind: any) => {
          if (subTtme.route == val) {
            this.activeMenu = data.title
          }
        })
      })
    })
  }
  handleLogout() {
    console.log('logout handle')
    this.authService.logout()
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 2000)
  }
}
