let app = require('express');
let httpServer= require('http').Server(app);
let io = require('socket.io')(httpServer);
// app.use(socket)
io.on('connection', (socket) => {
    socket.emit('news', { hello: "world" })
    socket.on('my other event', function (data) {
        console.log(data);
        socket.emit('myotherevents',{data:'登录成功'})
    });
    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
})
httpServer.listen(8000);