package main

import (
	"github.com/kataras/iris"
	"github.com/tidwall/gjson"
	"github.com/kataras/iris/websocket"
)

func main() {
	app := iris.New()

	app.Get("/", func(ctx iris.Context) {
		ctx.ServeFile("websockets.html", false) // second parameter: enable gzip?
	})

	setupWebsocket(app)

	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	app.Run(iris.Addr(":9090"))
}

func setupWebsocket(app *iris.Application) {
	// create our echo websocket server
	ws := websocket.New(websocket.Config{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	})
	ws.OnConnection(handleConnection)

	// register the server on an endpoint.
	// see the inline javascript code in the websockets.html, this endpoint is used to connect to the server.
	app.Get("/chat", ws.Handler())
}

func handleConnection(c websocket.Connection) {
	//加入房间
	c.On("join", func(msg string) {
		myRooms := gjson.Parse(msg).Get("myRooms").Array()
		for _, room := range myRooms {
			c.Join(room.String())
		}
	})

	//聊天
	c.On("chat", func(msg string) {
		roomId := gjson.Parse(msg).Get("roomId").Value().(string)
		message := gjson.Parse(msg).Get("msg").Value().(string)
		c.To(roomId).Emit("chat", message)

	})

	//断开连接
	c.OnDisconnect(func(){

	})




}