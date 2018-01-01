import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: "list-movies",
    templateUrl: './list.component.html',
    providers: [DataService]
})
export class ListComponent {
    @Input('movies') movies: any;
    @Input('updCol') updCol: any;
    @Input('updParCol') updParCol: any;
    @Input('getRecommendation') getRecommendation: any;
    @Input('recMovies') recMovies:any;
    /// @Input("recommend") recommend:any;
    //@Input('getRecommendation') getRecommendation:any;
    //public buttonClass = "btn-success";
    constructor(private ds: DataService) { }
    public pageTitle: string;
    public actualCol = 3;
    public actualParCol = 12;

    public recommend(movie, event) {
        console.log(movie);
        let self = this;
        let target = event.target || event.srcElement || event.currentTarget;
        if (target.className === "btn btn-success") {
            this.ds.addRecommendation(movie).subscribe((res) => {
                if (self.getRecommendation) {
                    self.getRecommendation();
                }
                console.log(event);
                if (!res.err && res && res.resp && res.resp.id) {
                    target.className = "btn btn-danger";
                    target.innerHTML = "Unrecommend";
                    //target.id = res.resp.id;
                }
            });
        } else {
            this.ds.deleteRecommendation(movie).subscribe(res => {
                if (self.getRecommendation) {
                    self.getRecommendation();
                }
                
                console.log(event);
                if (!res.err) {
                    target.className = "btn btn-success";
                    target.innerHTML = "Recommend";                    
                }
            });
        }
    }

}
