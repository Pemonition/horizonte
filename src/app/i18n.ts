import { DOCUMENT } from '@angular/common';
import { Injectable, Pipe, PipeTransform, effect, inject, signal } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import pt from './i18n/pt.json';
import es from './i18n/es.json';
import en from './i18n/en.json';
import nl from './i18n/nl.json';
import de from './i18n/de.json';
import it from './i18n/it.json';
import fr from './i18n/fr.json';

export const LANGUAGES = [
 {code:'es',name:'Español'}, {code:'pt',name:'Português'}, {code:'en',name:'English'},
 {code:'nl',name:'Nederlands'}, {code:'de',name:'Deutsch'}, {code:'it',name:'Italiano'}, {code:'fr',name:'Français'},
] as const;
export type Language = typeof LANGUAGES[number]['code'];
export const CATALOGS: Record<Language, Record<string,string>> = {pt,es,en,nl,de,it,fr};
const LOCALES: Record<Language,string> = {pt:'pt-BR',es:'es',en:'en',nl:'nl-NL',de:'de-DE',it:'it-IT',fr:'fr-FR'};
export function isLanguage(value: string | null): value is Language { return LANGUAGES.some(language=>language.code===value); }
@Injectable({providedIn:'root'})
export class I18n {
 private readonly document=inject(DOCUMENT);
 readonly languages=LANGUAGES;
 readonly language=signal<Language>(this.initialLanguage());
 constructor(){effect(()=>{this.document.documentElement.lang=LOCALES[this.language()];});}
 setLanguage(value:string){
  if(!isLanguage(value))return;
  this.language.set(value);
  try {localStorage.setItem('horizonte.language',value);} catch { /* Language switching still works for this session. */ }
 }
 t(key:string, params:Record<string,string|number>={}):string {
  const language=this.language();const text=CATALOGS[language][key] ?? CATALOGS.pt[key] ?? key;
  return text.replace(/\{(\w+)\}/g,(match,name:string)=>{
   const value=params[name];return value===undefined?match:typeof value==='number'?new Intl.NumberFormat(LOCALES[language]).format(value):value;
  });
 }
 date(value:string,withTime=false):string {
  const date=new Date(value);if(Number.isNaN(date.getTime()))return '—';
  return new Intl.DateTimeFormat(LOCALES[this.language()],{year:'numeric',month:'2-digit',day:'2-digit',...(withTime?{hour:'2-digit',minute:'2-digit'} as const:{})}).format(date);
 }
 private initialLanguage():Language {
  try {const saved=localStorage.getItem('horizonte.language');if(isLanguage(saved))return saved;}catch { /* Storage may be unavailable. */ }
  for(const candidate of this.document.defaultView?.navigator.languages ?? []){const code=candidate.split('-')[0];if(isLanguage(code))return code;}
  return 'pt';
 }
}
// Impure pipes intentionally observe the active language on each view check.
// All source data stays unchanged; language selection is a signal.
@Pipe({name:'t',pure:false})
export class TranslatePipe implements PipeTransform {
 private readonly i18n=inject(I18n);
 transform(key:string,params:Record<string,string|number>={}):string{return this.i18n.t(key,params);}
}
@Pipe({name:'localDate',pure:false})
export class LocalDatePipe implements PipeTransform {
 private readonly i18n=inject(I18n);
 transform(value:string,withTime=false):string{return this.i18n.date(value,withTime);}
}
@Injectable()
export class LocalizedTitleStrategy extends TitleStrategy {
 private readonly i18n=inject(I18n);private readonly title=inject(Title);private readonly key=signal('Explorar');
 constructor(){super();effect(()=>this.title.setTitle(this.i18n.t(this.key())+' · Horizonte'));}
 override updateTitle(snapshot:RouterStateSnapshot){this.key.set(this.buildTitle(snapshot) ?? 'Explorar');}
}
