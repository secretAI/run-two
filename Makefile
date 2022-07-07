#!make
include ./api/docker.env

test: 
	cd api/ && npm run test NODE_ENV=test

serve: 
	cd api/ && npm run dev

run:
	docker-compose up --force-recreate;