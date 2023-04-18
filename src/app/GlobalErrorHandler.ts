import { ErrorHandler, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LocationStrategy } from "@angular/common";


const resourceUrl = 'http://localhost:3003/errors'

@Injectable()

export class GlobalErrorHandler extends ErrorHandler {

  constructor(private httpClient: HttpClient,
    private locationStratergy: LocationStrategy){
    super()
  }

  override handleError(error: any): void {
    var errorEvent = {
      path: this.locationStratergy.path(),
      message: error.message?? error.toString(),
      handler: 'GlobalErrorHandler',
      user: 'the-id-of-the-current-user',
      time: new Date(),
      stack: error.stack
    }
    this.httpClient.post(resourceUrl, errorEvent).subscribe(() => {})
  }
}
