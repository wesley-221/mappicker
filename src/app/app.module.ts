import 'reflect-metadata';
import '../polyfills';

import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './components/main/header/header.component';
import { ErrorComponent } from './components/main/error/error.component';
import { BodyComponent } from './components/main/body/body.component';
import { BreadcrumbComponentComponent } from './components/main/breadcrumb-component/breadcrumb-component.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AuthInterceptor } from "./components/guards/token-interceptor";

@NgModule({
	declarations: [
		AppComponent,

		HeaderComponent,
		ErrorComponent,
		BodyComponent,
		BreadcrumbComponentComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		AngularMaterialModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
