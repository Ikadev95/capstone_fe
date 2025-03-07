import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbHighlight, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './auth/token.interceptor';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { errorInterceptor } from './auth/error.interceptor';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './main-components/footer/footer.component';
import { IMAGE_CONFIG } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
   NgbPaginationModule,
    NgbHighlight,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideHttpClient( withInterceptors([tokenInterceptor])),
    provideHttpClient(withInterceptors([errorInterceptor])),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
