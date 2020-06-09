from flask import Flask, render_template
import pymysql

app = Flask(__name__)

conn = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='123456',
    db='npc_shop',
    charset='utf8'
)




# @app.route('/')
def hello_world():
    cur = conn.cursor()  # 生成游标对象

    # 获取product_info
    sql = "select * from product_info"
    cur.execute(sql)
    content = cur.fetchall()
    for con in content:
        print(con)

    # 获取表头
    sql = "SHOW FIELDS FROM product_info"
    cur.execute(sql)
    labels = cur.fetchall()
    labels = [l[0] for l in labels]

    print(labels)

    # return render_template('index.html', labels=labels, content=content)


if __name__ == '__main__':
    hello_world()
