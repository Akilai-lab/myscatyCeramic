import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormConnectionComponent } from './form-connection/form-connection.component';
import { AddArticlesComponent } from './add-articles/add-articles.component';
import { DescriptAnArticleComponent } from './descript-an-article/descript-an-article.component';
import { AccueilHomeComponent } from './accueil-home/accueil-home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PanierComponent } from './panier/panier.component';

const appRoutes: Routes = [
  { 
    path: 'connect', 
    component: FormConnectionComponent
  },
  { 
    path: 'article/:id', 
    component: DescriptAnArticleComponent
  },
  { 
    path: 'addArticle', 
    component: AddArticlesComponent
  },
  { 
    path: 'toPanier', 
    component: PanierComponent
  },
  {
    path: '**',
    component: AccueilHomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FormConnectionComponent,
    AddArticlesComponent,
    DescriptAnArticleComponent,
    AccueilHomeComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/*
mport { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormConnectionComponent } from './form-connection/form-connection.component';

const routes: Routes = [
    { path: 'connect', component: FormConnectionComponent }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
export class AppRoutingModule {}*/
