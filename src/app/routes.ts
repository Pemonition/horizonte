import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { Explore } from './explore';
import { Collection } from './collection';
import { Diary } from './diary';
import { Detail } from './detail';
@Component({imports:[RouterLink],template:`<section class="py-20"><p class="eyebrow">404 / FORA DA ÓRBITA</p><h1 class="mt-6">Você encontrou<br>um espaço vazio.</h1><p class="mt-6 text-muted">Esta página não existe. Há muito mais para descobrir no acervo.</p><a routerLink="/explorar" class="primary mt-8">Voltar ao horizonte ↗</a></section>`})
export class NotFound {}
export const routes:Routes=[{path:'',redirectTo:'explorar',pathMatch:'full'},{path:'explorar',component:Explore,title:'Explorar · Horizonte'},{path:'colecao',component:Collection,title:'Coleção · Horizonte'},{path:'diario',component:Diary,title:'Diário · Horizonte'},{path:'descoberta/:id',component:Detail,title:'Descoberta · Horizonte'},{path:'**',component:NotFound,title:'Fora da órbita · Horizonte'}];
