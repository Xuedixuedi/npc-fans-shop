import json
from flask import Flask, render_template, request, jsonify
import pymysql
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user
from werkzeug.security import generate_password_hash
import uuid

# ...
USERS = [
    {
        "id": 1,
        "name": 'lily',
        "password": generate_password_hash('123')
    },
    {
        "id": 2,
        "name": 'tom',
        "password": generate_password_hash('123')
    }
]

app = Flask(__name__)
app.secret_key = 'abc'  # 设置表单交互密钥

login_manager = LoginManager()  # 实例化登录管理对象
login_manager.init_app(app)  # 初始化应用
login_manager.login_view = 'login'  # 设置用户登录视图函数 endpoint

# r'/*' 是通配符，让本服务器所有的URL 都允许跨域请求
CORS(app, resources=r'/*')


# # 连接到数据库
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
    print(data)
    print(data['username'])
    msg = create_user(data)
    return msg


@app.route('/cart')  # 购物车信息
def cart():
    result_text = {"product_name": "I Do 香榭之吻", "qty": 1, "price": 520}
    return result_text


# 传入用户名、密码、name的data
def create_user(data):
    # 连接到数据库
    conn = pymysql.connect(
        host='127.0.0.1',
        user='root',
        port=3306,
        password='123456',
        db='npc_shop',
        charset='utf8'
    )
    # 使用cursor()方法获取操作游标
    cursor = conn.cursor()

    # SQL 插入语句  里面的数据类型要对应
    sql = "INSERT INTO customer_login(customer_id, \
           login_name, password) \
           VALUES ('%s', '%s',  %s)" % \
          (data['username'], data['name'], data['password'])

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 执行sql语句
        conn.commit()
        msg = "注册成功,请登录"

    except:
        # 发生错误时回滚
        conn.rollback()
        msg = "注册失败,用户名重复或未按格式输入"

    conn.close()  # 关闭连接
    return msg


def get_user(user_name):
    """根据用户名获得用户记录"""
    for user in USERS:
        if user.get("name") == user_name:
            return user
    return None


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
