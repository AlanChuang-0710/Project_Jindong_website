const express = require("express");
const app = express();
const { leftNavShow_phone, leftNavShow_freshFood } = require("./data");

app.get("/server", (request, response) => {
    // 設置響應頭 設置允許跨域
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*")
    const data = [
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
        leftNavShow_phone, leftNavShow_freshFood,
    ]
    response.send(JSON.stringify(data));
});

// 監聽端口啟動
app.listen(3000, () => {
    console.log("Server is running, 3000窗口監聽中...")
})