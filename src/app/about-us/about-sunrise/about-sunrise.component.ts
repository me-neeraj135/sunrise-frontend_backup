import { Component } from '@angular/core';

@Component({
  selector: 'app-about-sunrise',
  templateUrl: './about-sunrise.component.html',
  styleUrls: ['./about-sunrise.component.css']
})
export class AboutSunriseComponent {
  banner : any = {
		pagetitle: "About Sunrise",
		bg_image: "assets/images/banner/bnr3.jpg",
		title: "About Sunrise",
	}
}
