import { Learn } from './learn';
describe('Comunicação por luz',()=>{
 it('conta ida e volta e revela a época da observação',()=>{
  const mission=new Learn();expect(mission.roundTrip()).toBe(8);expect(mission.observedYear()).toBe(mission.year-4);
  mission.answer.set(4);expect(mission.completed()).toBe(0);mission.answer.set(8);expect(mission.completed()).toBe(1);
  expect(mission.replyYear()).toBe(mission.year+8);
 });
 it('reinicia a previsão quando a distância muda e rejeita valores fora do modelo',()=>{
  const mission=new Learn();mission.answer.set(8);mission.setDistance('10');expect(mission.answer()).toBeNull();expect(mission.completed()).toBe(0);expect(mission.roundTrip()).toBe(20);
  mission.setDistance('0');mission.setDistance('2.5');mission.setDistance('invalid');expect(mission.distance()).toBe(10);
  mission.reset();expect(mission.distance()).toBe(4);expect(mission.answer()).toBeNull();
 });
});
