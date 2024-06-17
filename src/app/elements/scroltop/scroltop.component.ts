import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@Component({
  selector: 'app-scroltop',
  templateUrl: './scroltop.component.html',
  styleUrls: ['./scroltop.component.css'],
})
export class ScroltopComponent {
  scroll_top() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
}
