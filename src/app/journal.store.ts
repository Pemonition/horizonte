import { Injectable, computed, signal } from '@angular/core';
import { Discovery, Entry } from './models';
@Injectable({providedIn:'root'})
export class JournalStore {
 readonly storageError = signal('');
 readonly saved = signal<Discovery[]>(this.read('horizonte.saved',isDiscovery));
 readonly entries = signal<Entry[]>(this.read('horizonte.entries',isEntry));
 readonly savedIds = computed(()=>new Set(this.saved().map(item=>item.id)));
 readonly savedCount = computed(()=>this.saved().length);
 readonly entryCount = computed(()=>this.entries().length);
 readonly observedCount = computed(()=>new Set(this.entries().map(entry=>entry.discoveryId)).size);
 toggle(discovery: Discovery) {
  this.saved.update(items=>this.savedIds().has(discovery.id)?items.filter(item=>item.id!==discovery.id):[discovery,...items]);
  this.write('horizonte.saved',this.saved());
 }
 add(title: string, body: string, discovery: Discovery) {
  if(title.trim().length<3 || title.trim().length>80 || body.trim().length<10 || body.trim().length>1500) return false;
  this.entries.update(items=>[{id:crypto.randomUUID(),title:title.trim(),body:body.trim(),discoveryId:discovery.id,discoveryTitle:discovery.title,createdAt:new Date().toISOString()},...items]);
  this.write('horizonte.entries',this.entries()); return true;
 }
 remove(id: string) { this.entries.update(items=>items.filter(item=>item.id!==id)); this.write('horizonte.entries',this.entries()); }
 private read<T>(key: string, valid: (item: unknown)=>item is T): T[] {
  try { const data: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(data)?data.filter(valid):[]; }
  catch { return []; }
 }
 private write(key: string, value: unknown) {
  try { localStorage.setItem(key,JSON.stringify(value)); this.storageError.set(''); }
  catch { this.storageError.set('As alterações estão nesta sessão, mas o navegador não permitiu salvá-las.'); }
 }
}
function hasStrings(value: unknown, keys: string[]): value is Record<string,string> { return !!value && typeof value==='object' && keys.every(key=>typeof (value as Record<string,unknown>)[key]==='string'); }
function isDiscovery(value: unknown): value is Discovery { return hasStrings(value,['id','title','description','image','date','center']) && value['image'].startsWith('https://'); }
function isEntry(value: unknown): value is Entry { return hasStrings(value,['id','title','body','discoveryId','discoveryTitle','createdAt']); }
