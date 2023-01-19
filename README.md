# Currency Converter

Basic currency conversion using a [free currency conversion api](https://github.com/fawazahmed0/currency-api) for Little Bear onboarding.

Built on:
* [Next.js](https://nextjs.org)
* [Chakra UI](https://chakra-ui.com)
* [Styled Components](https://styled-components.com/)
* [Zustand](https://github.com/pmndrs/zustand)

Once running, you should be able to:
- login (spoofed)
- page through giant list of currencies
- search currencies using text input
- select 2 currencies to convert
- logout

## Local development

### Using docker

Install [Docker Desktop](https://docs.docker.com/desktop/) if you don't have it.

Common docker commands for development are in the Makefile:

```bash
# Build container and start next.js dev server on locahost:3000 using:
make up

# Stop container
make down

# Rebuild container
make build

# Drop into container shell (you can add dependencies without having use yarn on host here)
make shell

# Run linter
make lint
```

### Using VSCode Dev Container

Simply open project root in VSCode and follow the prompt. You'll need to install the Dev Containers extension if you don't have it already.

This should build the container and start the dev server on localhost:3000, as well as provide a shell for the container in the terminal.

### Without docker (on host)

```bash
# Install dependencies from project root:
yarn install

# Start up dev server:
yarn dev
```

## Project structure

```
- src/
  - components/ # reusable UI components and layouts.
  - pages/ # typical next.js pages directory for routing.
  - stores/ # zustand slices organized by topic, set to a global store.
  - styles/global.css # a very basic global stylesheet.
```

## Design decisions

### Login
I wouldn't normally implement the logged in logic and routing using `useEffect` and zustand actions (see `src/components/Layout/Layout.tsx`) if there were an auth service. However, in the interest of time, I decided not to create api routes to spoof the login to allow use of server-side props to handle the redirects.

### State management and data fetching
I always like to organize state by topic, and zustand makes this pretty easy using [their recommended slice pattern](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md). The slices get added to a flat global store accessible by `import { useBoundStore } from '@/stores` (resolving to `src/stores/index.ts`). Although TypeScript adds a bit of boilerplate when working with zustand stores (especially slices), it's well worth it to ensure the selectors and returned types are correct.

[SWR](https://swr.vercel.app/docs/with-nextjs) or a similar library would have simplified the data fetching in the application. I decided not to use it because zustand was a requirement, and using SWR would have made the zustand implementation pretty trivial. So all of the data fetching is done inside zustand actions.

### Styling and layout
This is where I probably spent the least amount of time. I relied on Chakra UI's out-of-the-box components as much as possible. I did find using Styled Components and Chakra UI at the same time to be a bit redundant because of Chakra UI's styled system, as well as Chakra having `@emotion/styled` as a dependency.

That said, everything should have a pretty clear layout and be responsive.
