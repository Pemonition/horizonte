from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
root=Path(__file__).resolve().parents[1]
c=canvas.Canvas(str(root/'docs/lado-a-direcao.pdf'),pagesize=(1200,900))
c.setTitle('Horizonte - Direcao Lado A')
def text(x,y,s,size=16,col='#EEF3F4',font='Helvetica'):
 c.setFillColor(HexColor(col));c.setFont(font,size);c.drawString(x,y,s)
def base(number,title,sub):
 c.setFillColor(HexColor('#0B1218'));c.rect(0,0,1200,900,fill=1,stroke=0)
 text(48,844,'HORIZONTE / LADO A',13,'#C8DCE5');text(48,789,title,36)
 text(48,754,sub,15,'#A9BAC4');text(48,30,'Revisao de 24/09/2026, durante a implementacao. Materiais iniciais preservados como historico.',12,'#A9BAC4');text(1120,30,number,12)
base('01','Exploracao que vira aprendizado','Referencia: poster glacial de Interestelar (2014). Conceito: exploracao.')
c.drawImage(str(root/'public/expedition-hero.png'),48,378,width=560,height=350,preserveAspectRatio=True,anchor='c')
text(48,360,'Paisagem imaginaria original gerada com IA; nao e registro cientifico.',12,'#A9BAC4')
text(656,689,'DA CAPA PARA A INTERFACE',16,'#C8DCE5')
for i,s in enumerate(['Luz fria e neblina -> abertura glacial.','Paisagem monumental -> escala e silencio.','Figura pequena -> curiosidade e vulnerabilidade.','Titulo serifado -> presenca cinematografica.','Exploracao -> acervo, fontes e plano de estudo.']):text(656,651-i*43,s,17)
text(48,306,'PALETA E PAPEIS',15,'#C8DCE5')
for i,(label,col) in enumerate([('Fundo','#0B1218'),('Painel','#152029'),('Texto','#EEF3F4'),('Apoio','#A9BAC4'),('Acento','#C8DCE5'),('Gelo','#DCE5E8')]):
 x=48+i*184;c.setFillColor(HexColor(col));c.rect(x,211,166,64,fill=1,stroke=0);text(x,188,label,14);text(x,169,col,12,'#A9BAC4')
text(48,122,'Georgia: marca 27-110 px e titulo da abertura 34-52 px. Arial: interface 16 px; subtitulos 28 px.',16)
text(48,91,'Bordas finas, controles retos e foco visivel. Fotografia cientifica sempre separada da ilustracao de abertura.',15)
c.showPage()
base('02','Do assombro ao proximo passo','Composicao implementada: abertura e percurso editorial. Sem cartaz, ator, titulo ou logotipo do filme.')
c.drawImage(str(root/'docs/verificacao/lado-a-desktop.png'),48,250,width=680,height=472,preserveAspectRatio=True)
text(790,681,'PERCURSO',16,'#C8DCE5')
for i,s in enumerate(['01 Explorar imagens reais','02 Observar e salvar','03 Consultar fontes','04 Escolher um tema','05 Baixar um plano pessoal']):text(790,636-i*47,s,17)
text(48,214,'LADO A / VALOR E RECEITA',16,'#C8DCE5')
text(48,174,'Gratis hoje: acervo, colecao, exercicios editoriais, fontes oficiais e plano pessoal.',18)
text(48,142,'Propostas futuras: guias originais, kits de atividades e objetos Horizonte. Ainda sem vendas ou checkout.',17)
text(48,111,'Lado B: artes, NFTs e NFC adiados. O formulario atual nao envia dados, leads ou reservas.',17)
text(48,76,'Fonte do poster: paramountpictures.com/movies/interstellar. Fontes de estudo: nasa.gov/learning-resources/.',12,'#A9BAC4')
c.linkURL('https://www.paramountpictures.com/movies/interstellar',(48,69,560,90));c.save()
print('docs/lado-a-direcao.pdf')
