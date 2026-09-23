import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs';
import { Discovery, NasaResponse, mapDiscoveries } from './models';
@Injectable({providedIn:'root'})
export class NasaService {
 private readonly http = inject(HttpClient);
 readonly discoveries = signal<Discovery[]>([]);
 readonly loading = signal(false);
 readonly error = signal('');
 readonly query = signal('nebula');
 private request = 0;
 search(query: string) {
  const request = ++this.request;
  this.query.set(query); this.loading.set(true); this.error.set(''); this.discoveries.set([]);
  this.http.get<NasaResponse>('https://images-api.nasa.gov/search',{params:{q:query,media_type:'image',page_size:24}}).pipe(timeout(20000), map(mapDiscoveries)).subscribe({
   next: data => { if(request === this.request) {this.discoveries.set(data); this.loading.set(false);} },
   error: () => { if(request === this.request) {this.error.set('Não foi possível acessar a NASA. Confira sua conexão e tente novamente.'); this.loading.set(false);} }
  });
 }
 getById(id: string) {
  return this.http.get<NasaResponse>('https://images-api.nasa.gov/search',{params:{nasa_id:id,media_type:'image'}}).pipe(timeout(20000),map(mapDiscoveries),map(items => items.find(item=>item.id===id) ?? null));
 }
}
