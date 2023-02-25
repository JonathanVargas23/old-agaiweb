import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { NewsComponent } from './pages/news/news.component';
import { SupportComponent } from './pages/support/support.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ViewBlogComponent } from './pages/viewBlog/viewBlog.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home'}
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { title: 'Quienes-somos'}
  },
  {
    path: 'solutions',
    component: SolutionsComponent,
    data: { title: 'Soluciones'}
  },
  {
    path: 'news',
    component: NewsComponent,
    data: { title: 'Noticias'}
  },
  // {
  //   path: 'blog',
  //   component: BlogComponent,
  //   data: { title: 'Blog'}
  // },
  // {
  //   path: 'viewBlog/:id',
  //   component: ViewBlogComponent,
  //   data: { title: 'viewBlog'}
  // },
  {
    path: 'support',
    component: SupportComponent,
    data: { title: 'Soporte'}
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
