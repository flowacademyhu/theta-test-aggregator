import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ApiKey } from 'src/app/models/apiKey-model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApikeyService } from '../../services/apikey.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-api-key-manager',
  templateUrl: './api-key-manager.component.html',
  styleUrls: ['./api-key-manager.component.css']
})
export class ApiKeyManagerComponent implements OnInit, DoCheck, OnDestroy {

  constructor(private apiKeyService: ApikeyService, private dialog: MatDialog, private route: ActivatedRoute) { }

  public apikeys: ApiKey[];
  subscriptions$: Subscription[] = [];

  ngOnInit(): void {
   this.route.data.subscribe((data) => {
     this.apikeys = data.apikeys;
    });
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  public toggleDeleteModal(apikey) {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: { git_user: 'this apikey' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiKeyService.deleteApiKey(apikey.id).subscribe(() => {
          this.apiKeyService.fetchApiKeys().subscribe((data) => {
            this.apikeys = data;
          });
        });
      }
    });
  }
  public extendExpirationDay(apikey) {
    this.apiKeyService.updateApiKey(apikey.id).subscribe(() => {
      this.apiKeyService.fetchApiKeys().subscribe((data) => {
        this.apikeys = data;
      });
    });
  }
  public addApikey(apikey) {
    
  }
}
