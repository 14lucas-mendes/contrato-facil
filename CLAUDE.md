s# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Contrato Fácil** — gerador de contratos para freelancers. O usuário preenche um formulário, seleciona um template, e o app gera o texto completo do contrato em tempo real. Rascunhos são persistidos no `localStorage` do navegador.

## Comandos

```bash
npm run dev       # servidor de desenvolvimento (Vite)
npm run build     # build de produção (tsc -b && vite build)
npm run lint      # ESLint em todo o projeto
npm run preview   # preview do build de produção
```

Não há testes configurados.

## Stack

- React 19 + TypeScript 6 (strict, `erasableSyntaxOnly`, `verbatimModuleSyntax`)
- Vite 8 (bundler mode, `react-jsx`)
- Tailwind CSS 4 (`@tailwindcss/postcss` + `tailwindcss` v4)
- ESLint 9 (flat config)

## Arquitetura

### Fluxo de dados

```
App
 ├─ useContractForm()          → { contract, errors, handleChange, validate, resetForm }
 ├─ useDrafts()                → { drafts, saveDraft, loadDraft, deleteDraft }
 ├─ TemplateSelector           → templateId state
 │
 ├─ ContractForm               ← contract, errors, visibleSections, onChange
 │    ├─ PartFields ×2         ← data, errors, updateData  (sempre visível)
 │    ├─ ServiceFields         ← condicional (se "service" ∈ template.sections)
 │    ├─ ClauseFields          ← condicional (se "itemContract" ∈ template.sections)
 │    └─ PaymentFields         ← condicional (se "payment" ∈ template.sections)
 │
 ├─ ContractPreview            ← template.generateText(contract)
 └─ DraftList                  ← drafts, onLoad, onDelete
```

O estado desce por props tipadas. Cada seção do formulário recebe apenas seu slice e uma `updateData(key, value)`. O `ContractForm` faz o glue: traduz `updateData` da seção em `onChange(sectionKey, mergedSlice)`. O hook `useContractForm.handleChange` aplica spread merge no estado.

### Tipos principais (`src/types/`)

- **`Contract`** — modelo central com 5 seções: `contractor`, `hired` (ambos `ContractData`), `service`, `payment`, `itemContract`
- **`ContractErrors`** — espelha `Contract` mapeando cada campo para `string | undefined` (mensagem de erro)
- **`ContractTemplate`** — `id`, `label`, `description`, `sections` (quais seções exibir), `generateText(data: Contract): string`
- **`Draft`** — `id`, `name`, `templateId`, `dados: Contract`, `atualizadoEm`

### Templates (`src/templates/`)

4 templates implementam `ContractTemplate`:

| Template | ID | Sections visíveis |
|---|---|---|
| Contrato Freelance | `freelance` | service, payment, itemContract |
| Prestação de Serviços | `prestacao-servico` | service, payment, itemContract |
| NDA | `nda` | itemContract (somente cláusulas) |
| Locação | `locacao` | service, payment, itemContract |

`index.ts` exporta o array `templates` e a helper `getTemplateById(id)`.

### Hooks (`src/hooks/`)

- **`useLocalStorage<T>(key, initialValue)`** — `useState` + `useEffect` sync com localStorage. Retorna tupla `[T, Dispatch]` com `as const`.
- **`useContractForm(initial?)`** — estado do contrato + erros. Fornece `handleChange` (spread merge por seção), `validate` (roda `validateContract` e popula erros), `resetForm(newContract?)`.
- **`useDrafts()`** — CRUD de rascunhos sobre `useLocalStorage<Draft[]>`. `saveDraft` gera id único, `loadDraft` busca por id, `deleteDraft` filtra, `updateDraft` atualiza dados de um rascunho existente.

### Utilitários (`src/utils/`)

- **`validators.ts`** — `validateCPF` (11 dígitos + DV), `validateEmail`, `validateRequired`, `validateContract` (retorna `ContractErrors`), `hasErrors`
- **`formatters.ts`** — `formatCPF`, `unformat`, `formatDateBR` (YYYY-MM-DD → DD/MM/YYYY), `formatCurrency`, `formatPaymentMethod`
- **`storage.ts`** — wrappers para `localStorage` com prefixo `cf:`

### Componentes

**UI (`src/components/ui/`):**
- `Input` — `forwardRef`, suporta `label`, `error`, `helpText`, className merge
- `Button` — `forwardRef`, variants (`primary`, `secondary`, `danger`, `ghost`), sizes (`sm`, `md`, `lg`)
- `Label` — com indicador opcional de campo obrigatório (`required`)

**Form (`src/components/form/`):**
- `ContractForm` — orquestrador que recebe `errors` e `visibleSections`, renderiza seções condicionalmente
- `PartFields` — reutilizado para contratante e contratado, exibe erros por campo
- `ServiceFields`, `PaymentFields`, `ClauseFields` — seções específicas com validação
- `TemplateSelector` — chips clicáveis com 4 templates, descrição do selecionado

**Preview (`src/components/preview/`):**
- `ContractPreview` — renderiza texto do contrato em `<pre>` com `white-space: pre-wrap`. Estado vazio mostra placeholder.
- `PrintButton` — dispara `window.print()`, ícone SVG inline

**Drafts (`src/components/drafts/`):**
- `DraftList` — estado vazio vs lista de `DraftItem`
- `DraftItem` — nome, data formatada, botões Carregar/Excluir

### Estilização (`src/index.css`)

Tailwind 4 como framework base + classes customizadas:
- `.panel` — card com sombra e border-radius 18px
- `.input-field`, `.input-error`, `.error-text`, `.help-text` — sistema de inputs e feedback de validação
- `.form-section`, `.form-section__grid`, `.form-section__title` — layout de formulário em grid 2 colunas (`.span-two` para full-width)
- `.contract-form` — container gap
- `.contract-preview__text` — fonte serifada (Georgia), `pre-wrap`
- `.draft-item` — linha de rascunho com hover state
- `@media print` — esconde `.no-print`, mostra apenas preview em fonte preta sem sombras

## Regras de negócio

- **Validação ocorre ao salvar rascunho** (botão "Salvar rascunho"). Campos inválidos são destacados.
- **CPF** validado com dígitos verificadores; recusa sequências repetidas.
- **Parcelas** (`installment`) só aparece quando `method === "cartao de credito"`.
- **Rascunhos** salvos em `localStorage` com chave `cf:drafts`. Nome sugerido: `Contrato {contratante} x {contratado}`.
- **Ações destrutivas** (carregar/excluir rascunho, novo contrato com dados) pedem confirmação.
- **Impressão** esconde tudo exceto o preview do contrato.
