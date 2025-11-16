# 1) Builder
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# 2) Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the full .next folder (Next.js 16 requires it)
COPY --from=builder /app/.next ./.next

# Copy node_modules (needed for the server)
COPY --from=builder /app/node_modules ./node_modules

# Copy public folder
COPY --from=builder /app/public ./public

COPY package.json ./

EXPOSE 3000

CMD ["npm", "start"]
