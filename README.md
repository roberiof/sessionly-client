# Sessionly Client

Frontend application for Sessionly, a platform that connects mentors and mentees in a single environment for communication, scheduling, and knowledge monetization.

## Product Overview

Sessionly's core value is to remove tool fragmentation (chat, video, payments, scheduling) and provide a simple, integrated experience.

Main offerings:

- Synchronous mentorship sessions (scheduled video calls)
- Asynchronous direct chat (continuous mentor-client communication)

## Planned Features

- Mentor availability and conflict-free scheduling
- In-platform video calls with restricted participant access
- Internal chat with persistent message history
- Payments to unlock session/chat access
- Dashboard with activity history and core metrics
- Session reviews and mentor reputation system
- Theme and language personalization

## Core Business Rules

- A session can only happen after confirmed payment
- Chat is only enabled after payment
- Users can only access resources they purchased
- Session lifecycle status: `SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`
- Only one chat is allowed per mentor/client pair

## Current Stack

- `Next.js 16` + `React 19` + `TypeScript`
- `Tailwind CSS 4`
- `Storybook 10`
- `Vitest` + `Playwright`
- `ESLint 9` + `Prettier 3`
- `React Hook Form` + `Zod`

## Package Management

This repository uses **pnpm** as the standard package manager.

- npm/yarn installs are blocked via `preinstall` (`only-allow pnpm`)
- Lockfile policy: only `pnpm-lock.yaml`
- CI fails if `package-lock.json` or `yarn.lock` is present

## Requirements

- `Node.js` 20+
- `pnpm` 10+

## Local Setup

```bash
pnpm install
pnpm dev
```

Application URL: [http://localhost:3000](http://localhost:3000)

## Scripts

- `pnpm dev`: start local development
- `pnpm build`: build for production
- `pnpm start`: run production build
- `pnpm lint`: run ESLint
- `pnpm format`: format code with Prettier
- `pnpm format:check`: verify formatting
- `pnpm check:lockfiles`: enforce lockfile policy
- `pnpm storybook`: run Storybook
- `pnpm build-storybook`: generate static Storybook build

## Main Structure

- `src/app`: app shell and routes (App Router)
- `src/components/ui`: reusable UI component primitives
- `src/components/stories`: Storybook stories
- `src/lib` and `src/utils`: shared utilities
- `src/types`: shared types
- `docs`: business and domain documentation

## Domain Documentation

- `docs/business-idea.docs.md`: product vision and value proposition
- `docs/entities.docs.md`: entities, relationships, and business rules
- `docs/tech-stack.docs.md`: architecture and technical stack decisions

## Code Quality

- Format-on-save is enabled in workspace settings (`.vscode/settings.json`)
- Formatting issues are also reported by ESLint (`prettier/prettier`)
- Quick fix flow:

```bash
pnpm lint --fix
pnpm format
```
