"""Verificação de contraste WCAG 2.2 AA (1.4.3 texto 4,5:1; 1.4.11 componentes 3:1).

Lê as variáveis --c-* de design/index.html (tema claro, tema escuro por preferência do
sistema e tema escuro por botão), confere que os dois blocos escuros são idênticos e
calcula a razão de contraste de cada par pela fórmula da WCAG 2.x (sRGB).

Uso:
  python3 design/verificar-contraste.py            # imprime só o resumo e as falhas
  python3 design/verificar-contraste.py --tabela   # imprime também a tabela em Markdown (para docs/03-ux.md, seção 2.3)
Sai com código 1 se houver qualquer falha.
"""
import re
import os
import sys

h = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html'), encoding='utf-8').read()
css = h.split('<style>')[1].split('</style>')[0]


def vars_(b):
    return dict(re.findall(r'--(c-[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})', b))


def alpha_(b):
    m = re.search(r'--c-nav-active:\s*rgba\(255,\s*255,\s*255,\s*([0-9.]+)\)', b)
    return float(m.group(1)) if m else None


i1 = css.index(':root {')
i2 = css.index('@media (prefers-color-scheme: dark)')
i3 = css.index(':root[data-theme="dark"]')
b_light, b_dmedia, b_dattr = css[i1:i2], css[i2:i3], css[i3:css.index('/* ====', i3)]
light, dmedia, dattr = vars_(b_light), vars_(b_dmedia), vars_(b_dattr)
print('blocos escuros idênticos:', dmedia == dattr, '| variáveis:', len(light), len(dmedia))


def lin(c):
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def L(x):
    x = x.lstrip('#')
    r, g, b = [int(x[i:i + 2], 16) for i in (0, 2, 4)]
    return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b)


def cr(a, b):
    x, y = sorted((L(a), L(b)), reverse=True)
    return (x + .05) / (y + .05)


def mix(fg, bg, a):
    f = [int(fg.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4)]
    g = [int(bg.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4)]
    return '#%02X%02X%02X' % tuple(round(a * f[i] + (1 - a) * g[i]) for i in range(3))


# item do menu ativo: branco translúcido sobre o fundo do menu (composição calculada)
for tema, blk in ((light, b_light), (dmedia, b_dmedia)):
    a = alpha_(blk)
    tema['c-nav-active-eff'] = mix('#FFFFFF', tema['c-nav-bg'], a)
    tema['c-white'] = '#FFFFFF'

# (primeiro plano, fundo, mínimo, descrição)
P = [
    # texto
    ('text', 'bg', 4.5, 'Texto sobre fundo da página'),
    ('text', 'surface', 4.5, 'Texto sobre cartão'),
    ('text', 'surface-2', 4.5, 'Texto sobre superfície sutil'),
    ('text-muted', 'surface', 4.5, 'Texto secundário sobre cartão'),
    ('text-muted', 'bg', 4.5, 'Texto secundário sobre fundo da página'),
    ('text-muted', 'surface-2', 4.5, 'Texto secundário sobre superfície sutil (origem, linha de nível meta)'),
    ('text-muted', 'err-bg', 4.5, 'Rótulo secundário dentro de linha destacada em erro (tabela em cartões)'),
    ('on-primary', 'primary', 4.5, 'Botão primário e aba selecionada (texto)'),
    ('on-primary', 'primary-hover', 4.5, 'Botão primário em hover'),
    ('link', 'surface', 4.5, 'Link sobre cartão'),
    ('link', 'bg', 4.5, 'Link sobre fundo da página'),
    ('link', 'surface-2', 4.5, 'Link sobre superfície sutil'),
    ('on-accent', 'accent', 4.5, 'Botão verde de ação-chave (texto), inclusive Vou comprar e OK ativo'),
    ('on-accent', 'accent-hover', 4.5, 'Botão verde em hover'),
    # estados: texto
    ('ok-fg', 'ok-bg', 4.5, 'Permitido, atendido: texto sobre fundo'),
    ('warn-fg', 'warn-bg', 4.5, 'Pendente, alerta, faixa EXEMPLO: texto sobre fundo'),
    ('err-fg', 'err-bg', 4.5, 'Bloqueado, impedimento, estouro: texto sobre fundo'),
    ('info-fg', 'info-bg', 4.5, 'Informação, proposta, nota sobre as normas: texto sobre fundo'),
    ('ok-fg', 'surface', 4.5, 'Permitido: texto sobre cartão'),
    ('warn-fg', 'surface', 4.5, 'Pendente: texto sobre cartão'),
    ('err-fg', 'surface', 4.5, 'Bloqueado e saldo negativo: texto sobre cartão'),
    ('err-fg', 'bg', 4.5, 'Bloqueado: texto sobre fundo da página'),
    ('err-fg', 'surface-2', 4.5, 'Saldo negativo em linha de nível meta ou etapa'),
    ('text', 'ok-bg', 4.5, 'Texto principal sobre fundo Permitido'),
    ('text', 'warn-bg', 4.5, 'Trecho destacado na origem da linha (mark)'),
    ('text', 'err-bg', 4.5, 'Texto principal sobre linha destacada em erro'),
    ('text', 'info-bg', 4.5, 'Texto principal sobre fundo de informação'),
    # menu
    ('nav-text', 'nav-bg', 4.5, 'Menu lateral: texto'),
    ('nav-muted', 'nav-bg', 4.5, 'Menu lateral: texto secundário'),
    ('white', 'nav-active-eff', 4.5, 'Menu lateral: texto do item ativo (branco translúcido sobre o menu)'),
    # componentes de interface (3:1)
    ('border-strong', 'surface', 3, 'Borda de campos e botões sobre cartão (UI)'),
    ('border-strong', 'bg', 3, 'Borda de campos sobre fundo da página (UI)'),
    ('border-strong', 'surface-2', 3, 'Borda de campos e caixas sobre superfície sutil (UI)'),
    ('primary', 'surface', 3, 'Marca de caixa de seleção e botão de opção sobre cartão (UI)'),
    ('focus', 'surface', 3, 'Anel de foco sobre cartão (UI)'),
    ('focus', 'bg', 3, 'Anel de foco sobre fundo da página (UI)'),
    ('focus-nav', 'nav-bg', 3, 'Anel de foco e contorno do item ativo no menu (UI)'),
    ('nav-muted', 'nav-bg', 3, 'Contorno tracejado do botão de simulação no menu (UI)'),
    ('ok-bd', 'ok-bg', 3, 'Borda do selo Permitido (UI)'),
    ('warn-bd', 'warn-bg', 3, 'Borda do selo Pendente e da faixa de aviso (UI)'),
    ('err-bd', 'err-bg', 3, 'Borda do selo Bloqueado (UI)'),
    ('info-bd', 'info-bg', 3, 'Borda do selo Informação (UI)'),
    ('ok-bd', 'surface', 3, 'Borda do item Atende sobre cartão (UI)'),
    ('err-bd', 'surface', 3, 'Borda do item Bloqueia e da linha com impedimento sobre cartão (UI)'),
    ('warn-bd', 'surface', 3, 'Borda tracejada do item Pendente e da linha com alerta sobre cartão (UI)'),
    ('info-bd', 'surface', 3, 'Borda tracejada do item aguardando resposta sobre cartão (UI)'),
    ('ok-bd', 'bg', 3, 'Borda de faixa Permitido sobre o fundo da página (UI)'),
    ('warn-bd', 'bg', 3, 'Borda de faixa de aviso sobre o fundo da página (UI)'),
    ('err-bd', 'bg', 3, 'Borda de faixa de erro sobre o fundo da página (UI)'),
    ('info-bd', 'bg', 3, 'Borda de faixa de informação sobre o fundo da página (UI)'),
    ('bar-fill', 'bar-track', 3, 'Preenchimento da barra sobre a trilha (UI)'),
    ('bar-fill', 'surface', 3, 'Preenchimento da barra sobre cartão (UI)'),
    ('bar-over', 'surface', 3, 'Barra de estouro sobre cartão (UI)'),
    ('border-strong', 'bar-track', 3, 'Contorno da barra sobre a trilha (UI)'),
    ('surface', 'bar-fill', 4.5, 'Número sobre nível alcançado (escala TRL/MRL)'),
]

rows, bad = [], 0
for f, b, m, d in P:
    r = []
    for name, t in (('claro', light), ('escuro', dmedia)):
        v = cr(t['c-' + f], t['c-' + b])
        r.append(v)
        if v < m:
            bad += 1
            print('FALHA', name, f, 'sobre', b, round(v, 2), '(mínimo', m, ')')
    rows.append((d, f, b, m, r[0], r[1]))

print('pares:', len(rows), '| verificações (2 temas):', len(rows) * 2, '| falhas:', bad)
print('menor razão de texto (claro, escuro):',
      round(min(r[4] for r in rows if r[3] == 4.5), 2), round(min(r[5] for r in rows if r[3] == 4.5), 2))
print('menor razão de componente (claro, escuro):',
      round(min(r[4] for r in rows if r[3] == 3), 2), round(min(r[5] for r in rows if r[3] == 3), 2))

if '--tabela' in sys.argv:
    def n(x):
        return ('%.2f' % x).replace('.', ',')
    print()
    print('| Par (primeiro plano sobre fundo) | Mínimo | Claro | Escuro |')
    print('|---|---|---|---|')
    for d, f, b, m, a, c in rows:
        print('| %s (`%s` sobre `%s`) | %s:1 | %s:1 | %s:1 |' % (d, f, b, str(m).replace('.', ','), n(a), n(c)))

sys.exit(1 if bad else 0)
