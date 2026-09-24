import { TranslatePipe } from './i18n';
import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { Explore } from './explore';
import { Collection } from './collection';
import { Diary } from './diary';
import { Detail } from './detail';
@Component({imports:[TranslatePipe,RouterLink],template:`<section class="py-20"><p class="eyebrow">{{ '404 / FORA DA ÓRBITA' | t }}</p><h1 class="mt-6">{{ 'Você encontrou' | t }}<br>{{ 'um espaço vazio.' | t }}</h1><p class="mt-6 text-muted">{{ 'Esta página não existe. Há muito mais para descobrir no acervo.' | t }}</p><a routerLink="/explorar" class="primary mt-8">{{ 'Voltar ao horizonte ↗' | t }}</a></section>`})
export class NotFound {}
export const routes:Routes=[{path:'',redirectTo:'explorar',pathMatch:'full'},{path:'explorar',component:Explore,title:'Explorar'},{path:'colecao',component:Collection,title:'Coleção'},{path:'diario',component:Diary,title:'Diário'},{path:'descoberta/:id',component:Detail,title:'Descoberta'},{path:'**',component:NotFound,title:'Fora da órbita'}];
