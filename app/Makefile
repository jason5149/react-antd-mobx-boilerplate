NVM_SOURCE=~/.nvm/nvm.sh
ifndef JENKINS_HOME
	NVM_SOURCE=`brew --prefix nvm`/nvm.sh
endif
TARGET_NODE_VERSION=v8.11.1

.PHONY: build
build:
	source $(NVM_SOURCE); \
	nvm ls $(TARGET_NODE_VERSION); \
	if [ $$? -eq 0 ]; \
	then \
		echo "node $(TARGET_NODE_VERSION) is installed, skipping..."; \
	else \
		echo "node $(TARGET_NODE_VERSION) is uninstalled. Now installing..."; \
		export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node; \
		nvm install $(TARGET_NODE_VERSION); \
	fi; \
	export NVM_DIR=~/.nvm; \
	export APP_ENV=dev; \
	nvm use $(TARGET_NODE_VERSION); \
	npm install && \
	npm run build; \

build-dev:
	export APP_ENV=dev; \
	npm run build; \

build-fat:
	export APP_ENV=fat; \
	npm run build; \

build-uat:
	export APP_ENV=uat; \
	npm run build; \

build-pro:
	export APP_ENV=pro; \
	npm run build; \

dev:
	npm run dev;
