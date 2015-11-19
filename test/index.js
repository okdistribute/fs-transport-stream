var tape = require('tape')
var transport = require('../')
var concat = require('concat-stream')
var path = require('path')

tape('file transport', function (t) {
  t.plan(3)

  var cmd = 'node ' + JSON.stringify(path.join(__dirname, 'fixtures', 'spawn.js'))
  var stream1 = transport(cmd, '.')

  stream1.pipe(concat(function (buf) {
    var obj = JSON.parse(buf.toString())
    t.same(obj, {
      cwd: process.cwd(),
      stdin: 'hello\nworld\n'
    })
  }))

  stream1.write('hello\n')
  stream1.write('world\n')
  stream1.end()

  var stream2 = transport(cmd, 'file://' + path.join(__dirname, 'fixtures'))

  stream2.pipe(concat(function (buf) {
    var obj = JSON.parse(buf.toString())
    t.same(obj, {
      cwd: path.join(__dirname, 'fixtures'),
      stdin: 'world'
    })
  }))

  stream2.write('world')
  stream2.end()

  var stream3 = transport(cmd, '/does/not/exist')

  stream3.on('error', function (err) {
    t.ok(err, 'had error')
  })
})

tape('spawned program does not exist', function (t) {
  t.plan(1)

  var cmd = '/i/am/not/a/program'
  var stream = transport(cmd, 'file://' + path.join(__dirname, 'fixtures'))

  stream.on('error', function (err) {
    t.ok(err, 'had error')
    t.end()
  })
})
