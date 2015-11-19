var fs = require('fs')
var duplexify = require('duplexify')
var execspawn = require('execspawn')

module.exports = function (cmd, transport) {
  transport = transport.replace(/^file:\/\//, '')
  var stream = duplexify()

  fs.stat(transport, function (err, st) {
    if (stream.destroyed) return
    if (err) return stream.destroy(err)
    if (!st.isDirectory()) return stream.destroy(new Error('Not a directory'))

    var child = execspawn(cmd, {cwd: transport})

    child.stderr.setEncoding('utf-8')
    child.stderr.on('data', function (data) {
      stream.emit('warn', data)
    })

    child.on('error', function (err) {
      stream.destroy(err)
    })

    child.on('exit', function (code) {
      if (!code) return
      var err = new Error('Command failed with exit code: ' + code)
      err.code = code
      stream.destroy(err)
    })

    stream.setReadable(child.stdout)
    stream.setWritable(child.stdin)
  })

  return stream
}
