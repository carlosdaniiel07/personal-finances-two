import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Util } from './shared/util.functions'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	
	intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
		return handler.handle(request)
		.pipe(catchError(error => {
			let errorMessage: string = error.error.Message

			Util.errorNotify(errorMessage, 'Error')
			return throwError(errorMessage)
		}))
	}
}