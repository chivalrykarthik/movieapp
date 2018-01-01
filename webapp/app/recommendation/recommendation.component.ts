import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
    selector: "recommend",
    moduleId: module.id,
    templateUrl: './recommendation.component.html',
    providers: [DataService]
})
export class RecommendationComponent implements OnInit {
    public pageTitle: string = 'Recommendation';
    public searchResults;
    public recommendations;
    public movieIDs=[];
    constructor(private ds: DataService) {

    }
    public searchMovies(key) {

        this.ds.searchMovies(key).subscribe((res) => {
            if (res.err) {
                return alert(res.err);
            }
            try {
                var movies = JSON.parse(res.resp);

            } catch (e) {
                console.log("Invalid JSON");
                return;
            }

            this.searchResults = movies.results;


        });
    }

    public getRecommendation() {
        this.ds.getRecommendation().subscribe(res => {
            if (res.err) {
                return console.log("Error in feching recommendation");
            }
            this.recommendations = res.resp;
            if (res.resp && res.resp.length) {
                res.resp.forEach(val => {
                    this.movieIDs.push(val.id);
                });
            }
            console.log(this.movieIDs);
        });
    }

    ngOnInit() {
        this.getRecommendation();
    }

}
