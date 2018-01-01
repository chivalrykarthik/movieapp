import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecommendationComponent } from './recommendation/recommendation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './data.service';
import {ListComponent} from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationComponent,
    DashboardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
