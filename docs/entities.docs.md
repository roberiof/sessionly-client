# Sessionly — Entidades da Aplicação

---

## Visão Geral

Este documento define as entidades principais da aplicação Sessionly, incluindo suas estruturas, relações e regras implícitas de negócio.

A modelagem segue princípios de:

- Normalização de dados
- Separação de responsabilidades
- Escalabilidade futura
- Simplicidade para MVP

---

## User

Entidade base do sistema. Representa qualquer usuário autenticado.

```ts
User {
  id: string (uuid, pk)
  name: string
  bio?: string
  email: string (unique, indexed)
  passwordHash: string
  avatarUrl?: string
  role: 'MENTOR' | 'CLIENT' | 'ADMIN'
  activityStatus: 'ACTIVE' | 'INACTIVE' | 'NOT_DISTURB'
  links: string[]
  createdAt: Date
  updatedAt: Date
}
```

---

## MentorProfile

Extensão do User para funcionalidades específicas de mentor.

```ts
MentorProfile {
  userId: string (pk, fk -> User.id)
  niche: string
  specialties: string[]
  chatPrice: number
  createdAt: Date
  updatedAt: Date
}
```

## ClientProfile

Extensão do User para funcionalidades específicas de cliente.

```ts
ClientProfile {
  userId: string (pk, fk -> User.id)
  interests: string[]
  createdAt: Date
  updatedAt: Date
}
```

---

## Session

Representa uma sessão de mentoria agendada.

```ts
Session {
  id: string (pk)

  mentorId: string (fk -> User.id)
  clientId: string (fk -> User.id)

  startTime: Date
  endTime: Date

  price: number

  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

  jitsiRoomId: string

  createdAt: Date
}
```

Regras:

- O preço é um snapshot no momento da criação
- Sessão só existe após pagamento confirmado

---

## Chat

Canal de comunicação permanente entre mentor e cliente.

```ts
Chat {
  id: string (pk)

  mentorId: string (fk -> User.id)
  clientId: string (fk -> User.id)

  createdAt: Date

  UNIQUE (mentorId, clientId)
}
```

Regras:

- Apenas um chat por par mentor/cliente
- Chat é permanente após compra

---

## Message

Mensagens trocadas dentro de um chat.

```ts
Message {
  id: string (pk)

  chatId: string (fk -> Chat.id)
  senderId: string (fk -> User.id)

  content: string

  createdAt: Date
  readAt?: Date
}
```

---

## Payment

Representa transações financeiras da plataforma.

```ts
Payment {
  id: string (pk)

  userId: string

  type: 'SESSION' | 'CHAT'

  referenceId: string

  amount: number
  currency: string

  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

  stripePaymentIntentId: string

  createdAt: Date
}
```

Regras:

- `referenceId` aponta para Session ou Chat
- Um pagamento ativa o acesso ao recurso

---

## Review

Avaliação de uma sessão de mentoria.

```ts
Review {
  id: string (pk)

  sessionId: string (fk -> Session.id, unique)

  mentorId: string
  clientId: string

  rating: number
  comment: string

  createdAt: Date
}
```

Regras:

- Uma sessão pode ter apenas uma avaliação
- Avaliação só pode ser feita após conclusão

---

## Relacionamentos

- User 1:1 MentorProfile
- User 1:N Session (como mentor)
- User 1:N Session (como cliente)
- User 1:N Message
- Chat 1:N Message
- Session 1:1 Payment
- Chat 1:1 Payment (por cliente)
- Session 1:1 Review

---

## Regras de Negócio Derivadas

### Acesso ao Chat

Um usuário pode acessar um chat apenas se existir:

- Payment com:
  - type = 'CHAT'
  - referenceId = chatId
  - status = 'PAID'

---

### Acesso à Sessão

Um usuário pode acessar uma sessão apenas se:

- Ele for mentor ou cliente da sessão
- O status permitir acesso (ex: SCHEDULED ou IN_PROGRESS)
- O pagamento estiver confirmado

---
