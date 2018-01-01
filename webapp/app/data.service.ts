import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {


  constructor(private http: Http) { }

  public getData() {
    return this.http.get("/dashboard").map(res => res.json());
  }

  public searchMovies(key) {
    return this.http.get("/search/" + key).map(res => res.json());
  }

  public addRecommendation(movie) {
    return this.http.post("/recommendation", movie).map(res => res.json());
  }

  public deleteRecommendation(movie) {
    return this.http.delete("/recommendation", { body: movie }).map(res => res.json());
  }

  public getRecommendation() {
    return this.http.get("/recommendation").map(res => res.json());
  }
}