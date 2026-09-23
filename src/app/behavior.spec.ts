import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { JournalStore } from './journal.store';
import { NasaService } from './nasa.service';
import { Diary } from './diary';
import { Discovery, NasaResponse } from './models';
const discovery:Discovery={id:'moon-1',title:'Moon',description:'Lunar surface',image:'https://example.com/moon.jpg',date:'2020-01-01',center:'NASA'};
const response=(id:string):NasaResponse=>({collection:{items:[{data:[{nasa_id:id,title:id,date_created:'2020-01-01'}],links:[{href:'https://example.com/photo.jpg',rel:'preview'}]}]}});
describe('Coleção e diário',()=>{
 beforeEach(()=>{localStorage.clear();TestBed.configureTestingModule({});});
 it('salva sem duplicar, persiste e mantém observações ao remover da coleção',()=>{
  const store=TestBed.inject(JournalStore);store.toggle(discovery);expect(store.savedCount()).toBe(1);
  store.add('Primeira descoberta','Uma superfície cheia de detalhes.',discovery);
  store.add('Outra observação','Mais um detalhe na mesma descoberta.',discovery);
  expect(store.entryCount()).toBe(2);expect(store.observedCount()).toBe(1);
  expect(new JournalStore().savedCount()).toBe(1);
  store.toggle(discovery);expect(store.savedCount()).toBe(0);expect(store.entryCount()).toBe(2);
  store.remove(store.entries()[0].id);expect(store.entryCount()).toBe(1);
 });
 it('ignora armazenamento corrompido e objetos incompletos',()=>{
  localStorage.setItem('horizonte.saved','[{},null,4]');expect(new JournalStore().savedCount()).toBe(0);
  localStorage.setItem('horizonte.entries','{');expect(new JournalStore().entryCount()).toBe(0);
 });
 it('valida espaços, limites e vínculo, e limpa formulário depois de registrar',()=>{
  const store=TestBed.inject(JournalStore);store.toggle(discovery);
  const diary=TestBed.runInInjectionContext(()=>new Diary());
  diary.title.set('   ');diary.body.set('Observação com conteúdo suficiente.');diary.selected.set(discovery.id);expect(diary.valid()).toBe(false);
  diary.title.set('Observação');expect(diary.valid()).toBe(true);
  diary.body.set('x'.repeat(1501));expect(diary.valid()).toBe(false);
  diary.body.set('Agora um conteúdo válido.');diary.save(new Event('submit'));expect(store.entryCount()).toBe(1);expect(diary.valid()).toBe(false);expect(diary.title()).toBe('');
 });
});
describe('NASA',()=>{
 let http:HttpTestingController;let api:NasaService;
 beforeEach(()=>{TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting()]});http=TestBed.inject(HttpTestingController);api=TestBed.inject(NasaService);});
 afterEach(()=>http.verify());
 it('não deixa resposta antiga substituir uma busca nova',()=>{
  api.search('moon');const old=http.expectOne(r=>r.params.get('q')==='moon');
  api.search('mars');const next=http.expectOne(r=>r.params.get('q')==='mars');
  next.flush(response('mars'));old.flush(response('moon'));expect(api.discoveries()[0].id).toBe('mars');expect(api.loading()).toBe(false);
 });
 it('mostra erro e permite nova tentativa com resultado vazio',()=>{
  api.search('moon');http.expectOne(r=>r.params.get('q')==='moon').flush('failure',{status:503,statusText:'Unavailable'});
  expect(api.error()).not.toBe('');expect(api.loading()).toBe(false);
  api.search('moon');expect(api.error()).toBe('');http.expectOne(r=>r.params.get('q')==='moon').flush({collection:{items:[]}});expect(api.discoveries()).toEqual([]);
 });
 it('consulta detalhes por identificador e trata item inexistente',()=>{
  let result:Discovery|null|undefined;api.getById('not-found').subscribe(item=>result=item);
  http.expectOne(r=>r.params.get('nasa_id')==='not-found').flush({collection:{items:[]}});expect(result).toBeNull();
 });
});
