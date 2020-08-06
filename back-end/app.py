from flask import Flask, render_template, request, jsonify
import pymysql
from flask_cors import CORS

app = Flask(__name__)

# r'/*' 是通配符，让本服务器所有的URL 都允许跨域请求
CORS(app, resources=r'/*')


# conn = pymysql.connect(
#     host='127.0.0.1',
#     user='root',
#     port=3306,
#     password='123456',
#     db='npc_shop',
#     charset='utf8'
# )


# def queryOrder:

# test
@app.route('/')
def home():
    result_text = {"statusCode": 200, "username": "lxd"}
    return result_text


# 注册
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    return jsonify({"username": username})


@app.route('/cart')  # 购物车信息
def cart():
    result_text = {"product_name": "I Do 香榭之吻", "qty": 1, "price": 520}
    return result_text


# @app.route('/hello')  # 函数的装饰
# def hello_world():
#     # 创建光标对象，一个连接可以有很多光标，一个光标跟踪一种数据状态。
#     # 光标对象作用是：、创建、删除、写入、查询等等
#     cur = conn.cursor()
#
#     # 关闭连接对象，否则会导致连接泄漏，消耗数据库资源
#     conn.close()
#     # 关闭光标
#     cur.close()
#
#     # get annual sales rank
#     sql = "select * from product_info"
#     cur.execute(sql)
#     content = cur.fetchall()
#
#     # 获取表头
#     sql = "SHOW FIELDS FROM product_info"
#     cur.execute(sql)
#     labels = cur.fetchall()
#     labels = [l[0] for l in labels]
#     print(labels)
#     print(content)
#
#     # return render_template('index.html', labels=labels, content=content)


if __name__ == '__main__':
    app.run(debug=True)
