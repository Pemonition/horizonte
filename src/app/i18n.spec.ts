import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { CATALOGS, I18n, LANGUAGES } from './i18n';

describe('Multilingual interface',()=>{
 beforeEach(()=>{localStorage.clear();localStorage.setItem('horizonte.language','pt');TestBed.configureTestingModule({});});
 it('includes every key and interpolation parameter in all seven languages',()=>{
  const keys=Object.keys(CATALOGS.pt).sort();
  for(const {code} of LANGUAGES){
   expect(Object.keys(CATALOGS[code]).sort()).toEqual(keys);
   for(const key of keys){
    expect(CATALOGS[code][key].trim().length).toBeGreaterThan(0);
    expect(CATALOGS[code][key].match(/\{\w+\}/g)?.sort() ?? []).toEqual(CATALOGS.pt[key].match(/\{\w+\}/g)?.sort() ?? []);
   }
  }
 });
 it('switches between priority languages and persists the choice',()=>{
  const i18n=TestBed.inject(I18n);expect(i18n.t('Diário')).toBe('Diário');
  i18n.setLanguage('es');expect(i18n.t('Coleção')).toBe('Colección');
  i18n.setLanguage('en');expect(i18n.t('Diário')).toBe('Journal');expect(localStorage.getItem('horizonte.language')).toBe('en');
  TestBed.tick();expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
 });
 it('interpolates counts without displaying internal keys',()=>{
  const i18n=TestBed.inject(I18n);expect(i18n.t('collectionCount',{count:2,total:5})).toBe('2 de 5 descobertas');
  i18n.setLanguage('es');expect(i18n.t('collectionCount',{count:2,total:5})).toBe('2 de 5 descubrimientos');
 });
 it('formats dates by locale and tolerates invalid dates',()=>{
  const i18n=TestBed.inject(I18n);expect(i18n.date('2026-09-23T12:00:00Z')).toBe('23/09/2026');
  i18n.setLanguage('de');expect(i18n.date('2026-09-23T12:00:00Z')).toBe('23.09.2026');expect(i18n.date('bad-date')).toBe('—');
 });
 it('rejects unknown languages and retains user data',()=>{
  localStorage.setItem('horizonte.entries','[{"body":"Meu texto pessoal"}]');
  const i18n=TestBed.inject(I18n);i18n.setLanguage('invalid');expect(i18n.language()).toBe('pt');i18n.setLanguage('fr');
  expect(localStorage.getItem('horizonte.entries')).toContain('Meu texto pessoal');
 });
 it('continues switching when storage is blocked',()=>{
  const i18n=TestBed.inject(I18n);vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('blocked');});
  expect(()=>i18n.setLanguage('nl')).not.toThrow();expect(i18n.t('Diário')).toBe('Dagboek');vi.restoreAllMocks();
 });
});
