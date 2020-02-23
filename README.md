# 128T Docs
This repository contains the source code for Docusaurus to render the look and feel
of 128 Technology product documentation as well as the documentation itself in
markdown format.

# Local Building and Testing

## Run the local web server in Docker

Preview your docs from a local live-reloading web server running in docker!

### With `docker-compose`
The simplest method to run the server is with `docker-compose`.

1. Ensure you have installed `docker` and `docker-compose`.
2. Run `docker-compose up` to build and start the server in a container.

### With `docker`
Alternatively if you prefer, you can run the server just with `docker`.

1. Ensure you have installed `docker`.
2. Build the image with `docker image build -t 128t-docs .`
3. Create the container with `docker create --name 128t-docs --publish 3000:3000 128t-docs`
3. Run `docker start -a 128t-docs `

That's it. Point a browser to http://localhost:3000 to see the fruits of your labor.
