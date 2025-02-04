import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthsrvService } from './authsrv.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    //uso inject per ottenere il service
    const authSvc = inject(AuthsrvService)

    //prendo il valore di accesso (se c'è) da authSubject$
    let accessData = authSvc.userAuthSubject$.getValue();
    console.log(accessData?.accessToken)

    //se accessData non esiste mando la richiesta avanti
    if(!accessData ){
      return next(req);
    }
    //altrimenti clono la richiesta e aggiungo il token
    const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${accessData.accessToken}`)
  });
    // mando quindi avanti la richiesta nuova con il token applicato
    return next(newRequest);

};
