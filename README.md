# 📄 Contrato Fácil

**Gerador de contratos para freelancers.** Preencha um formulário, veja o contrato sendo montado em tempo real, salve rascunhos e imprima o documento finalizado — tudo direto do navegador, sem backend.

---

## ✨ Funcionalidades

- **4 modelos de contrato:** Freelance, Prestação de Serviços, Acordo de Confidencialidade (NDA) e Locação.
- **Formulário dinâmico:** cada template exibe apenas as seções relevantes. Dados de contratante e contratado são comuns a todos.
- **Pré-visualização em tempo real:** o texto do contrato é atualizado a cada tecla digitada.
- **Rascunhos salvos no navegador:** salve, carregue e exclua rascunhos via `localStorage`. Nenhum dado sai do seu computador.
- **Impressão otimizada:** botão "Imprimir" que esconde formulário, header e footer, exibindo apenas o contrato formatado.
- **Validação de campos:** CPF (dígitos verificadores), e-mail, campos obrigatórios — com mensagens de erro por campo.

---

## 📋 Regras de negócio

### Modelos de contrato

| Template | Seções exibidas | Uso |
|---|---|---|
| **Contrato Freelance** | Serviço, Pagamento, Cláusulas | Projetos pontuais entre contratante e freelancer |
| **Prestação de Serviços** | Serviço, Pagamento, Cláusulas | Serviços continuados ou formais entre empresa e prestador |
| **Acordo de Confidencialidade (NDA)** | Cláusulas | Proteção de informações sigilosas trocadas entre as partes |
| **Contrato de Locação** | Serviço, Pagamento, Cláusulas | Locação de bens móveis ou imóveis |

> As seções **Parte Contratante** e **Parte Contratada** são exibidas em todos os templates.

### Estrutura dos dados do contrato

| Seção | Campos | Descrição |
|---|---|---|
| `contractor` | `name`, `cpf`, `email`, `address` | Dados da parte contratante / divulgador / locador |
| `hired` | `name`, `cpf`, `email`, `address` | Dados da parte contratada / receptor / locatário |
| `service` | `description`, `startDate`, `period` | Descrição do serviço/bem, data de início e prazo/vigência |
| `payment` | `method`, `installment?` | Forma de pagamento (pix, boleto, transferência, cartão). Parcelas aparecem condicionalmente para cartão de crédito |
| `itemContract` | `terminationPenalty`, `notification`, `cityForum` | Multa rescisória (%), prazo de notificação (dias) e foro da comarca |

### Validação

- **CPF:** 11 dígitos, validação dos dígitos verificadores. Recusa sequências repetidas (ex: `111.111.111-11`).
- **E-mail:** formato `usuario@dominio.ext`.
- **Campos obrigatórios:** todos os campos do contrato são obrigatórios (exceto `installment`, que só aparece para cartão de crédito).
- **Números:** `terminationPenalty`, `notification` e `installment` devem ser maiores que zero.
- A validação é executada ao tentar **salvar um rascunho**. Campos inválidos são destacados em vermelho com a mensagem de erro.

### Rascunhos

- Salvos em `localStorage` sob a chave `cf:drafts`.
- Cada rascunho armazena: `id`, `name`, `templateId`, `dados` (Contract) e `atualizadoEm` (ISO timestamp).
- Ao carregar um rascunho, o template correspondente é selecionado automaticamente.
- Ao salvar, o nome sugerido é gerado a partir dos nomes das partes: `Contrato {contratante} x {contratado}`.
- Ações destrutivas (carregar rascunho com dados atuais preenchidos, excluir rascunho, novo contrato) exibem confirmação via `confirm()`.

### Impressão

- A regra `@media print` esconde todos os elementos com a classe `.no-print` (formulário, header, footer, botões, lista de rascunhos, template selector).
- Apenas o painel de pré-visualização é exibido na impressão, com fonte serifada e sem sombras/bordas.

---

## 🚀 Rodando o projeto

```bash
# instalar dependências
npm install

# servidor de desenvolvimento
npm run dev

# build de produção
npm run build

# preview do build
npm run preview

# lint
npm run lint
```

Requisitos: **Node.js 18+**.

---

## 🧱 Arquitetura

```
src/
├── types/            # Tipos TypeScript (Contract, ContractTemplate, Draft)
├── utils/            # validators, formatters, storage
├── templates/        # 4 templates de contrato + index (registro)
├── hooks/            # useContractForm, useDrafts, useLocalStorage
├── components/
│   ├── form/         # ContractForm, PartFields, ServiceFields, PaymentFields,
│   │                   ClauseFields, TemplateSelector
│   ├── preview/      # ContractPreview, PrintButton
│   ├── drafts/       # DraftList, DraftItem
│   └── ui/           # Input, Button, Label (genéricos)
├── App.tsx           # Orquestrador: estado, layout, handlers
├── main.tsx          # Ponto de entrada React
└── index.css         # Estilos globais + Tailwind + @media print
```

### Fluxo de dados

```
useContractForm (contract + errors)
      │
      ├── TemplateSelector → templateId
      │
      ├── ContractForm (visibleSections, onChange, errors)
      │     ├── PartFields (contractor) ← data, errors, updateData
      │     ├── PartFields (hired)      ← data, errors, updateData
      │     ├── ServiceFields           ← condicional (template.sections)
      │     ├── ClauseFields            ← condicional
      │     └── PaymentFields           ← condicional
      │
      ├── ContractPreview ← template.generateText(contract)
      │
      └── DraftList ← useDrafts → localStorage
```

### Padrão de atualização de estado

Cada seção do formulário recebe **apenas seu slice** do contrato e uma função `updateData(key, value)` tipada. O `ContractForm` traduz isso para `onChange(sectionKey, mergedSlice)`, que por sua vez chama `handleChange` do hook — um **spread merge** que preserva os outros campos da seção:

```
updateData("name", "João")
  → onChange("contractor", { ...contract.contractor, name: "João" })
    → setContract(prev => { ...prev, contractor: { ...prev.contractor, name: "João" } })
```

### Sistema de templates

Cada template implementa a interface:

```ts
type ContractTemplate = {
  id: string;
  label: string;
  description: string;
  sections: ('service' | 'payment' | 'itemContract')[];
  generateText: (data: Contract) => string;
};
```

- `sections` controla quais seções do formulário são exibidas (Parte Contratante/Contratada sempre aparecem).
- `generateText` recebe o contrato completo e retorna o texto formatado com `\n` para quebras de linha. O preview renderiza dentro de `<pre>` com `white-space: pre-wrap`.

---

## 🛠️ Stack

| Tecnologia | Versão |
|---|---|
| React | 19.x |
| TypeScript | 6.x |
| Vite | 8.x |
| Tailwind CSS | 4.x |
| ESLint | 9.x |

---

## ⚖️ Aviso legal

Os contratos gerados pelo **Contrato Fácil** são modelos de referência. **Recomenda-se a revisão por profissional jurídico** antes da assinatura. A ferramenta não substitui assessoria legal especializada.

---

## 📝 Licença

Uso livre.
