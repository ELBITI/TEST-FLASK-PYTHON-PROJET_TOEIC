import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  template: `<p>Data: {{ data }}</p>`
})
export class TestComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(
      response => {
        this.data = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
