import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { ApiKey } from 'src/app/models/apiKey-model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ApikeyService } from '../../services/apikey.service';

@Component({
  selector: 'app-api-key-manager',
  templateUrl: './api-key-manager.component.html',
  styleUrls: ['./api-key-manager.component.css']
})
export class ApiKeyManagerComponent implements OnInit, DoCheck, OnDestroy {

  constructor(private apiKeyService: ApikeyService, private dialog: MatDialog) { }

  public apikeys: ApiKey[];
  subscriptions$: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions$.push(this.apiKeyService.apikeys$.subscribe(apikeys => {
      this.apikeys = apikeys;
    }));
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
