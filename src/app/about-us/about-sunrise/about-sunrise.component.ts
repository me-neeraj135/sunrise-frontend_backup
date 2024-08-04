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
  skills: any = {
    title: "About our School",
    sub_title: "Knowledge for everyone",
    content: "<p>Welcome to Sunrise National Public School, where we nurture young minds from playgroup (PG) to 8th grade. Our school is equipped with state-of-the-art facilities, including a modern computer lab, a wide range of extracurricular activities, and reliable vehicle services. We are committed to providing a holistic educational experience that fosters academic excellence, creativity, and overall development in a safe and supportive environment. Join us to give your child the best start in their educational journey.</p><ul class='list-check circle primary text-black'><li>Holistic Development: Emphasis on academic excellence, creativity, and personal growth.</li><li>Parental Involvement: Regular updates and meetings to keep parents involved in their child's education.</li><li>Safety and Security: Robust measures to ensure the safety of all students.</li></ul>",
    content_link: "/about-sunrise",
    //exp_content: "<h2 class='no-title'>15+</h2><h4 class='title'>Years Experience Working</h4>",
    images_data: {
      "img1": "assets/images/about/about2/school_pic.jpg",
      //"img2": "assets/images/about/about2/pic4.jpg"
    },
  };
}
