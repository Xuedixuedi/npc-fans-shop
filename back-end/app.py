import json
import os

from flask import Flask, render_template, request, jsonify, session, url_for
import pymysql
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user
from werkzeug.security import generate_password_hash
import uuid

from werkzeug.utils import redirect

app = Flask(__name__)
app.secret_key = 'abc'  # 设置表单交互密钥

app.config['SESSION_TYPE'] = 'filesystem'  # session类型为redis
app.config[
    'SESSION_FILE_DIR'] = '/Users/xuedixuedi/lxdThings/Code/github/npc-fans-shop/front-end/assests/2.flask-session'  # session类型为redis
app.config['SESSION_FILE_THRESHOLD'] = 500  # 存储session的个数如果大于这个值时，就要开始进行删除了
app.config['SESSION_FILE_MODE'] = 384  # 文件权限类型

app.config['SESSION_PERMANENT'] = True  # 如果设置为True，则关闭浏览器session就失效。
app.config['SESSION_USE_SIGNER'] = False  # 是否对发送到浏览器上session的cookie值进行加密
app.config['SESSION_KEY_PREFIX'] = 'session:'  # 保存到session中的值的前缀

login_manager = LoginManager()  # 实例化登录管理对象
login_manager.init_app(app)  # 初始化应用
login_manager.login_view = 'login'  # 设置用户登录视图函数 endpoint

# r'/*' 是通配符，让本服务器所有的URL 都允许跨域请求
CORS(app, resources=r'/*')


# test
@app.route('/', methods=['POST'])
def home():
    name = now_customer_data.get("name")
    result_text = {"statusCode": 200, "username": name}
    return result_text


# 注册
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    msg = create_user(data)
    return msg


# 登录
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    msg = get_user(data)
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


# 传入用户名、密码、name的data
def get_user(data):
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
    sql = "SELECT * FROM customer_login \
           WHERE customer_id = %d and password = \'%s\'" % \
          (data['username'], data['password'])

    try:
        # 执行sql语句
        cursor.execute(sql)
        results = cursor.fetchall()
        print(results[0][1])  # results[0][1]是用户昵称
        if len(results) == 1:
            msg = "登录成功！"
            global now_customer_data  # 全局session
            now_customer_data = {"username": data['username'], "name": results[0][1]}  # 全局记录当前的用户
        else:
            msg = '用户名或密码不正确'
        # 执行sql语句
        conn.commit()
    except:
        # 发生错误时回滚
        conn.rollback()
        msg = "登录失败，请检查用户名及密码"

    conn.close()  # 关闭连接
    return msg


# 当登录成功时，修改state为登录状态
def changeState(user_name):
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
    sql = "UPDATE customer_login SET stats = 1"
    print(sql)

    try:
        # 执行sql语句
        cursor.execute(sql)
        msg = '用户名或密码不正确'
        # 执行sql语句
        conn.commit()

    except:
        # 发生错误时回滚
        conn.rollback()
        msg = "登录失败，请检查用户名及密码"

        conn.close()  # 关闭连接


if __name__ == '__main__':
    app.run(debug=True)
