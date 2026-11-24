import re
import os
h=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'index.html'),encoding='utf-8').read()
css=h.split('<style>')[1].split('</style>')[0]
def vars_(b): return dict(re.findall(r'--(c-[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})',b))
i1=css.index(':root {'); i2=css.index('@media (prefers-color-scheme: dark)'); i3=css.index(':root[data-theme="dark"]')
light=vars_(css[i1:i2]); dmedia=vars_(css[i2:i3]); dattr=vars_(css[i3:css.index('/* ====',i3)])
print('dark blocks identical:',dmedia==dattr, len(light),len(dmedia))
def lin(c):
    c/=255; return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(x):
    x=x.lstrip('#'); r,g,b=[int(x[i:i+2],16) for i in (0,2,4)]; return .2126*lin(r)+.7152*lin(g)+.0722*lin(b)
def cr(a,b):
    x,y=sorted((L(a),L(b)),reverse=True); return (x+.05)/(y+.05)
# (fg, bg, minimo, descricao)
P=[('text','bg',4.5,'Texto sobre fundo da página'),('text','surface',4.5,'Texto sobre cartão'),('text','surface-2',4.5,'Texto sobre superfície sutil'),
('text-muted','surface',4.5,'Texto secundário sobre cartão'),('text-muted','bg',4.5,'Texto secundário sobre fundo'),('text-muted','surface-2',4.5,'Texto secundário sobre superfície sutil'),
('on-primary','primary',4.5,'Botão primário (texto)'),('on-primary','primary-hover',4.5,'Botão primário em hover'),
('link','surface',4.5,'Link sobre cartão'),('link','bg',4.5,'Link sobre fundo'),
('on-accent','accent',4.5,'Botão de acento verde (texto)'),('on-accent','accent-hover',4.5,'Botão verde em hover'),
('accent-text','surface',4.5,'Texto verde sobre cartão'),('accent-text','accent-soft',4.5,'Selo ISO 21500 (verde sobre verde claro)'),
('ok-fg','ok-bg',4.5,'Permitido: texto sobre fundo'),('warn-fg','warn-bg',4.5,'Pendente: texto sobre fundo'),('err-fg','err-bg',4.5,'Bloqueado: texto sobre fundo'),('info-fg','info-bg',4.5,'Informação: texto sobre fundo'),
('ok-fg','surface',4.5,'Permitido: texto sobre cartão'),('warn-fg','surface',4.5,'Pendente: texto sobre cartão'),('err-fg','surface',4.5,'Bloqueado: texto sobre cartão'),('err-fg','bg',4.5,'Bloqueado: texto sobre fundo da página'),
('nav-text','nav-bg',4.5,'Menu lateral: texto'),('nav-muted','nav-bg',4.5,'Menu lateral: texto secundário'),('on-accent','accent',4.5,'Botão Vou comprar (texto)'),
('text','nav-bg',0,'-'),
('border-strong','surface',3,'Borda de campos e botões sobre cartão (UI)'),('border-strong','bg',3,'Borda de campos sobre fundo (UI)'),
('focus','surface',3,'Anel de foco sobre cartão (UI)'),('focus','bg',3,'Anel de foco sobre fundo (UI)'),('focus-nav','nav-bg',3,'Anel de foco no menu lateral (UI)'),
('ok-bd','ok-bg',3,'Borda do selo Permitido (UI)'),('warn-bd','warn-bg',3,'Borda do selo Pendente (UI)'),('err-bd','err-bg',3,'Borda do selo Bloqueado (UI)'),('info-bd','info-bg',3,'Borda do selo Informação (UI)'),
('ok-bd','surface',3,'Barra lateral do item Atende sobre cartão (UI)'),('err-bd','surface',3,'Barra lateral do item Bloqueia sobre cartão (UI)'),('warn-bd','surface',3,'Barra lateral do item Pendente sobre cartão (UI)'),
('bar-fill','bar-track',3,'Preenchimento da barra sobre a trilha (UI)'),('bar-fill','surface',3,'Preenchimento da barra sobre cartão (UI)'),('bar-over','surface',3,'Barra de estouro sobre cartão (UI)'),('border-strong','bar-track',3,'Contorno da barra sobre a trilha (UI)'),
('surface','bar-fill',4.5,'Número sobre nível alcançado (escala TRL/MRL)'),
]
import json
rows=[]; bad=0
for f,b,m,d in P:
    if m==0: continue
    r=[]
    for name,t in (('claro',light),('escuro',dmedia)):
        v=cr(t['c-'+f],t['c-'+b]); r.append(v)
        if v<m: bad+=1; print('FALHA',name,f,b,round(v,2))
    rows.append((d,f,b,m,r[0],r[1]))
print('falhas:',bad,'pares:',len(rows)*2)
import sys
sys.exit(1 if bad else 0)
