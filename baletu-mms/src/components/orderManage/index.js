import React from "react";

import { Input, Table, Button, Form, Row, Modal, Select, message } from 'antd';
import { EditOutlined, PoweroffOutlined, SearchOutlined } from '@ant-design/icons';


// import "../../assets/css/houseManage.css"
import yuyueApi from "../../api/yuyueApi";

const { Option } = Select;

// const { Option } = Select;


// const { Search } = Input;

/*
  用户管理
*/

class UserManage extends React.Component {
  constructor() {
    super()


    this.state = {
      // 表头
      columns: [
        {
          title: '用户ID',
          dataIndex: 'user_id',
          key: 'user_id',
          width: 60,
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          width: 100,
        },
        // {
        //   title: '真实姓名',
        //   dataIndex: 'name',
        //   key: 'name',
        //   width: 80,
        // },
        {
          title: '手机号码',
          dataIndex: 'phone',
          key: 'phone',
          width: 100,
        },
        {
          title: '房间序号',
          dataIndex: 'home_id',
          key: 'home_id',
          width: 60,
        }, {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
          width: 50,
        },
        {
          title: '房名',
          dataIndex: 'title',
          key: 'title',
          width: 140,
        },

        {
          title: '租金',
          dataIndex: 'price',
          key: 'price',
          width: 80,
        },
        {
          title: '预约日期',
          dataIndex: 'data',
          key: 'data',
          width: 80,
        },
        {
          title: '预约状态',
          dataIndex: 'state',
          key: 'state',
          width: 80,
        },

        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          render: (action, row) => {
            //直接渲染到操作这一列
            // console.log(action, 9990);
            return (
              <React.Fragment>
                <Button type="primary" shape="circle" icon={<EditOutlined />} title="编辑" onClick={this.editUser.bind(this, row)} /> &nbsp; &nbsp;

              </React.Fragment>
            );
          },
          width: 140,
        },
      ],
      // 表格内容数据
      data: [],
      page: 1,             // 第几页
      pagesize: 10,        // 一页多少条
      total: "",           // 总数
      search: {   // 查询条件
        address: ""
      },
      // selectedRowKeys: []   // 选中的
      isEdit: false,
      visible: false,       // 控制弹出层
      user_id: null,
      home_id: null
    }
    this.formRef = React.createRef();
    this.formRef2 = React.createRef();

  }

  // 渲染数据
  fetchAll() {
    // let { page,pagesize,search } = this.state
    // this.state.search = JSON.stringify(this.state.search)
    // console.log(this.state.search)
    yuyueApi.getAddressList(this.state.page, this.state.pagesize, this.state.search.address).then((res) => {
      // console.log(res.data)
      let arr = res.data.data;
      arr.forEach((item) => {
        //给每一条数据添加一个key值。就用_id来做key值
        item.key = item.id;
        setTimeout(() => {
          let ar = document.querySelectorAll(".ant-table-row .ant-table-cell")
          // console.log(ar)
          ar.forEach(item => {
            if (item.innerText === "取消预约") {
              item.style.color = "red"
              item.style.fontWeight = "bold"
            } else if (item.innerText === "预约中") {
              item.style.color = "#58bc58"
              item.style.fontWeight = "bold"
            } else if (item.innerText === "预约结束") {
              item.style.color = "#e6a23c"
              item.style.fontWeight = "bold"
            }
          })
        }, 300)

        // if (item.state == "取消预约") {
        //   item.state
        // }
      });
      this.setState({
        data: arr,
        total: res.data.total
      })
    })
  }
  //用户渲染
  fetchAll2() {
    // let { page,pagesize,search } = this.state
    // this.state.search = JSON.stringify(this.state.search)
    // console.log(this.state.search)
    yuyueApi.getUsernameList(this.state.page, this.state.pagesize, this.state.search.username).then((res) => {
      console.log(this.state.data)
      let arr = res.data.data;
      arr.forEach((item) => {
        //给每一条数据添加一个key值。就用_id来做key值
        item.key = item.id;
        setTimeout(() => {
          let ar = document.querySelectorAll(".ant-table-row .ant-table-cell")
          console.log(ar)
          ar.forEach(item => {
            if (item.innerText === "取消预约") {
              item.style.color = "red"
              item.style.fontWeight = "bold"
            } else if (item.innerText === "预约中") {
              item.style.color = "#58bc58"
              item.style.fontWeight = "bold"
            } else if (item.innerText === "预约结束") {
              item.style.color = "#e6a23c"
              item.style.fontWeight = "bold"
            }
          })
        }, 300)
      });
      this.setState({
        data: arr,
        total: res.data.total
      })
    })
  }

  // 重置查询信息
  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({
      search: {},
      data: "",
      total: ""
    })
    this.setState({
      search: {

      }
    }, () => {
      this.fetchAll()
    })
  };

  // 改变地区 
  handleChange(value) {
    console.log(value)
    this.setState({
      search: {
        address: value
      }
    }, () => {
      this.fetchAll()
    })


  }

  // 输入查询条件
  onFinish(values) {
    if (values.username && values.address) {
      alert("不能这样查询，只能查询一个")
    } else if (values.username) {
      this.setState({
        search: {},
        data: "",
        total: ""
      })
      this.setState({
        search: {
          username: values.username,
        }
      }, () => {
        this.fetchAll2()
      })
    } else if (values.address) {
      this.setState({
        search: {},
        data: "",
        total: ""
      })
      this.setState({
        search: {
          address: values.address
        }
      }, () => {
        this.fetchAll()
      })
    } else {
      message.warn("请输入查询条件")
    }

  };


  // 表格变化
  onChange(filters, sorter, extra) {
    // console.log('params', filters, sorter, extra);
    // this.fetchAll()
    this.setState({
      page: filters.current
    }, () => {
      this.fetchAll()
    })


  }

  // 页数
  pageonChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  //功能：进入页面就立马执行，获取数据
  componentDidMount() {
    this.fetchAll(); //进入页面就发起请求获取第一页数据
  }

  // 取消模态框
  onCancel() {
    // console.log(123)
    this.formRef2.current.resetFields()
    this.setState({
      visible: false,
    })
    // this.state.visible = false
  }

  // 检查用户名是否存在
  validateUserName = (rule, value, callback) => {
    yuyueApi
      .checkName(value)
      .then(res => {
        console.log(res);
        if (res.data.flag) {
          //可以注册
          callback();
        } else {
          //已存在，不可以注册
          callback("用户名已存在");
        }
      })
  };



  // 编辑用户
  editUser(row) {
    // console.log(row)
    // console.log(name)
    this.setState({
      visible: true,
      isEdit: true,
      user_id: row.user_id,
      home_id: row.home_id

    })
    // console.log(this.formRef2.current)
    // console.log(row)
    // console.log(this.props)
    this.formRef2.current.setFieldsValue({
      "user_id": row.user_id,
      "home_id": row.home_id,
      "state": row.state
    })
  }

  // 编辑发送请求
  async onEdit(values) {
    // console.log(this.formRef2.current.getFieldValue("user_id"))
    // console.log(777)
    try {
      // let formData = new FormData()
      // formData.append('user_id', values.user_id)
      // formData.append('home_id', values.home_id)
      // formData.append('state', values.state || "")
      // formData.append('files', values.files)
      let p = await yuyueApi.editGood(values.user_id, values.home_id, values.state)
      // console.log(p)
      if (p.data.flag) {
        this.setState({
          fileList: [],
        });
        message.success('修改成功');
        this.fetchAll()
      } else {
        message.error('修改失败');
      }
      // console.log(values)
      this.setState({
        visible: false
      })

    } catch (err) {
      console.log(err)
    }
  }



  onRemove(file) {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

  beforeUpload(file) {
    // console.log(file)
    this.setState({
      fileList: [...this.state.fileList, file],
    });
    return false;
  }

  render() {
    // console.log(this.formRef)
    return (
      <React.Fragment>
        {/* 搜索框 */}
        <div style={{ marginBottom: 20 }}>
          <Form
            ref={this.formRef}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={this.onFinish.bind(this)}
          >
            <Row>
              <Form.Item
                name="username"
              >
                <Input placeholder="输入用户名查询" style={{ width: 130, marginRight: 10, fontWeight: "bold" }} />
              </Form.Item>

              {/* <Form.Item
                name="address"
              >
                <Input placeholder="输入区域查询" style={{ width: 150, marginRight: 10 }} />
              </Form.Item> */}
              <Form.Item name="address">
                <Select defaultValue={this.state.search.address} style={{ width: 120, marginRight: 10 }} onChange={this.handleChange.bind(this)}>
                  {/* <Option value=""></Option> */}
                  <Option value="广州">广州</Option>
                  <Option value="深圳">深圳</Option>
                  <Option value="上海">上海</Option>
                  <Option value="北京">北京</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ marginLeft: 10 }}
                  title="查询用户"
                // onClick={this.searchUser.bind(this)}
                >
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  style={{ marginLeft: 10 }}
                  onClick={this.onReset.bind(this)}
                >
                  重置
              </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>

        {/* 表格内容 */}
        <Table
          columns={this.state.columns}
          dataSource={this.state.data}
          onChange={this.onChange.bind(this)}
          pagination={
            {
              current: this.state.page,
              defaultPageSize: this.state.pagesize,
              total: this.state.total,
              position: ['bottomCenter'],
              // showSizeChanger: true,
              showQuickJumper: true,
            }
          }
          // style={{ height: 450 }}
          // scroll={this.state.data.length > 3 ? { y: 350 } : false}
          // scroll={{ y: 350 }}
        />

        {/* 弹出层 */}
        <Form
          ref={this.formRef2}
          // layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        // style={{ marginLeft: 30 }}
        >

          <Modal
            visible={this.state.visible}
            title={this.state.isEdit ? "编辑用户" : "添加用户"}
            okText="确认"
            cancelText="取消"
            onCancel={this.onCancel.bind(this)}
            onCreate={this.onEdit.bind(this)}
            onOk={() => {
              this.formRef2.current
                .validateFields()
                .then(values => {
                  this.formRef2.current.resetFields();
                  this.onEdit(values);

                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          >

            <Form.Item
              name="user_id"
              label="用户ID"
              style={{ marginLeft: 30 }}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              name="home_id"
              label="房序号"
              style={{ marginLeft: 30 }}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item label="预约状态" name="state" style={{ marginLeft: 30 }}>
              <Select placeholder="预约状态" style={{ width: 120 }}>
                <Option value="预约中">预约中</Option>
                <Option value="预约结束">预约结束</Option>
                <Option value="取消预约">取消预约</Option>
              </Select>
            </Form.Item>


          </Modal>
        </Form>
      </React.Fragment>
    );
  }
}

export default UserManage;