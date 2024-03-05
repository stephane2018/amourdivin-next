FROM node:18-alpine as builder
WORKDIR /amourdivin

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:18-alpine as runner
WORKDIR /amourdivin
COPY --from=builder /amourdivin/package.json .
COPY --from=builder /amourdivin/package-lock.json .
COPY --from=builder /amourdivin/next.config.js ./
COPY --from=builder /amourdivin/public ./public
COPY --from=builder /amourdivin/.next/standalone ./
COPY --from=builder /amourdivin/.next/static ./.next/static

EXPOSE 5000

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]