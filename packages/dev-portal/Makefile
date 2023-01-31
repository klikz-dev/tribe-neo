VERSION := $(VITE_APP_VERSION)

UNAME := $(shell uname -s)
SED = sed -i
ifeq ($(UNAME), Darwin)
	SED = sed -i ''
endif

server: clean client config
	@echo "Building server..."
	@cp server.mjs build/server.mjs
	@$(SED) 's/.\/dist\//.\//g' build/server.mjs

config:
	@echo "Copy runtime assets..."
	@cp dist/src/config.js build/src/config.js
	@$(SED) 's/import.meta.env.VITE_APP_VERSION/"$(VERSION)"/g' build/src/config.js

client:
	@echo "Copy static assets..."
	@cp -r dist/client build/client
	@$(SED) 's/\/\/_ENV_PLACEHOLDER_/window.process={ env: <%- JSON.stringify(env) %> }/g' build/client/index.html

clean:
	@echo "Cleaning build directory..."
	@rm -rf build
	@mkdir -p build/src
