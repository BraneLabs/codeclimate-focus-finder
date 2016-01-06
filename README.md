# Code Climate focus-finder Engine

`codeclimate-focus-finder` is a Code Climate engine to find occurrences of `focus: true` in your specs.

You can run it on your command line using the Code Climate CLI

### Installation

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. If you haven't already, [install the Docker Engine](https://docs.docker.com/engine/installation/).

### Building

Clone the project and run `docker build -t codeclimate/codeclimate-focus-finder .` inside the project's folder.

This will build a `codeclimate/codeclimate-focus-finder` image locally

### Configuration
To enable `codeclimate-focus-finder` in your project, add the proper configurantion in your `.codeclimate.yml` to enable the engine. A `paths` configurantion must be specified. 

The engine will only analyze paths specified in this configuration. Since it's intended to analyze only spec files, this engine will ignore the default `included_paths` configuration. Usually these files are excluded for others engine's analysis.

Example of a valid `.codeclimate.yml` configuration file:

```yml
engines:
  focus-finder:
    enabled: true
    config:
      paths:
        - spec/**/*
```

### Usage

Browse into the project you want to analyze and run `codeclimate analyze --dev`


### Need help?

For help with `codeclimate-focus-finder`, please open an issue on this repository.

If you're running into a Code Climate issue, first look over this project's [GitHub Issues](https://github.com/codeclimate/codeclimate-watson/issues), as your question may have already been covered. If not, [go ahead and open a support ticket with us](https://codeclimate.com/help).
