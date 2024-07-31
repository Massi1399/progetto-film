import { Routes } from '@angular/router';
import { RegistrationComponent } from './main/registration/registration.component';
import { LoginComponent } from './main/login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './main/home/home.component';
import { authorizationGuard } from './authorization-guard.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalog', component: CatalogComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    /*{
        path: 'userArea',
        component: UserAreaComponent,
        canActivate: [authorizationGuard],
    }
    {
        path: 'editorArea',
        component: EditorAreaComponent,
        canActivate: [authorizationGuard],

    }
        {
        path: 'adminArea',
        component: AdminAreaComponent,
        canActivate: [authorizationGuard],
    }
*/
];
