# Fantasy Hockey Lines

A small WXT + React starter extension project.

## Start the project

1. Install dependencies:
   - `npm install`
2. Run the dev build for Firefox:
   - `npm run dev:firefox`

## Build (Firefox)

- `npm run build:firefox`

## Testing

Run tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Tests are required to pass before merging PRs to main.

## Git Workflow

### Branch Naming

Use the following format for branch names:

```
<type>/<issue-number>-<description>
```

**Types:**
- `feature/` — New feature
- `fix/` — Bug fix
- `refactor/` — Code refactoring
- `docs/` — Documentation
- `test/` — Test additions/updates

**Examples:**
```
feature/1-player-mapping
fix/2-espn-overlay-styling
docs/3-setup-instructions
```

### Pull Request Naming

Use the following format for PR titles:

```
<type>: <description>
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code refactoring
- `docs` — Documentation
- `test` — Test additions/updates
- `chore` — Maintenance tasks

**Examples:**
```
feat: add player name normalization
fix: resolve ESPN overlay z-index issue
docs: update contributing guide
test: add tests for player matcher
```

All PRs require:
- ✅ Tests passing
- ✅ TypeScript compilation passing
- ✅ At least one approval
