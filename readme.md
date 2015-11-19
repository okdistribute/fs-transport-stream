# fs-transport-stream

Execute a command somewhere else on the fs and get results back as a stream.

[![build status](http://img.shields.io/travis/karissa/fs-transport-stream.svg?style=flat)](http://travis-ci.org/karissa/fs-transport-stream)

```
npm install fs-transport-stream
```

#### `fs-transport-stream(cmd, filepath)`

```js
var transport = require('fs-transport-stream')
var stream1 = transport('ls', 'file://path/to/file')
stream1.on('data', console.log)
```
