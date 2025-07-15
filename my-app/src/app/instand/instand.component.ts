import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class SomethingService {

  constructor() { }
}


@Component({
  selector: 'app-instand',
  templateUrl: './instand.component.html',
  styleUrls: ['./instand.component.scss'],
  providers: [],
  viewProviders: []
})
export class InstandComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      const name = params.get('name');

      console.log(`id: ${id}`);
      console.log(`name: ${name}`);
    });
  }

  change() {
    this.router.navigate(['first'], {relativeTo: this.route})
  }
}
