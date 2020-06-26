import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../../models/test.model';
import { TestService } from '../../services/test.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  public test: Test;
  public result = []
  public htmlString;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.test = data.test
      })
      this.result = [this.test.payload_data]
      this.htmlString = this.test.payload_text;
  }
}
