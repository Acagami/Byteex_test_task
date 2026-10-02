// The unauthenticated editing proxy must remain bound to the local machine.
process.env.BIND_HOST = '127.0.0.1'
process.env.PORT = '8081'
await import('decap-server')
