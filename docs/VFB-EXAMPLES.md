# 🎨 VFB Color System - Exemplos Práticos

## 🚀 Implementação Imediata

### 1. Botões VFB

```jsx
import { Button } from '@/components/ui/Button'

// Ações Principais (Navy Blue)
<Button variant="primary">Salvar Cliente</Button>
<Button variant="primary" size="lg">Criar Nova Apólice</Button>

// Ações Secundárias (Cyan Blue)
<Button variant="accent">Ver Detalhes</Button>
<Button variant="outline-accent">Editar</Button>

// Ações Destrutivas (Red)
<Button variant="danger">Excluir Registro</Button>
<Button variant="outline-danger">Cancelar Apólice</Button>

// Estados Semânticos
<Button variant="success">Aprovar Sinistro</Button>
<Button variant="warning">Revisar Documentos</Button>
<Button variant="info">Mais Informações</Button>
```

### 2. Cards e Containers

```jsx
// Card Principal do Cliente
<div className="bg-vfb-bg-card border border-vfb-gray-200 rounded-lg shadow-vfb">
  <div className="p-6 bg-vfb-bg-primary">
    <h3 className="text-vfb-text-primary font-semibold text-lg">Maria Silva</h3>
    <p className="text-vfb-text-secondary">Cliente desde 2021</p>
  </div>
</div>

// Card de Métrica
<div className="bg-vfb-bg-tertiary border border-vfb-gray-100 rounded-md p-4">
  <div className="text-vfb-blue-900 text-2xl font-bold">1,234</div>
  <div className="text-vfb-text-tertiary text-sm">Total de Clientes</div>
</div>

// Card com Hover Effect
<div className="card-hover bg-vfb-bg-card border border-vfb-gray-200 rounded-lg p-6">
  {/* Conteúdo com animação de hover */}
</div>
```

### 3. Formulários

```jsx
// Input Normal
<input 
  className="w-full px-3 py-2 border border-vfb-gray-300 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-vfb-blue-900 focus:border-vfb-blue-900
             placeholder-vfb-text-muted text-vfb-text-primary bg-vfb-bg-card"
  placeholder="Digite o nome completo"
/>

// Input com Erro
<input 
  className="w-full px-3 py-2 border border-danger-500 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-danger-100 focus:border-danger-600
             text-vfb-text-primary bg-vfb-bg-card"
/>
<p className="text-danger-600 text-sm mt-1">Este campo é obrigatório</p>

// Label e Helper Text
<label className="block text-vfb-text-primary font-medium mb-2">
  Nome Completo
</label>
<p className="text-vfb-text-tertiary text-sm mb-3">
  Formato: Primeiro Nome Sobrenome
</p>
```

### 4. Status Indicators

```jsx
// Status de Apólice
const PolicyStatus = ({ status }) => {
  const styles = {
    active: "bg-success-50 text-success-600 border-success-200",
    pending: "bg-warning-50 text-warning-600 border-warning-200",
    cancelled: "bg-danger-50 text-danger-600 border-danger-200",
    expired: "bg-vfb-gray-50 text-vfb-gray-600 border-vfb-gray-200"
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status === 'active' && '✅ Ativa'}
      {status === 'pending' && '⏳ Pendente'}
      {status === 'cancelled' && '❌ Cancelada'}
      {status === 'expired' && '⏰ Expirada'}
    </span>
  )
}

// Indicador de Prioridade
const PriorityBadge = ({ level }) => (
  <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
    level === 'high' ? 'bg-vfb-red-50 text-vfb-red-900' :
    level === 'medium' ? 'bg-warning-50 text-warning-600' :
    'bg-vfb-gray-50 text-vfb-gray-600'
  }`}>
    {level === 'high' && '🔴 Alta'}
    {level === 'medium' && '🟡 Média'}
    {level === 'low' && '🟢 Baixa'}
  </div>
)
```

### 5. Navegação

```jsx
// Navegação Principal
<nav className="bg-vfb-blue-900 text-vfb-text-inverse">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <div className="text-xl font-bold">VFB Health</div>
        
        {/* Menu Items */}
        <a className="px-3 py-2 rounded-md bg-vfb-blue-800 text-vfb-text-inverse">
          Dashboard
        </a>
        <a className="px-3 py-2 rounded-md text-vfb-text-inverse hover:bg-vfb-blue-800 transition-colors">
          Clientes
        </a>
        <a className="px-3 py-2 rounded-md text-vfb-text-inverse hover:bg-vfb-blue-800 transition-colors">
          Apólices
        </a>
      </div>
    </div>
  </div>
</nav>

// Breadcrumbs
<nav className="flex items-center space-x-2 text-sm text-vfb-text-tertiary mb-6">
  <a href="/dashboard" className="hover:text-vfb-blue-900 transition-colors">Dashboard</a>
  <span className="text-vfb-gray-400">/</span>
  <a href="/clients" className="hover:text-vfb-blue-900 transition-colors">Clientes</a>
  <span className="text-vfb-gray-400">/</span>
  <span className="text-vfb-text-primary font-medium">Maria Silva</span>
</nav>
```

### 6. Tabelas

```jsx
// Header da Tabela
<thead className="bg-vfb-bg-tertiary">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-primary uppercase tracking-wider">
      Nome
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-vfb-text-primary uppercase tracking-wider">
      Status
    </th>
  </tr>
</thead>

// Corpo da Tabela
<tbody className="bg-vfb-bg-card divide-y divide-vfb-gray-100">
  <tr className="hover:bg-vfb-bg-secondary transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-vfb-text-primary">
      João Silva
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <PolicyStatus status="active" />
    </td>
  </tr>
</tbody>
```

### 7. Dashboard Cards

```jsx
// Card de Métrica com Gradiente
<div className="gradient-vfb-primary rounded-lg p-6 text-vfb-text-inverse">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-vfb-text-inverse/80">Total de Clientes</p>
      <p className="text-3xl font-bold">1,234</p>
    </div>
    <div className="text-4xl opacity-80">👥</div>
  </div>
  <div className="mt-4 flex items-center text-sm">
    <span className="text-success-300">↗ +12%</span>
    <span className="ml-2 text-vfb-text-inverse/80">vs. mês anterior</span>
  </div>
</div>

// Card de Ação Rápida
<div className="bg-vfb-bg-card border border-vfb-cyan-200 rounded-lg p-6 hover:border-vfb-cyan-500 transition-colors cursor-pointer">
  <div className="flex items-center space-x-3">
    <div className="bg-vfb-cyan-50 p-3 rounded-lg">
      <svg className="w-6 h-6 text-vfb-cyan-500">...</svg>
    </div>
    <div>
      <h3 className="text-vfb-text-primary font-medium">Novo Cliente</h3>
      <p className="text-vfb-text-tertiary text-sm">Adicionar cliente ao sistema</p>
    </div>
  </div>
</div>
```

### 8. Alertas e Notificações

```jsx
// Alerta de Sucesso
<div className="bg-success-50 border border-success-200 rounded-md p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-success-400">...</svg>
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-success-800">
        Cliente salvo com sucesso!
      </h3>
      <div className="mt-2 text-sm text-success-700">
        Os dados do cliente foram atualizados no sistema.
      </div>
    </div>
  </div>
</div>

// Alerta de Erro
<div className="bg-danger-50 border border-danger-200 rounded-md p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-danger-400">...</svg>
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-danger-800">
        Erro ao processar solicitação
      </h3>
      <div className="mt-2 text-sm text-danger-700">
        Verifique os dados e tente novamente.
      </div>
    </div>
  </div>
</div>

// Alerta de Informação
<div className="bg-info-50 border border-info-200 rounded-md p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-info-400">...</svg>
    </div>
    <div className="ml-3">
      <h3 className="text-sm font-medium text-info-800">
        Nova funcionalidade disponível
      </h3>
      <div className="mt-2 text-sm text-info-700">
        Agora você pode exportar relatórios em PDF.
      </div>
    </div>
  </div>
</div>
```

### 9. Gradientes e Efeitos

```jsx
// Header com Gradiente VFB
<header className="gradient-vfb-hero py-12">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-4xl font-bold text-vfb-text-inverse mb-4">
      Portal VFB Health Insurance
    </h1>
    <p className="text-xl text-vfb-text-inverse/90">
      Gestão completa para agentes de seguro saúde
    </p>
  </div>
</header>

// Texto com Gradiente
<h2 className="text-gradient-vfb text-3xl font-bold">
  Bem-vindo ao seu Dashboard
</h2>

// Card com Sombra VFB
<div className="bg-vfb-bg-card rounded-lg shadow-vfb-lg p-6">
  <h3 className="text-vfb-text-primary font-semibold mb-4">Relatório Mensal</h3>
  {/* Conteúdo */}
</div>
```

### 10. Estados de Loading

```jsx
// Skeleton com cores VFB
<div className="animate-pulse">
  <div className="h-4 bg-vfb-gray-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-vfb-gray-200 rounded w-1/2 mb-2"></div>
  <div className="h-4 bg-vfb-gray-200 rounded w-5/6"></div>
</div>

// Loading Spinner
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vfb-blue-900"></div>
</div>

// Button Loading
<Button variant="primary" loading>
  Salvando...
</Button>
```

## 🎯 Layout Completo de Exemplo

```jsx
const ClientDetailsPage = () => {
  return (
    <div className="min-h-screen bg-vfb-bg-primary">
      {/* Header */}
      <header className="bg-vfb-blue-900 text-vfb-text-inverse shadow-vfb">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">VFB Health Portal</h1>
          <Button variant="accent" size="sm">Perfil</Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-vfb-text-tertiary mb-6">
          <a href="/dashboard" className="hover:text-vfb-blue-900">Dashboard</a>
          <span className="mx-2">/</span>
          <span className="text-vfb-text-primary">Cliente: Maria Silva</span>
        </nav>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-vfb-text-primary">
            Detalhes do Cliente
          </h2>
          <div className="flex space-x-3">
            <Button variant="outline-accent">Editar</Button>
            <Button variant="primary">Nova Apólice</Button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Card */}
          <div className="bg-vfb-bg-card border border-vfb-gray-200 rounded-lg shadow-vfb p-6">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">
              Informações Pessoais
            </h3>
            <div className="space-y-2">
              <p className="text-vfb-text-secondary">Nome: Maria Silva</p>
              <p className="text-vfb-text-secondary">Email: maria@email.com</p>
              <p className="text-vfb-text-secondary">Telefone: (11) 99999-9999</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-vfb-bg-card border border-vfb-gray-200 rounded-lg shadow-vfb p-6">
            <h3 className="text-lg font-semibold text-vfb-text-primary mb-4">
              Status da Conta
            </h3>
            <PolicyStatus status="active" />
          </div>

          {/* Metrics Card */}
          <div className="gradient-vfb-accent rounded-lg p-6 text-vfb-text-inverse">
            <h3 className="text-lg font-semibold mb-4">Apólices Ativas</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm opacity-90">Total de R$ 2.450/mês</p>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

## ✅ Checklist de Implementação

### Ao usar as cores VFB:

- [ ] ✅ **Primary Blue (#04345B)** para ações principais
- [ ] ✅ **Accent Cyan (#1CABE0)** para ações secundárias  
- [ ] ✅ **Primary Red (#DD1D2A)** apenas para ações destrutivas
- [ ] ✅ **Warm Background (#FCF9F6)** como base das páginas
- [ ] ✅ **Near Black (#141314)** para textos principais
- [ ] ✅ Estados hover/focus/active implementados
- [ ] ✅ Contraste WCAG AA verificado
- [ ] ✅ Consistent com outros componentes

**🎯 Resultado**: Interface profissional, confiável e totalmente alinhada com a identidade VFB! 