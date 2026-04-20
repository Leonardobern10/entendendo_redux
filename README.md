# 📱 Sistema de Gestão de Clientes, Produtos e Pedidos

Um aplicativo React Native moderno para gerenciar clientes, produtos e pedidos com estado global gerenciado por Redux Toolkit.

**Status:** ✅ Completo | **Versão:** 1.0.0 | **Avaliação:** 7.45/10

---

## 📋 Sumário

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [API/Estado Redux](#-apiestado-redux)
- [Testes](#-testes)
- [Performance](#-performance)
- [Contribuindo](#-contribuindo)

---

## ✨ Features

### 👥 Gestão de Clientes

- ✅ Criar novo cliente (nome + email)
- ✅ Listar todos os clientes
- ✅ Buscar cliente por ID
- ✅ Atualizar dados do cliente
- ✅ Remover cliente
- ✅ Validação com Yup (email, nome obrigatório)

### 📦 Gestão de Produtos

- ✅ Criar novo produto (nome, quantidade, preço)
- ✅ Listar todos os produtos
- ✅ Buscar produto por ID
- ✅ Consultar disponibilidade

### 🛒 Gestão de Pedidos

- ✅ Criar pedido com cliente
- ✅ Adicionar produtos ao pedido
- ✅ Atualizar quantidade de produtos
- ✅ Remover produtos do pedido
- ✅ Calcular valor total automaticamente
- ✅ Listar todos os pedidos
- ✅ Remover pedido

### 🎨 UI/UX

- ✅ Interface moderna com React Native
- ✅ Loading states (ActivityIndicator)
- ✅ Alerts para feedback de usuário
- ✅ Navegação com Expo Router
- ✅ Validação de formulários em tempo real

---

## 🛠 Tech Stack

| Categoria        | Tecnologia           | Versão   |
| ---------------- | -------------------- | -------- |
| **Runtime**      | React Native         | 0.81.5   |
| **Framework**    | Expo                 | ~54.0.33 |
| **Estado**       | Redux Toolkit        | ^2.11.2  |
| **Database**     | SQLite (expo-sqlite) | ~16.0.10 |
| **Language**     | TypeScript           | ~5.9.2   |
| **Validação**    | Yup                  | ^1.7.1   |
| **Roteamento**   | Expo Router          | ~6.0.23  |
| **Navigation**   | React Navigation     | ^7.1.8   |
| **ID Generator** | UUID                 | ^13.0.0  |
| **Linting**      | ESLint               | ^9.25.0  |

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 16+ ([Download](https://nodejs.org/))
- npm ou yarn
- Expo CLI: `npm install -g expo-cli`
- Emulador Android/iOS ou Expo Go

### Passos

```bash
# 1. Clonar repositório
git clone <repository-url>
cd proj2

# 2. Instalar dependências
npm install

# 3. Iniciar o app
npm start

# 4. Escolher platform
# Pressionar 'a' para Android
# Pressionar 'i' para iOS
# Escanear QR code com Expo Go
```

### Compilação (Produção)

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 📖 Como Usar

### 1. Criar Cliente

```typescript
import { useClients } from '@/src/hooks/useClients';

export function MyComponent() {
  const { saveClient, setNewClient, newClient } = useClients();

  const handleCreate = async () => {
    setNewClient({
      name: 'João Silva',
      email: 'joao@email.com'
    });
    await saveClient(); // Valida e salva no Redux
  };

  return <Button onPress={handleCreate} title="Salvar" />;
}
```

### 2. Listar Clientes

```typescript
import { useClients } from '@/src/hooks/useClients';

export function ClientsList() {
  const { clients, loading } = useClients();

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={clients}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id.toString()}
    />
  );
}
```

### 3. Criar Pedido com Produtos

```typescript
import { useOrder } from '@/src/hooks/useOrder';
import { useProducts } from '@/src/hooks/useProducts';

export function CreateOrderFlow() {
  const { createOrder, addProducts } = useOrder();
  const { products } = useProducts();
  const [cart, setCart] = useState([]);

  const handleCreateOrder = async () => {
    // 1. Criar pedido vazio
    const order = await createOrder(clientId);

    // 2. Adicionar produtos
    await addProducts(order.id, cart);

    // ✅ Pedido criado com sucesso
  };

  return <Button onPress={handleCreateOrder} title="Criar Pedido" />;
}
```

---

## 🏗 Arquitetura

### Padrão: **DDD (Domain-Driven Design) + Redux Toolkit**

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│                 (React Native Components)                    │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                      Hooks Layer                             │
│            (useClients, useProducts, useOrder)              │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                      Redux Layer                             │
│        (Store, Slices, Thunks, Async Thunks)               │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                      │
│               (Services: ClientService, etc)                │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                     Repository Layer                         │
│          (ClientRepository, ProductRepository, etc)         │
└────────────────────────┬────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                         │
│                   (SQLite Database)                         │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
Component → Hook → Thunk → Service → Repository → SQLite
   ↓         ↓      ↓       ↓          ↓
Dispatch  useSelector dispatch   return   execute
                                 data      query
```

### Exemplo: Criar Cliente

```typescript
1. Component: <FormClient onSubmit={saveClient} />
   ↓
2. Hook: saveClient() chama dispatch(saveClientThunk(dto))
   ↓
3. Thunk: saveClientThunk envia DTO para service
   ↓
4. Service: Valida DTO com Yup
   ↓
5. Repository: Executa INSERT no SQLite
   ↓
6. Redux: Slice atualiza state com novo cliente
   ↓
7. Component: Recebe update via useSelector
```

---

## 📁 Estrutura de Pastas

```
proj2/
├── app/                          # Rotas (Expo Router)
│   ├── (tabs)/
│   │   ├── clients.tsx          # Tela de clientes
│   │   ├── orders.tsx           # Tela de pedidos
│   │   └── products/
│   │       └── index.tsx        # Tela de produtos
│   └── _layout.tsx              # Layout root + Provider Redux
│
├── src/
│   ├── components/              # Componentes UI reutilizáveis
│   │   ├── FormClient.tsx
│   │   ├── ClientItem.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   │
│   ├── features/                # Redux slices e thunks
│   │   ├── client/
│   │   │   ├── clientSlice.ts   # State + reducers
│   │   │   └── clientThunk.ts   # Async actions
│   │   ├── product/
│   │   └── order/
│   │
│   ├── hooks/                   # Custom hooks (abstraem Redux)
│   │   ├── useClients.tsx
│   │   ├── useProducts.tsx
│   │   └── useOrder.tsx
│   │
│   ├── modules/                 # Lógica de negócio (DDD)
│   │   ├── clients/
│   │   │   ├── model/
│   │   │   │   ├── entity/      # Client type
│   │   │   │   ├── dto/         # RegisterClientDTO, UpdateClientDTO
│   │   │   │   └── schema/      # Validação Yup
│   │   │   ├── service/         # ClientService (validação + lógica)
│   │   │   └── repository/      # ClientRepository (SQL queries)
│   │   ├── products/
│   │   └── orders/
│   │
│   ├── store/
│   │   └── store.ts             # Redux store configuration
│   │
│   ├── infra/
│   │   └── database/
│   │       └── migrations.ts    # SQLite schema + seed
│   │
│   ├── styles/
│   │   └── styles.ts            # Estilos globais
│   │
│   └── index.ts                 # DB connection export
│
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md                    # Este arquivo
```

---

## 📡 API/Estado Redux

### Store Structure

```typescript
store: {
  client: {
    loading: boolean;
    clients: Client[];
    error?: SerializedError;
  };
  product: {
    loading: boolean;
    products: Product[];
    error?: SerializedError;
  };
  order: {
    loading: boolean;
    orders: Order[];
    error?: SerializedError;
  };
}
```

### Principais Thunks

#### Clients

- `saveClientThunk(dto: RegisterClientDTO)` → Criar cliente
- `getAllClientThunk()` → Buscar todos
- `getClientByIdThunk(id: number)` → Buscar por ID
- `updateClientThunk(dto: UpdateClientDTO)` → Atualizar
- `removeClientThunk(id: number)` → Deletar

#### Products

- `createProductThunk(dto: RegisterProductDTO)` → Criar
- `getAllProductsThunk()` → Buscar todos
- `getProductsByIdThunk(id: number)` → Buscar por ID

#### Orders

- `createOrderThunk(clientId: number)` → Criar pedido
- `getAllOrdersThunk()` → Buscar todos
- `getOrderByIdThunk(id: number)` → Buscar por ID
- `addProductsToOrderThunk(data: { orderId, items })` → Adicionar produtos
- `removeOrderThunk(id: number)` → Deletar

---

## 🧪 Testes

### Status: ❌ Não implementado ainda

```bash
# Instalar Jest e React Testing Library (próximo passo)
npm install --save-dev jest @testing-library/react-native

# Executar testes
npm test
```

### Exemplo de teste a ser criado:

```typescript
describe("ClientService", () => {
  it("deve validar email obrigatório", async () => {
    const dto = { name: "João", email: "" };
    expect(() => saveClientService(dto)).toThrow("Email is invalid");
  });

  it("deve salvar cliente válido", async () => {
    const dto = { name: "João", email: "joao@email.com" };
    const client = await saveClientService(dto);
    expect(client.name).toBe("João");
  });
});
```

---

## ⚡ Performance

### Otimizações Implementadas

- ✅ SQLite local (sem requisições HTTP)
- ✅ Redux Toolkit (menos boilerplate)
- ✅ Lazy loading de rotas
- ✅ Memoização com useCallback

### Melhorias Recomendadas

1. **Adicionar índices SQLite**

   ```sql
   CREATE INDEX idx_orders_client ON orders(client_id);
   CREATE INDEX idx_products_orders ON products_orders(order_id);
   ```

2. **Implementar EntityAdapter**

   ```typescript
   // Normalizar estado para performance
   const clientsAdapter = createEntityAdapter<Client>();
   ```

3. **Memoizar Selectors**

   ```typescript
   // Usar Reselect para evitar re-renders desnecessários
   import { createSelector } from "reselect";
   ```

4. **Virtualization em Listas Grandes**
   ```typescript
   <FlatList
     windowSize={10}
     maxToRenderPerBatch={10}
   />
   ```

---

## 🔒 Segurança

### ✅ Implementado

- SQL Prepared Statements (previne SQL injection)
- TypeScript strict mode
- Validação com Yup

### ⚠️ Não Implementado (Futuro)

- Autenticação/Login
- Criptografia de dados
- Rate limiting

---

## 🐛 Problemas Conhecidos

| Problema                   | Severidade | Status           |
| -------------------------- | ---------- | ---------------- |
| Sem testes automatizados   | 🔴 Alta    | ❌ Não resolvido |
| Código duplicado em slices | 🟠 Média   | ⏳ Em backlog    |
| Queries N+1 em orders      | 🟠 Média   | ⏳ Em backlog    |
| Sem caching de queries     | 🟡 Baixa   | ⏳ Em backlog    |

---

## 📊 Avaliação do Código

Última avaliação: **20/04/2026**

| Critério         | Nota        | Status           |
| ---------------- | ----------- | ---------------- |
| Eficácia         | 8/10        | ✅ Muito Bom     |
| Legibilidade     | 7/10        | ✅ Bom           |
| Escrita          | 8/10        | ✅ Bom           |
| Manutenibilidade | 8/10        | ✅ Bom           |
| SOLID            | 7/10        | ✅ Bom           |
| Segurança        | 7/10        | ✅ Bom           |
| **MÉDIA GERAL**  | **7.45/10** | **✅ Muito Bom** |

[📋 Avaliação Detalhada](./EVALUATION.md)

---

## 🚀 Roadmap

### v1.1 (Próximo)

- [ ] Adicionar testes Jest
- [ ] Factory pattern para reducers
- [ ] Middleware de logging

### v1.2

- [ ] EntityAdapter para normalização
- [ ] Reselect para memoização
- [ ] Índices SQLite

### v2.0

- [ ] Autenticação (JWT)
- [ ] API Backend
- [ ] Autosync

---

## 📚 Referências

### Redux

- [Redux Toolkit Official Guide](https://redux-toolkit.js.org/)
- [Redux Style Guide](https://redux.js.org/style-guide/style-guide)

### React Native

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

### Validação

- [Yup Documentation](https://github.com/jquense/yup)

---

## 📄 Licença

Este projeto é fornecido como está para fins educacionais.

---

## 👨‍💻 Autor

Criado como um projeto de aprendizado de Redux Toolkit e React Native.

**Última atualização:** 20/04/2026

---

## 🤝 Contribuindo

Para contribuir:

1. Crie uma branch: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'feat: adicionar minha feature'`
3. Push: `git push origin feature/minha-feature`
4. Abra um Pull Request

---

## ❓ Suporte

Dúvidas? Abra uma [issue](https://github.com/seu-usuario/proj2/issues) no GitHub.

---

**Desenvolvido com ❤️ usando React Native + Redux Toolkit**
