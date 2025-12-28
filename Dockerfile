FROM node:22-bookworm-slim AS base
WORKDIR /app

ENV PUPPETEER_SKIP_DOWNLOAD=1
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

RUN npm run build

FROM base AS prod-deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci --omit=dev

RUN npm install prisma --save-exact --no-save
RUN npx prisma generate
RUN npm uninstall prisma

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt-get update && apt-get install -y --no-install-recommends \
    dumb-init \
    chromium \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
  && rm -rf /var/lib/apt/lists/*

RUN groupadd -r nodeapp && useradd -r -g nodeapp nodeapp

COPY --from=prod-deps --chown=nodeapp:nodeapp /app/node_modules ./node_modules
COPY --from=build --chown=nodeapp:nodeapp /app/dist ./dist
COPY --from=build --chown=nodeapp:nodeapp /app/package.json ./package.json
COPY --from=build --chown=nodeapp:nodeapp /app/prisma ./prisma
COPY --from=build --chown=nodeapp:nodeapp /app/templates ./templates

RUN mkdir -p /home/nodeapp && chown -R nodeapp:nodeapp /home/nodeapp

ENV HOME=/home/nodeapp

USER nodeapp

EXPOSE 3002

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "dist/index.js"]
