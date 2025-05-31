ARG INSTALLER=yarn

# --- Etapa Base ---
FROM node:22.16-slim AS base

# --- Etapa de Dependencias ---
FROM base AS deps
ARG INSTALLER
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json .yarnrc.yml ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./ 
RUN corepack enable
RUN \
  if [ "${INSTALLER}" == "yarn" ]; then yarn install; \
  elif [ "${INSTALLER}" == "npm" ]; then npm ci; \
  elif [ "${INSTALLER}" == "pnpm" ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Valid installer not set." && exit 1; \
  fi

# --- Etapa de Compilación (Builder) ---
FROM base AS builder
ARG INSTALLER
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable
RUN \
  if [ "${INSTALLER}" == "yarn" ]; then yarn build; \
  elif [ "${INSTALLER}" == "npm" ]; then npm run build; \
  elif [ "${INSTALLER}" == "pnpm" ]; then pnpm run build; \
  else echo "Valid installer not set." && exit 1; \
  fi

# --- Etapa de Producción (Runner) ---
FROM nginx:alpine AS runner
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]