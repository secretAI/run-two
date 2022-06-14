FROM postgres:14
FROM postgres:latest

ENV POSTGRES_DB = demo
ENV POSTGRES_USER = postgres
ENV POSTGRES_PORT = 5050
ENV POSTGRES_PASSWORD = postgres

COPY src/database/models/*/*.sql /docker-entrypoint-initdb.d/

EXPOSE 5050
