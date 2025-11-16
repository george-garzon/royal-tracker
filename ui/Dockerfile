# ----------------------------
# 1) Builder image
# ----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Install OS deps
RUN apk add --no-cache libc6-compat

# Install deps separately for better cache
COPY package.json package-lock.json* ./ 
RUN npm install

# Copy rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build


# ----------------------------
# 2) Runner image
# ----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy Next.js standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
