import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// initial component loaded list..
import { AppComponent } from './app.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { ResetPasswordComponent } from './common-components/reset-password/reset-password.component';
// import { HeaderComponent } from './common-components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpErrorInterceptorInterceptor } from './common-services/http-error-interceptor.interceptor';
// extra module for initial compoents
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AppComponent, FooterComponent, ResetPasswordComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
