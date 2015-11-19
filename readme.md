# fs-transport-stream

Execute a command somewhere else on the fs and get results back as a stream.

[![build status](http://img.shields.io/travis/karissa/fs-transport-stream.svg?style=flat)](http://travis-ci.org/karissa/fs-transport-stream)

```
npm install fs-transport-stream
```

#### `fs-transport-stream(filepath, cmd)`

```js
var transport = require('fs-transport-stream')
var stream1 = transport('file://path/to/file', 'ls')
stream1.on('data', console.log)
```
