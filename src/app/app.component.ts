import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator | any ;
  title = 'website';
  displayedColumns: string[] = ['description', 'brandOwner', 'brandName', 'foodCategory', 'marketCountry', 'packageWeight', 'servingSize'];
  dataSource: any = [];
  value: string = 'Cheddar Cheese';
  totalResults: number = 0;

  constructor(private http: HttpClient) {

  }

  async ngOnInit() {
    try {
      const {
        foods,
        totalHits: totalResults
      }: any = await this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${this.value}&pageNumber=1`).toPromise();
      this.totalResults = totalResults;
      this.dataSource = foods;
      this.paginator.firstPage();
    } catch (e: any) {
      console.log(e);
      alert(e.error.error.message);
    }
  }

  async onSearch() {
    try {
      const {
        foods,
        totalHits: totalResults
      }: any = await this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${this.value}&pageNumber=1`).toPromise();
      this.totalResults = totalResults;
      this.dataSource = foods;
      this.paginator.firstPage();
      console.log(foods);
    } catch (e: any) {
      console.log(e);
      alert(e.error.error.message);
    }

  }

  async onPageChange(data: any) {
    try {
      const {pageIndex} = data;
      const {foods}: any = await this.http.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${this.value}&pageNumber=${pageIndex + 1}`).toPromise();
      this.dataSource = foods;
    } catch (e: any) {
      alert(e.error.error.message);
    }
  }
}
