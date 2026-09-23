import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JournalStore } from './journal.store';
@Component({selector:'app-root',imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
 <a href="#conteudo" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-accent focus:p-4 focus:text-space">Ir para o conteúdo</a>
 <header class="border-b border-white/10"><div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-6 md:px-10">
 <a routerLink="/explorar" class="flex items-center gap-3 text-lg font-bold tracking-[0.22em]" aria-label="Horizonte, início"><span class="text-3xl text-accent" aria-hidden="true">◉</span> HORIZONTE</a>
 <nav aria-label="Menu principal" class="flex flex-wrap gap-1"><a routerLink="/explorar" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">Explorar</a><a routerLink="/colecao" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">Coleção <span class="text-accent">{{store.savedCount()}}</span></a><a routerLink="/diario" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">Diário</a></nav>
 </div></header>
 <main id="conteudo" tabindex="-1" class="mx-auto min-h-[75vh] max-w-7xl px-5 py-10 md:px-10 md:py-14">@if(store.storageError()){<p role="alert" class="mb-6 rounded-xl border border-danger/30 p-4 text-danger">{{store.storageError()}}</p>}<router-outlet /></main>
 <footer class="border-t border-white/10"><div class="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-8 text-xs text-muted md:px-10"><span>HORIZONTE / UM CADERNO DO DESCONHECIDO</span><span>Acervo: NASA Image and Video Library · Projeto de estudo independente</span></div></footer>`})
export class App { readonly store=inject(JournalStore); }
