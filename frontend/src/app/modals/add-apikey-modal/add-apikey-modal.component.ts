import { Component, OnInit } from '@angular/core';
import { ApikeyService } from '../../services/apikey.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-apikey-modal',
  templateUrl: './add-apikey-modal.component.html',
  styleUrls: ['./add-apikey-modal.component.css']
})
export class AddApikeyModalComponent implements OnInit {

  public errors: string[] = [];

  constructor(private apiKeyService: ApikeyService) {}

  public AddApiKey(infinite: boolean) {
    this.apiKeyService.addApiKey(infinite ? 'true' : 'false').pipe( catchError((error: HttpErrorResponse) => {
      return throwError(error.error.message);
    })).subscribe((data) => {}, (error) => {this.errors = error; });
  }

  ngOnInit(): void {
  }

}
