from pathlib import Path
import json
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageOps
root=Path(__file__).resolve().parents[1]; out=root/'docs'; refs=out/'referencias'
BG='#0B1218'; FG='#EEF3F4'; MUTED='#A9BAC4'; ACC='#D6EBAB'
def page(name,title,subtitle):
 c=canvas.Canvas(str(out/name),pagesize=(1440,1080)); c.setTitle(title)
 c.setFillColor(HexColor(BG)); c.rect(0,0,1440,1080,fill=1,stroke=0)
 text(c,48,1015,title,36); text(c,48,979,subtitle,15,MUTED); return c
def text(c,x,y,s,size=16,color=FG):
 c.setFillColor(HexColor(color)); c.setFont('Helvetica',size); c.drawString(x,y,s)
def block(c,x,y,w,h,color='#14222D'):
 c.setFillColor(HexColor(color)); c.roundRect(x,y,w,h,12,fill=1,stroke=0)
def img(c,p,x,y,w,h):
 original=Image.open(p).convert('RGB')
 im=ImageOps.pad(original,(int(w*2),int(h*2)),color=BG) if 'interface' in str(p) else ImageOps.fit(original,(int(w*2),int(h*2)))
 c.drawImage(ImageReader(im),x,y,w,h)
data=json.loads((refs/'sources.json').read_text())
data += [{'group':'interface','label':'NASA / hierarquia editorial','file':'nasa-interface.png','source':'https://www.nasa.gov/'},{'group':'interface','label':'ESA / fotografia e contraste','file':'esa-interface.png','source':'https://www.esa.int/'}]
c=page('moodboard.pdf','HORIZONTE / Painel de atmosfera','Exploração: sair do conhecido, observar, escolher e registrar. 12 referências reais, sem imagens geradas.')
groups=[('conceito','01  CONCEITO','Escala, travessia e descoberta: o observador diante do desconhecido.'),('cor','02  COR E LUZ','Escuridão azulada, luz fria e um acento claro para orientar o olhar.'),('textura','03  TEXTURA E FORMA','Superfícies minerais e geometria técnica para sugerir um caderno de campo.'),('interface','04  INTERFACE','Fotografia ampla, títulos editoriais e navegação direta em sites reais.')]
for row,(key,title,why) in enumerate(groups):
 y=904-row*220; text(c,48,y,title,17,ACC); text(c,280,y,why,14,MUTED)
 items=[r for r in data if r['group']==key]; w=(1344-18*(len(items)-1))/len(items)
 for i,r in enumerate(items):
  x=48+i*(w+18); img(c,refs/r['file'],x,y-164,w,145); text(c,x,y-184,r['label'],12)
  c.linkURL(r['source'],(x,y-188,x+w,y-19),relative=0)
text(c,48,28,'Fontes clicáveis em cada referência. Créditos detalhados em REFERENCIAS.md. Capturas: 23/09/2026.',11,MUTED); c.save()
c=page('identidade-visual.pdf','HORIZONTE / Identidade visual','Direção: a imagem abre o horizonte; a interface orienta o próximo passo com calma.')
colors=[('Fundo',BG),('Texto',FG),('Destaque',ACC),('Apoio / painel','#14222D'),('Erro','#FFAAA2'),('Sucesso','#A8DFBF')]
for i,(label,color) in enumerate(colors):
 x=48+i*224; block(c,x,744,205,170,color); text(c,x,711,label,16); text(c,x,687,color,14,MUTED)
text(c,48,617,'TIPOGRAFIA',16,ACC); text(c,48,559,'Explorar é ampliar o possível.',42)
text(c,48,522,'Arial / títulos 64 px desktop, 40 px mobile; subtítulos 28 px; texto 16 px / 1,6.',18,MUTED)
text(c,48,484,'Arial Bold nos títulos; Arial Regular no corpo. Fontes do sistema, sem dependência externa.',18,MUTED)
text(c,48,414,'FORMA',16,ACC); text(c,48,371,'Cantos de 16 px, linhas finas, sem sombras pesadas. Botões em cápsula.',20)
text(c,48,329,'Espaçamento em múltiplos de 8 px. Fotos amplas, texto alinhado à esquerda.',20)
block(c,48,135,620,135); text(c,72,229,'Um registro de descoberta',24); text(c,72,189,'Painel escuro, borda discreta, espaço para respirar.',16,MUTED)
block(c,740,165,235,64,ACC); text(c,774,190,'Explorar agora  >',20,BG)
text(c,48,69,'A fotografia pode trazer outras cores; os controles mantêm esta paleta. Foco visível e contraste alto.',15,MUTED); c.save()
c=page('esbocos.pdf','HORIZONTE / Duas telas antes do código','Estudos de composição: explorar o acervo e registrar uma descoberta.')
for x,title in [(48,'01 / EXPLORAR'),(748,'02 / DIÁRIO')]:
 block(c,x,130,644,790); text(c,x+24,876,'HORIZONTE     Explorar    Coleção    Diário',16,ACC); text(c,x+24,804,title,28)
text(c,72,722,'O universo é maior',42); text(c,72,669,'que a sua rotina.',42)
text(c,72,616,'Uma nova perspectiva a cada descoberta.',18,MUTED)
block(c,72,491,596,66,'#0B1218'); text(c,96,516,'Buscar no acervo da NASA               Buscar',16)
for i in range(3):
 block(c,72+i*202,228,188,224,'#0B1218'); text(c,86+i*202,343,'FOTOGRAFIA',14,MUTED); text(c,86+i*202,263,'Título / Salvar',16)
text(c,772,732,'Seu diário de bordo.',40); text(c,772,675,'Transforme imagens em observações.',18,MUTED)
for y,label in [(537,'Título da observação'),(438,'Descoberta vinculada'),(280,'O que chamou sua atenção?')]:
 block(c,772,y,596,76 if y!=280 else 130,'#0B1218'); text(c,790,y+35,label,17,MUTED)
block(c,772,176,250,58,ACC); text(c,800,197,'Registrar observação',18,BG)
c.save()
lines=['# Referências do moodboard','','12 referências reais. Imagens NASA com crédito original; capturas de interfaces para análise acadêmica. Nenhuma referência foi gerada por IA.','']
for r in data: lines.append('- **'+r['label']+'**: ['+r.get('title',r['label']).replace('[','').replace(']','')+']('+r['source']+'). Crédito: '+r.get('credit','respectivo site')+'.')
(out/'REFERENCIAS.md').write_text('\n'.join(lines),encoding='utf-8')
print('Created moodboard, identity, sketches and credits.')
