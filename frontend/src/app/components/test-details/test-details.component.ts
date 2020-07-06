import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../../models/test.model';
import { MatDialog } from "@angular/material/dialog";
import { TestService } from "../../services/test.service";
import { ConfirmInvalidateModalComponent } from "../../modals/confirm-invalidate-modal/confirm-invalidate-modal.component";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

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
  public user: User;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private testService: TestService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe(data => {
      this.test = data.test
    }));
    this.result = [this.test.payload_data]
    this.htmlString = this.test.payload_text;
    this.subscriptions.push(this.authService.getCurrentUser().subscribe((data) => this.user = data));
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
