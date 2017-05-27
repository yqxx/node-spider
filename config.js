/**
 * 配置文件
 */

exports.dbconfig = {
    host: 'localhost',//数据库服务器
    user: 'root',//数据库用户名
    password: 'sa123',//数据库密码
    database: 'node_spider',//数据库名
    port: 3306,//数据库服务器端口
    poolSize: 20,
    acquireTimeout: 30000
};

exports.mailservice = "126";//邮件通知服务类型
exports.mailuser = "12345@126.com";//邮箱用户名
exports.mailpass = "password";//邮箱密码
exports.mailfrom = "12345@126.com";//发送邮件地址
exports.mailto = "12345@126.com";//接收通知邮件地址