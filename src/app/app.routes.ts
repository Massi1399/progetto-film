import { Routes } from '@angular/router';
import { RegistrationComponent } from './main/registration/registration.component';
import { LoginComponent } from './main/login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './main/home/home.component';
import { ProfileComponent } from './private/profile/profile.component';
import { ReviewsComponent } from './private/reviews/reviews.component';
import { EditorAreaComponent } from './private/editor-area/editor-area.component';
import { AdminAreaComponent } from './private/admin-area/admin-area.component';
import { authorizationGuard } from './authorization-guard.service';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalog', component: CatalogComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'myProfile',
        component: ProfileComponent,
        canActivate: [authorizationGuard],
        data: {roles: ['user', 'editor', 'admin']}
    },
    {
        path: 'myReviews',
        component: ReviewsComponent,
        canActivate: [authorizationGuard],
        data: {roles: ['user', 'editor', 'admin']}
    },
    {
        path: 'editorArea',
        component: EditorAreaComponent,
        canActivate: [authorizationGuard],
        data: {roles: ['editor', 'admin']}
    },
    {
        path: 'adminArea',
        component: AdminAreaComponent,
        canActivate: [authorizationGuard],
        data: {roles: ['admin']}
    },
];
