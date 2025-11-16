# ----------------------------
# 1) Builder image
# ----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install OS deps
RUN apk add --no-cache libc6-compat

# Install deps separately for better caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build


# ----------------------------
# 2) Runner image
# ----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy standalone Next.js build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
