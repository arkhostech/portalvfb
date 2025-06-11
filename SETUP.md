# 🚀 Setup Rápido - VFB Health Portal

## Passos para Inicializar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Desenvolvimento
```bash
npm run dev
```

### 3. Abrir no Navegador
- URL: http://localhost:3000
- Login: agent@healthportal.com
- Senha: password

## ✅ Verificações de Funcionamento

### Telas Disponíveis:
- ✅ Login (funcional com mock)
- ✅ Dashboard (com métricas)
- ✅ Clientes (placeholder)
- ✅ Apólices (placeholder)
- ✅ Sinistros (placeholder)
- ✅ Perfil (placeholder)

### Configurações Funcionais:
- ✅ TypeScript (strict mode)
- ✅ Tailwind CSS (com cores médicas)
- ✅ React Router (navegação)
- ✅ Zustand (state management)
- ✅ ESLint + Prettier
- ✅ Path aliases (@/components, etc.)

## 🔧 Comandos Úteis

```bash
# Verificar tipos
npm run type-check

# Formatar código
npm run format

# Lint
npm run lint:fix

# Build produção
npm run build
```

## 🎯 Próximos Passos

1. **Instalar**: `npm install`
2. **Rodar**: `npm run dev`
3. **Implementar**: Começar com autenticação real
4. **Expandir**: Adicionar CRUD de clientes

## 📁 Estrutura Criada

```
src/
├── components/
│   ├── ui/Button.tsx
│   └── Layout.tsx
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Clients.tsx
│   ├── Policies.tsx
│   ├── Claims.tsx
│   └── Profile.tsx
├── store/
│   └── auth.ts
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
└── test/
    └── setup.ts
```

O projeto está pronto para desenvolvimento! 🎉 