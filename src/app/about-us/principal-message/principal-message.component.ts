import { Component } from '@angular/core';

@Component({
  selector: 'app-principal-message',
  templateUrl: './principal-message.component.html',
  styleUrls: ['./principal-message.component.css']
})
export class PrincipalMessageComponent {
  banner : any = {
		pagetitle: "Principal Message",
		bg_image: "assets/images/banner/bnr4.jpg",
		title: "Principal Profile",
	}
}
