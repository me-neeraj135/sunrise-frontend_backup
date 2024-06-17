import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Location, PlatformLocation } from '@angular/common'

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

  constructor(
    public router: Router,

    private backLocation: PlatformLocation,
    private location: Location,
  ) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path()
      } else {
        this.currentHref = 'Home'
      }
    })

    backLocation.onPopState(() => {
      // back click get url
      this.handleActiveMenu(window.location.pathname)
    })

    this.themeColor('2')
  }

  ngOnInit(): void {
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

    if (item === 3) {
      this.router.navigate(['/blog-half-img'])
    } else if (this.toggleMenu != item.toString()) {
      this.toggleMenu = item.toString()
    } else {
      this.toggleMenu = ' '
    }
  }
  opneSubMenu(item: any) {
    if (this.toggleSubMenu != item.toString()) {
      this.toggleSubMenu = item.toString()
    } else {
      this.toggleSubMenu = ' '
    }
  }

  handleActiveMenu(val: any) {
    this.sidebarMenu.map((data: any, ind: any) => {
      data.subMenu?.map((item: any, ind: any) => {
        console.log('data', item)

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

  sidebarMenu: MenuType[] = [
    {
      title: 'About Us',
      subMenuClass: 'sub-menu',
      subMenu: [
        {
          title: 'About Sunrise',
          route: '/about-sunrise',
        },
        {
          title: "Principal's Message",
          route: '/principal-message',
        },
      ],
    },
    {
      title: 'Academics',
      menuClass: 'has-mega-menu',
      subMenuClass: 'mega-menu',
      subMenu: [
        {
          title: 'Explore',
          subSubMenu: [
            {
              title: 'Teachers',
              route: '/teacher',
            },
            {
              title: 'Events',
              route: '/event',
            },
            {
              title: 'Services',
              route: '/services-1',
            },
            {
              title: 'Courses',
              route: '/courses',
            },
            {
              title: 'Courses Details',
              route: '/courses-details',
            },
          ],
        },
        {
          title: 'Gallery',
          subSubMenu: [
            {
              title: 'Gallery Grid 2',
              route: '/gallery-grid-2',
            },
            {
              title: 'Gallery Grid 3',
              route: '/gallery-grid-3',
            },
            {
              title: 'Gallery Grid 4',
              route: '/gallery-grid-4',
            },
          ],
        },
        {
          title: 'Support',
          subSubMenu: [
            {
              title: 'FAQ',
              route: '/faq-1',
            },
            {
              title: 'Help Desk',
              route: '/help-desk',
            },
            {
              title: 'Privacy Policy',
              route: '/privacy-policy',
            },
          ],
        },
      ],
    },
    {
      title: 'Inventory',
      subMenuClass: 'sub-menu',
      subMenu: [
        {
          title: 'Products',
          route: '/product',
        },
        {
          title: 'Product Details',
          route: '/shop-product-details',
        },
        {
          title: 'Cart',
          route: '/shop-cart',
        },
        {
          title: 'Wishlist',
          route: '/shop-wishlist',
        },
        {
          title: 'Checkout',
          route: '/shop-checkout',
        },
        {
          title: 'Login',
          route: '/shop-login',
        },
        {
          title: 'Register',
          route: '/shop-register',
        },
      ],
    }
  ]
}
