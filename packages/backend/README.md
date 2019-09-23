# Open Spaces Spring Application

This is the backend for managing Open Spaces.

## Generate Dockerfile

In order to generate the Dockerfile containing this application, just type in the console:
`./gradlew clean test dockerCreateDockerfile`

This will generate the Dockerfile and its dependecies under `build/docker` folder.