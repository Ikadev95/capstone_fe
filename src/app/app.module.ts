import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { errorInterceptor } from './auth/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideHttpClient( withInterceptors([tokenInterceptor])),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
