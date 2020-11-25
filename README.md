# Cli Difference Calculator

<!-- ### Hexlet tests and linter status: -->
![Actions Status](https://github.com/Surtt/frontend-project-lvl2/workflows/hexlet-check/badge.svg)
![GitHub Actions](https://github.com/Surtt/Cli-Difference-Calculator/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/b919c04905f23306fef5/maintainability)](https://codeclimate.com/github/Surtt/Cli-Difference-Calculator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b919c04905f23306fef5/test_coverage)](https://codeclimate.com/github/Surtt/Cli-Difference-Calculator/test_coverage)

## Description
Gendiff is a command-line difference calculator.  
Comparing two configuration files and showing a difference.

## Examples

### JSON
file1.json:
```
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
file2.json:
```
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

Comparing JSON's files
[![asciicast](https://asciinema.org/a/tpyAFzRAXThdxYhNZHYg2NP7u.svg)](https://asciinema.org/a/tpyAFzRAXThdxYhNZHYg2NP7u)

### YAML
file1.yml:
```
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
```
file2.yml:
```
timeout: 20
verbose: true
host: hexlet.io
```

Comparing YAML's files
[![asciicast](https://asciinema.org/a/O9nbgNEgCBWNGnISQjs7TSWsT.svg)](https://asciinema.org/a/O9nbgNEgCBWNGnISQjs7TSWsT)

Output to stylish
[![asciicast](https://asciinema.org/a/tdojUjUBHNTU74YCRBLtdzCb3.svg)](https://asciinema.org/a/tdojUjUBHNTU74YCRBLtdzCb3)

Ouput to plain
[![asciicast](https://asciinema.org/a/RjTaOcLAGnwfxz7FxFVi0ERSn.svg)](https://asciinema.org/a/RjTaOcLAGnwfxz7FxFVi0ERSn)

Output to json
[![asciicast](https://asciinema.org/a/brA595NV6KUAjbP7tEiohecx9.svg)](https://asciinema.org/a/brA595NV6KUAjbP7tEiohecx9)