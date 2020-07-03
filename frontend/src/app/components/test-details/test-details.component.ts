import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../../models/test.model';
import { MatDialog } from "@angular/material/dialog";
import { TestService } from "../../services/test.service";
import { ConfirmInvalidateModalComponent } from "../../modals/confirm-invalidate-modal/confirm-invalidate-modal.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit, OnDestroy {

  public test: Test;
  public result = []
  public htmlString;
  private subscriptions = [];


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private testService: TestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe(data => {
      this.test = data.test
    }));
    this.result = [this.test.payload_data]
    this.htmlString = this.test.payload_text;
  }

  public toggleInvalidateModal() {
    const dialogRef = this.dialog.open(ConfirmInvalidateModalComponent, {
      data: { commit_hash: this.test.commit_hash }
    });
    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.testService.invalidateTest(this.test.id).subscribe((response) => {
          if (response === 'OK') {
            this.router.navigate(['/index']);
          }
        });
      }
    },
      (error) => {
      console.error(error);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      subscription.unsubscribe();
    })
  }
}
