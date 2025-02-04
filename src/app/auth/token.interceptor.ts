import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthsrvService } from './authsrv.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

    //uso inject per ottenere il service
    const authSvc = inject(AuthsrvService)

    //prendo il valore di accesso (se c'è) da authSubject$
   let accessData = authSvc.userAuthSubject$.getValue();
   let data = accessData

 // Parsing della stringa JSON
    let token = data.token; // Estrazione del token
    console.log(token);
   // console.log(accessData?.accessToken)

    //se accessData non esiste mando la richiesta avanti
    if(!token ){
      return next(req);
    }
    //altrimenti clono la richiesta e aggiungo il token
    const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  });
    // mando quindi avanti la richiesta nuova con il token applicato
    return next(newRequest);

};
