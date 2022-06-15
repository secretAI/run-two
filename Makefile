#!make
include ./api/docker.env

run:
	docker-compose up --force-recreate