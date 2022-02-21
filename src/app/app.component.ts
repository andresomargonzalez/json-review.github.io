import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'website';
  displayedColumns: string[] = ['description', 'brandName', 'foodCategory', 'marketCountry', 'packageWeight', 'servingSize'];
  dataSource: any = [];
  value: string = 'Cheddar Cheese';

  constructor(private http: HttpClient) {

  }

  async ngOnInit() {
    const { foods }: any  = await this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${this.value}`).toPromise();
    this.dataSource = foods
  }

  async onSearch() {
    const { foods }: any  = await this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${this.value}`).toPromise();
    this.dataSource = foods
    console.log(foods);
  }
}
