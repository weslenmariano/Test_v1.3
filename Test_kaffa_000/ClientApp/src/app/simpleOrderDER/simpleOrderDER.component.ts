import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simpleOrderDER',
  templateUrl: './simpleOrderDER.component.html',
  styleUrls: ["./simpleOrderDER.component.css"],
})
export class SimpleOrderDERComponent {


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

  }

  ngOnInit(): void {

  }
}
