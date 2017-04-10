import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FirstComponent} from './components/first.component';
import {SecondComponent} from './components/second.component';
import {SuccessComponent }  from './components/success.component';
const appRoutes:Routes=[

	{
		path:'first',
		component:FirstComponent
	},
	{
		path:'second',
		component:SecondComponent

	},
	{
		path:'success',
		component:SuccessComponent

	}

];
export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);