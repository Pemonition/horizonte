import { I18n, TranslatePipe } from './i18n';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JournalStore } from './journal.store';
@Component({selector:'app-root',imports:[TranslatePipe,RouterLink,RouterLinkActive,RouterOutlet],template:`
 <a href="#conteudo" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-accent focus:p-4 focus:text-space">{{ 'Ir para o conteúdo' | t }}</a>
 <header class="border-b border-white/10"><div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-6 md:px-10">
 <a routerLink="/explorar" class="flex items-center gap-3 text-lg font-bold tracking-[0.22em]" [attr.aria-label]="('Horizonte, início' | t)"><span class="text-3xl text-accent" aria-hidden="true">◉</span> HORIZONTE</a>
 <nav [attr.aria-label]="('Menu principal' | t)" class="flex flex-wrap gap-1"><a routerLink="/explorar" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">{{ 'Explorar' | t }}</a><a routerLink="/colecao" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">{{ 'Coleção' | t }} <span class="text-accent">{{store.savedCount()}}</span></a><a routerLink="/encomenda" routerLinkActive="active" ariaCurrentWhenActive="page" class="nav-link">{{ 'commission.nav' | t }}</a></nav>
 <label class="flex items-center gap-2 text-sm text-muted"><span>{{ 'Idioma' | t }}</span><select data-testid="language-select" class="max-w-40 rounded-full border border-white/20 bg-space px-3 py-2 text-ink" [value]="i18n.language()" (change)="i18n.setLanguage(languageSelect.value)" #languageSelect>@for(language of i18n.languages; track language.code){<option [value]="language.code" [attr.lang]="language.code">{{language.name}}</option>}</select></label>
 </div></header>
 <main id="conteudo" tabindex="-1" class="mx-auto min-h-[75vh] max-w-7xl px-5 py-10 md:px-10 md:py-14">@if(store.storageError()){<p role="alert" class="mb-6 rounded-xl border border-danger/30 p-4 text-danger">{{store.storageError() | t}}</p>}<router-outlet /></main>
 <footer class="border-t border-white/10"><div class="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-5 py-8 text-xs text-muted md:px-10"><span>{{ 'HORIZONTE / UM CADERNO DO DESCONHECIDO' | t }}</span><span>{{ 'Acervo: NASA Image and Video Library · Projeto de estudo independente' | t }}</span></div></footer>`})
export class App { readonly store=inject(JournalStore); readonly i18n=inject(I18n); }
