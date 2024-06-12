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
  selector: 'app-header-light3',
  templateUrl: './header-light3.component.html',
  styleUrls: ['./header-light3.component.css'],
})
export class HeaderLight3Component {
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

    if (this.router.url == '/home-university') {
      this.themeColor('1')
    }
  }

  ngOnInit(): void {
    this.handleActiveMenu(this.currentHref)
  }

  themeColor(itme: any) {
    this.cssUrl = document.getElementById('cssFileUrl')
    this.cssUrl.setAttribute('href', 'assets/css/skin/skin-' + itme + '.css')
  }
  clickEvent() {
    this.collapseToggle = !this.collapseToggle
  }
  searchOpen() {
    this.searchToggle = !this.searchToggle
  }
  opneMenu(item: any) {
    if (item === 0) {
      this.router.navigate(['/home-school'])
    } else if (item === 1) {
      this.router.navigate(['/about-1'])
    } else if (item === 4) {
      this.router.navigate(['/blog-half-img'])
    } else if (item === 5) {
      this.router.navigate(['/contact-1'])
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
      title: 'Home',
      route: '/home-school',
    },
    {
      title: 'About Us',
      route: '/about-1',
    },
    {
      title: 'Academics',
      menuClass: 'has-mega-menu',
      subMenuClass: 'mega-menu',
      subMenu: [
        {
          title: 'About Us and Services',
          subSubMenu: [
            {
              title: 'Services 1',
              route: '/services-1',
            },
            {
              title: 'Faqs',
              route: '/faq-1',
            },
          ],
        },
        {
          title: 'Teachers and Course',
          subSubMenu: [
            {
              title: 'Teachers',
              route: '/teacher',
            },
            {
              title: 'Teachers Profile',
              route: '/teachers-profile',
            },
            {
              title: 'Courses',
              route: '/courses',
            },
            {
              title: 'Courses Details',
              route: '/courses-details',
            },
            {
              title: 'Events',
              route: '/event',
            },
          ],
        },
        {
          title: 'Events and Help',
          subSubMenu: [
            {
              title: 'Events Details',
              route: '/event-details',
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
      ],
    },
    {
      title: 'Shop',
      subMenuClass: 'sub-menu',
      subMenu: [
        {
          title: "Let's Shop",
          route: '/shop-sidebar',
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
    },
    {
      title: 'Testimonials',
      route: '/blog-half-img',

      menuClass: 'has-mega-menu',
    },
    {
      title: 'Contact Us',
      route: '/contact-1',
    },
  ]
}
