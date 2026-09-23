import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Discovery } from './models';
@Component({selector:'app-stat',template:`<div class="border-l border-white/15 pl-5"><p class="text-3xl font-bold">{{value()}}</p><p class="mt-1 text-sm text-muted">{{label()}}</p></div>`})
export class Stat { readonly label=input.required<string>(); readonly value=input.required<number>(); }
@Component({selector:'app-discovery-card',imports:[RouterLink],template:`
 <article class="group h-full overflow-hidden rounded-2xl border border-white/10 bg-panel">
  <a [routerLink]="['/descoberta',item().id]" class="block overflow-hidden" [attr.aria-label]="'Ver detalhes de '+item().title">
   @if(!imageFailed()) { <img [src]="item().image" [alt]="item().title" (error)="imageFailed.set(true)" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"> }
   @else { <div class="flex aspect-[4/3] items-center justify-center bg-space text-muted">Imagem indisponível</div> }
  </a>
  <div class="p-5"><p class="eyebrow">{{item().center}} / ARQUIVO ESPACIAL</p>
   <h3 class="mt-3 line-clamp-2 min-h-14 text-lg leading-7 font-bold"><a [routerLink]="['/descoberta',item().id]">{{item().title}}</a></h3>
   <div class="mt-5 flex items-center justify-between gap-2"><a [routerLink]="['/descoberta',item().id]" class="text-sm text-muted hover:text-accent">Ver descoberta ↗</a>
   <button type="button" (click)="toggle.emit(item())" [attr.aria-pressed]="saved()" [attr.aria-label]="(saved()?'Remover da coleção: ':'Salvar na coleção: ')+item().title" class="rounded-full border border-white/20 px-3 py-2 text-sm hover:border-accent" [class.text-accent]="saved()">{{saved()?'✓ Salvo':'+ Salvar'}}</button></div>
  </div>
 </article>`})
export class DiscoveryCard { readonly item=input.required<Discovery>(); readonly saved=input(false); readonly toggle=output<Discovery>(); readonly imageFailed=signal(false); }
