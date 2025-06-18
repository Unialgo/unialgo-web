import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = token;

        if (accessToken) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIxMk9Ldk5ncUFOSENnSlozRHlCQlBpenpNRF9FWDlpVVhKcmVFYVhkWldZIn0.eyJleHAiOjE3NTAyMDcyMjcsImlhdCI6MTc1MDIwNjkyNywianRpIjoiOTE5YjQxNGQtOTNiYi00YmI4LWFmMDctYTY4ZTM4M2VlMjE2IiwiaXNzIjoiaHR0cDovL2FwcC51bmlhbGdvLmNvbS5ici9hdXRoL3JlYWxtcy91bmlhbGdvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImI3YmE3ZTdmLTIxZDItNDRkMC1hYTU2LTBlZWJiZmNlOWRmMSIsInR5cCI6IkJlYXJlciIsImF6cCI6InVuaWFsZ28iLCJzaWQiOiJhOTY2MTgxOC1jOTJkLTQ0M2EtYmE0Ni0zZWE3YWRhODUzYWEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtdW5pYWxnbyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJ1bmlhbGdvIjp7InJvbGVzIjpbIlRFQUNIRVIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoicmFmYWVsZGFwYXoifQ.YngvC326xGNX57xkXpcGLsN3W2RSohQkqPh3oLtnF9ZQDRbFjSojVwDuVEVDUuTMdKPcN4YHFiH7U_0HSVVv6CFgj1dlUw19oCVy5O585REgUl78s_gYzEctQvJJ59OPMwmM1byA6EoQIJM97E7az2BraonKZV38Ay4oXntTRD1sRh9wnTW-N8btAhZlplGebwGgstqjWy3A2Mzvu1oj_EypogycIiAaC6HCrGw4d-myQKB2Ap_aAnJlB1Zye6xuwVzCBx9hDUibe46soHOYHrMW425G2GbzTDgvmEXkdPDeefTSCIUm2Af8ShV777BdhfxewIFK2L6aypmq84ejPQ'