# Cli Difference Calculator

<!-- ### Hexlet tests and linter status: -->
[![Actions Status](https://github.com/Surtt/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Surtt/frontend-project-lvl2/actions?query=workflow%3Ahexlet-check)
[![GitHub Actions](https://github.com/Surtt/Cli-Difference-Calculator/workflows/Node%20CI/badge.svg)](https://github.com/Surtt/frontend-project-lvl2/actions?query=workflow%3A%22Node+CI%22)
[![Maintainability](https://api.codeclimate.com/v1/badges/b919c04905f23306fef5/maintainability)](https://codeclimate.com/github/Surtt/Cli-Difference-Calculator/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b919c04905f23306fef5/test_coverage)](https://codeclimate.com/github/Surtt/Cli-Difference-Calculator/test_coverage)

## Description
Gendiff is a command-line difference calculator.  
Comparing two configuration files and showing a difference.

## Installing
1. Clone this repository to your filesystem:
```git https://github.com/Surtt/frontend-project-lvl2.git```
2. Go to directory frontend-project-lvl2 and create links:
```npm link```

## Usage
```gendiff [options] <pathToFile1> <pathToFile2>```
Options:  
`-V, --version` output the version number  
`-f, --format [type]` Output format  
`-h, --help` output usage information  
`[type]` - `tree`, `plain`, `json`  
`<pathToFile>` - path to json, yaml or ini configuration file

## Examples

### Flat JSON
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
Result
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

[![asciicast](https://asciinema.org/a/tpyAFzRAXThdxYhNZHYg2NP7u.svg)](https://asciinema.org/a/tpyAFzRAXThdxYhNZHYg2NP7u)

### Flat YAML
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
Result
```
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

[![asciicast](https://asciinema.org/a/O9nbgNEgCBWNGnISQjs7TSWsT.svg)](https://asciinema.org/a/O9nbgNEgCBWNGnISQjs7TSWsT)

### Multi-level configuration files
file1.json:
```
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```
file2.json:
```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "fee": 100500,
    "deep": {
      "id": {
        "number": 45
      }
    }
  }
}
```
#### Output to stylish
```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}
```


[![asciicast](https://asciinema.org/a/tdojUjUBHNTU74YCRBLtdzCb3.svg)](https://asciinema.org/a/tdojUjUBHNTU74YCRBLtdzCb3)

#### Ouput to plain
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

[![asciicast](https://asciinema.org/a/RjTaOcLAGnwfxz7FxFVi0ERSn.svg)](https://asciinema.org/a/RjTaOcLAGnwfxz7FxFVi0ERSn)


#### Output to json
```
[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"changed","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"changed","value1":"","value2":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"changed","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"fee":100500,"deep":{"id":{"number":45}}}}]
```
[![asciicast](https://asciinema.org/a/brA595NV6KUAjbP7tEiohecx9.svg)](https://asciinema.org/a/brA595NV6KUAjbP7tEiohecx9)