# 128T Docs

This repository contains the source code for Docusaurus to render the look and feel
of 128 Technology product documentation as well as the documentation itself in
markdown format.

The product of "building" the markdown files into static HTML files are published
to https://docs.128technology.com after PRs are merged into the master branch

If you are interested in contributing content to the repository, please first read through the [Contributing](https://docs.128technology.com/docs/CONTRIBUTING) guidelines.

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
2. Run `docker image build -t 128t-docs .` to build the image.
3. Run `docker create --name 128t-docs --publish 3000:3000 128t-docs` to create the container.
4. Run `docker start -a 128t-docs` to start the container.

That's it. Point a browser to http://localhost:3000 to see the fruits of your labor.

## Adding additional NPM packages

If you already have docker running, you will first need to stop docker:
```
docker-compose down
```
or
```
docker ps
docker stop <container-hash>
```
finally
```
docker rmi docs_docusaurus
```

At this point, you can now install any needed npm modules.  The next time docker starts
they will be added to the newly instantiated container.

