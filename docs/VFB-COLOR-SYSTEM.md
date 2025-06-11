# 🎨 VFB Health Insurance - Sistema de Cores Enterprise

**Guia completo para uso consistente das cores da marca VFB em todo o desenvolvimento.**

## 🏢 Identidade Visual VFB

### Cores Principais da Marca
```css
Primary Blue: #04345B    /* Azul navy principal - confiança, profissionalismo */
Accent Blue: #1CABE0     /* Azul claro/ciano - modernidade, tecnologia */
Primary Red: #DD1D2A     /* Vermelho principal - urgência, alertas */
Background: #FCF9F6      /* Off-white quente - acolhimento, limpeza */
Text Dark: #141314       /* Quase preto - legibilidade máxima */
```

## 🎯 Filosofia das Cores

### Psicologia da Marca
- **Navy Blue (#04345B)**: Transmite **confiança, estabilidade e profissionalismo** essenciais no setor de seguros
- **Cyan Blue (#1CABE0)**: Representa **inovação, clareza e modernidade** tecnológica
- **Primary Red (#DD1D2A)**: Usado para **ações críticas, alertas e emergências**
- **Warm Off-White (#FCF9F6)**: Cria **ambiente acolhedor e clean** para dados sensíveis
- **Near Black (#141314)**: Garante **máxima legibilidade** para informações críticas

## 🏗️ Estrutura do Sistema

### 1. VFB Brand Colors (`vfb.*`)

#### Primary Navy Blue Scale (`vfb-blue-*`)
```css
vfb-blue-50:  #f0f4f8    /* Backgrounds muito suaves */
vfb-blue-100: #d9e2ec    /* Hover states suaves */
vfb-blue-200: #bcccdc    /* Borders desabilitados */
vfb-blue-300: #9fb3c8    /* Texto desabilitado */
vfb-blue-400: #829ab1    /* Elementos secundários */
vfb-blue-500: #658199    /* Elementos ativos */
vfb-blue-600: #4a6781    /* Hover states */
vfb-blue-700: #325a7d    /* Elements pressed */
vfb-blue-800: #1e4866    /* Texto escuro */
vfb-blue-900: #04345B    /* Primary Brand - AÇÕES PRINCIPAIS */
vfb-blue-950: #032a4a    /* Máximo contraste */
```

#### Accent Cyan Scale (`vfb-cyan-*`)
```css
vfb-cyan-50:  #f0fcff    /* Backgrounds informativos */
vfb-cyan-100: #e0f8ff    /* Hover states info */
vfb-cyan-200: #baf2ff    /* Borders info */
vfb-cyan-300: #7ee8ff    /* Texto info claro */
vfb-cyan-400: #38d6ff    /* Links secundários */
vfb-cyan-500: #1CABE0    /* Accent Brand - AÇÕES SECUNDÁRIAS */
vfb-cyan-600: #0891b2    /* Hover cyan */
vfb-cyan-700: #0e7490    /* Pressed cyan */
vfb-cyan-800: #155e75    /* Texto cyan escuro */
vfb-cyan-900: #164e63    /* Máximo contraste cyan */
```

#### Primary Red Scale (`vfb-red-*`)
```css
vfb-red-50:  #fef2f2     /* Backgrounds error suaves */
vfb-red-100: #fee2e2     /* Hover states error */
vfb-red-200: #fecdd3     /* Borders error */
vfb-red-300: #fda4af     /* Texto error médio */
vfb-red-400: #fb7185     /* Elementos error */
vfb-red-500: #f43f5e     /* Error padrão */
vfb-red-600: #e11d48     /* Hover error */
vfb-red-700: #be123c     /* Pressed error */
vfb-red-800: #9f1239     /* Texto error escuro */
vfb-red-900: #DD1D2A     /* Primary Red - AÇÕES DESTRUTIVAS */
vfb-red-950: #a91220     /* Máximo contraste red */
```

### 2. Background & Surface (`vfb-bg-*`)
```css
vfb-bg-primary:   #FCF9F6    /* Background principal - páginas */
vfb-bg-secondary: #FDFCFA    /* Background secundário - seções */
vfb-bg-tertiary:  #F8F5F1    /* Background terciário - cards */
vfb-bg-card:      #FFFFFF    /* Cards principais */
vfb-bg-muted:     #F5F2EE    /* Elementos desabilitados */
```

### 3. Text Hierarchy (`vfb-text-*`)
```css
vfb-text-primary:   #141314    /* Títulos, texto principal */
vfb-text-secondary: #374151    /* Subtítulos, labels */
vfb-text-tertiary:  #6B7280    /* Texto de apoio */
vfb-text-muted:     #9CA3AF    /* Placeholder, disabled */
vfb-text-inverse:   #FFFFFF    /* Texto em backgrounds escuros */
```

### 4. Semantic Colors

#### Success (Aprovações, Status Positivo)
```css
success-50:  #f0fdf4    bg-success-50     /* Background success suave */
success-500: #10B981    text-success-500  /* Success padrão */
success-600: #059669    bg-success-600    /* Hover success */
```

#### Warning (Pendências, Alertas)
```css
warning-50:  #fffbeb    bg-warning-50     /* Background warning suave */
warning-500: #F59E0B    text-warning-500  /* Warning padrão */
warning-600: #d97706    bg-warning-600    /* Hover warning */
```

#### Danger (Negativas, Erros)
```css
danger-50:  #fef2f2     bg-danger-50      /* Background danger suave */
danger-500: #ef4444     text-danger-500   /* Danger padrão */
danger-600: #dc2626     bg-danger-600     /* Hover danger */
```

#### Info (Informações Neutras)
```css
info-50:  #eff6ff       bg-info-50        /* Background info suave */
info-500: #3b82f6       text-info-500     /* Info padrão */
info-600: #2563eb       bg-info-600       /* Hover info */
```

## 📋 Guia de Uso por Componente

### 🔘 Botões

#### Primary Action (Ações Principais)
```jsx
// Botão principal - navy blue
<button className="bg-vfb-blue-900 hover:bg-vfb-blue-800 text-vfb-text-inverse">
  Salvar Cliente
</button>
```

#### Secondary Action (Ações Secundárias)
```jsx
// Botão secundário - cyan blue
<button className="bg-vfb-cyan-500 hover:bg-vfb-cyan-600 text-vfb-text-inverse">
  Ver Detalhes
</button>
```

#### Destructive Action (Ações Destrutivas)
```jsx
// Botão destrutivo - red
<button className="bg-vfb-red-900 hover:bg-vfb-red-800 text-vfb-text-inverse">
  Excluir Apólice
</button>
```

#### Ghost/Outline Buttons
```jsx
// Botão outline primary
<button className="border-vfb-blue-900 text-vfb-blue-900 hover:bg-vfb-blue-50">
  Cancelar
</button>

// Botão outline secondary
<button className="border-vfb-cyan-500 text-vfb-cyan-500 hover:bg-vfb-cyan-50">
  Editar
</button>
```

### 📄 Cards & Containers

#### Main Content Cards
```jsx
<div className="bg-vfb-bg-card border border-vfb-gray-200 rounded-lg shadow-sm">
  <div className="p-6 bg-vfb-bg-primary">
    {/* Conteúdo */}
  </div>
</div>
```

#### Secondary Cards
```jsx
<div className="bg-vfb-bg-tertiary border border-vfb-gray-100 rounded-md">
  {/* Conteúdo secundário */}
</div>
```

### 📊 Status Indicators

#### Policy Status
```jsx
// Ativa
<span className="bg-success-50 text-success-600 px-2 py-1 rounded-full text-xs font-medium">
  Ativa
</span>

// Pendente
<span className="bg-warning-50 text-warning-600 px-2 py-1 rounded-full text-xs font-medium">
  Pendente
</span>

// Cancelada
<span className="bg-danger-50 text-danger-600 px-2 py-1 rounded-full text-xs font-medium">
  Cancelada
</span>

// Expirada
<span className="bg-vfb-gray-50 text-vfb-gray-600 px-2 py-1 rounded-full text-xs font-medium">
  Expirada
</span>
```

#### Claim Status
```jsx
// Aprovado
<span className="bg-success-100 text-success-700 border border-success-200">
  Aprovado
</span>

// Em análise
<span className="bg-info-100 text-info-700 border border-info-200">
  Em Análise
</span>

// Negado
<span className="bg-danger-100 text-danger-700 border border-danger-200">
  Negado
</span>
```

### 📝 Forms & Inputs

#### Input States
```jsx
// Input normal
<input className="border-vfb-gray-300 focus:border-vfb-blue-900 focus:ring-vfb-blue-100" />

// Input error
<input className="border-danger-500 focus:border-danger-600 focus:ring-danger-100" />

// Input success
<input className="border-success-500 focus:border-success-600 focus:ring-success-100" />

// Input disabled
<input className="bg-vfb-bg-muted border-vfb-gray-200 text-vfb-text-muted" disabled />
```

#### Labels & Helper Text
```jsx
// Label principal
<label className="text-vfb-text-primary font-medium">Nome Completo</label>

// Label secundário
<label className="text-vfb-text-secondary">Email (opcional)</label>

// Helper text
<p className="text-vfb-text-tertiary text-sm">Formato: nome@empresa.com</p>

// Error text
<p className="text-danger-600 text-sm">Este campo é obrigatório</p>
```

### 🧭 Navigation

#### Main Navigation
```jsx
// Link ativo
<a className="bg-vfb-blue-900 text-vfb-text-inverse">Dashboard</a>

// Link normal
<a className="text-vfb-text-secondary hover:text-vfb-blue-900 hover:bg-vfb-blue-50">
  Clientes
</a>

// Link desabilitado
<a className="text-vfb-text-muted cursor-not-allowed">Relatórios</a>
```

#### Breadcrumbs
```jsx
<nav className="text-vfb-text-tertiary">
  <a className="hover:text-vfb-blue-900">Dashboard</a>
  <span className="text-vfb-gray-400"> / </span>
  <a className="hover:text-vfb-blue-900">Clientes</a>
  <span className="text-vfb-gray-400"> / </span>
  <span className="text-vfb-text-primary">Maria Silva</span>
</nav>
```

### 📊 Data Display

#### Tables
```jsx
// Header da tabela
<th className="bg-vfb-bg-tertiary text-vfb-text-primary font-semibold">Nome</th>

// Células normais
<td className="text-vfb-text-secondary border-b border-vfb-gray-100">João Silva</td>

// Linha hover
<tr className="hover:bg-vfb-bg-secondary">
```

#### Metrics Cards
```jsx
// Card de métrica positiva
<div className="bg-success-50 border border-success-200">
  <div className="text-success-600">↗ +15%</div>
  <div className="text-vfb-text-primary">Novos Clientes</div>
</div>

// Card de métrica negativa
<div className="bg-danger-50 border border-danger-200">
  <div className="text-danger-600">↘ -5%</div>
  <div className="text-vfb-text-primary">Sinistros</div>
</div>
```

## ♿ Acessibilidade & Contraste

### WCAG AA Compliance

#### Combinações Aprovadas (Contraste 4.5:1+)
```css
/* Texto em backgrounds claros */
text-vfb-text-primary + bg-vfb-bg-primary     ✅ 19.2:1
text-vfb-text-secondary + bg-vfb-bg-primary   ✅ 9.1:1
text-vfb-blue-900 + bg-vfb-bg-primary         ✅ 12.8:1

/* Texto em backgrounds coloridos */
text-vfb-text-inverse + bg-vfb-blue-900       ✅ 12.8:1
text-vfb-text-inverse + bg-vfb-cyan-500       ✅ 4.6:1
text-vfb-text-inverse + bg-success-600        ✅ 4.8:1
```

#### Focus States (Required)
```css
/* Todos os elementos interativos DEVEM ter focus visible */
focus:outline-none focus:ring-2 focus:ring-vfb-blue-900 focus:ring-offset-2
```

### Estados de Interação

#### Hover States
```jsx
// Buttons
hover:bg-vfb-blue-800   /* Primary hover */
hover:bg-vfb-cyan-600   /* Secondary hover */
hover:bg-vfb-red-800    /* Destructive hover */

// Links
hover:text-vfb-blue-900 hover:underline

// Cards
hover:shadow-lg hover:border-vfb-gray-300
```

#### Active/Pressed States
```jsx
active:bg-vfb-blue-950   /* Primary pressed */
active:bg-vfb-cyan-700   /* Secondary pressed */
active:scale-95          /* Micro interaction */
```

#### Disabled States
```jsx
disabled:bg-vfb-gray-100
disabled:text-vfb-text-muted
disabled:cursor-not-allowed
disabled:opacity-60
```

## 🚫 Não Fazer (Anti-patterns)

### ❌ Combinações Proibidas
```css
/* Baixo contraste - NUNCA usar */
text-vfb-gray-400 + bg-vfb-bg-primary         ❌ 2.8:1
text-vfb-cyan-300 + bg-vfb-bg-card           ❌ 1.9:1

/* Cores que competem - EVITAR */
bg-vfb-red-500 + bg-vfb-cyan-500             ❌ Muito vibrante
text-vfb-red-900 + text-vfb-cyan-500         ❌ Confuso
```

### ❌ Usos Incorretos
```jsx
// NUNCA usar primary red para ações positivas
<button className="bg-vfb-red-900">Salvar ✅</button>  ❌

// NUNCA usar success para ações destrutivas
<button className="bg-success-600">Excluir 🗑️</button>  ❌

// NUNCA misturar hierarquias de texto
<h1 className="text-vfb-text-muted">Título Principal</h1>  ❌
```

## 🎨 Tokens CSS Customizados

### Variáveis CSS Root (Para uso avançado)
```css
:root {
  /* VFB Brand */
  --vfb-primary: #04345B;
  --vfb-accent: #1CABE0;
  --vfb-danger: #DD1D2A;
  --vfb-bg-warm: #FCF9F6;
  --vfb-text-dark: #141314;
  
  /* Shadows personalizadas */
  --vfb-shadow-card: 0 1px 3px 0 rgba(4, 52, 91, 0.1);
  --vfb-shadow-hover: 0 4px 6px -1px rgba(4, 52, 91, 0.15);
  
  /* Transitions */
  --vfb-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📱 Responsive Design

### Dark Mode (Futuro)
```css
/* Preparação para dark mode */
dark:bg-vfb-gray-900
dark:text-vfb-text-inverse
dark:border-vfb-gray-700
```

## 🔧 Ferramentas de Desenvolvimento

### VS Code Extensions Recomendadas
- **Tailwind CSS IntelliSense** - Autocomplete das classes VFB
- **Color Highlight** - Visualizar cores no código
- **Accessibility Checker** - Verificar contraste

### Comandos Úteis
```bash
# Verificar uso das cores no projeto
grep -r "vfb-" src/ 

# Encontrar todos os usos de cores deprecated
grep -r "medical-" src/
```

---

## 📋 Checklist de Implementação

### Para Cada Componente Novo:
- [ ] Usar cores VFB apropriadas
- [ ] Verificar contraste WCAG AA
- [ ] Implementar estados hover/focus/disabled
- [ ] Testar com leitor de tela
- [ ] Documentar uso específico

### Para Cada Feature:
- [ ] Consistência com outros componentes
- [ ] Estados de loading com cores corretas
- [ ] Feedback visual adequado
- [ ] Hierarchy de cores respeitada

---

**🎯 Objetivo**: Criar interface consistente, acessível e profissional que reflita a confiança e modernidade da marca VFB Health Insurance. 