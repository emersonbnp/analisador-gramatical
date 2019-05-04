import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Input() param: string;
  @Input() modelo: any;
  display = false;
  constructor() { }

  ngOnInit() {
  }

  change() {
    console.log(this.modelo);
    this.param = this.modelo.nome;
  }

  changeDisplay() {
    this.display = !this.display;
  }

}
