import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { RecommendationComponent } from './../recommendation/recommendation.component';
@Component({

	templateUrl: './dashboard.component.html',
	providers: [DataService]
})
export class DashboardComponent implements OnInit {
	//public pageTitle: string = 'Dashboard';
	public pageTitle: string;
	hideElement:number=1;
	selectedIndex: number = 0;
	popularMovies = [];
	upcomingMovies = [];
	recommendations;
	constructor(private ds: DataService) {
		this.pageTitle = "DashBoard";

		this.recommendations = new RecommendationComponent(ds);


	}

	getRecommendations() {
		this.recommendations.getRecommendation();
	}

	clickMe(param) {

		this.hideElement = param;
		//if(param == 3) this.recommendations = recommend.recommendations;
		/*if (param == 1) {
			this.hideElement = true;
		} else {
			this.hideElement = false;
		}*/

	}
	ngOnInit() {

		this.ds.getData().subscribe((res) => {
			if (res.err) {
				return alert(res.err);
			}
			try {
				var popularMovies = JSON.parse(res.resp.popularMovies);
				var upcoming = JSON.parse(res.resp.upcomingMovies);
			} catch (e) {
				console.log("Invalid JSON");
				return;
			}

			if (popularMovies && popularMovies.results && popularMovies.results.length) {
				this.popularMovies = popularMovies.results;
			}

			if (upcoming && upcoming.results && upcoming.results.length) {
				this.upcomingMovies = upcoming.results;
			}
			this.getRecommendations();

		});
	}

}
