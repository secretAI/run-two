#!make
include ./api/docker.env

dev: 
	cd api/ && npm run test && npm run dev

run:
	docker-compose up --force-recreate