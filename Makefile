#!make
include ./api/docker.env

serve: 
	cd api/ && npm run dev;

run:
	docker-compose up --force-recreate;