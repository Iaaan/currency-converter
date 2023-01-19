COMPOSE_YML?=docker-compose.yml
PROJECT_NAME?=currency-converter

up:
	docker-compose  -p ${PROJECT_NAME} -f ${COMPOSE_YML} up

down:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} down

build-app:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} run --rm app yarn build

build:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} build

build-nocache:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} build --no-cache

lint:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} run --rm app yarn lint

shell:
	docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_YML} run --rm app sh
