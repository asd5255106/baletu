import React from "react";

import { Input, Table, Button, Form, Row, Modal, Select, Upload, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PoweroffOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';


import "../../assets/css/houseManage.css"
import houseApi from "../../api/houseApi";

const { Option } = Select;

// const { Option } = Select;


// const { Search } = Input;

/*
  用户管理
*/

class HouseManage extends React.Component {
  constructor() {
    super()


    this.state = {
      // 表头
      columns: [
        {
          title: '房源ID',
          dataIndex: 'home_id',
          key: 'home_id',
          width: 90,
        }, {
          title: '图片',
          dataIndex: 'img',
          key: 'img',
          render: (record) => <img src={record} alt="" />,
          width: 90

        },
        {
          title: '类型',
          dataIndex: 'title',
          key: 'title',
          width: 150,
        },
        {
          title: '资料',
          dataIndex: 'roomInfo',
          key: 'roomInfo',
          width: 120,
        },
        {
          title: '标签',
          dataIndex: 'biaoqian',
          key: 'biaoqian',
          width: 250,
        },
        {
          title: '地址',
          dataIndex: 'text',
          key: 'text',
          width: 160,
        },
        {
          title: '价格',
          dataIndex: 'price',
          sorter: {
            compare: (a, b) => a.price - b.price,
            multiple: 3,
          },
          key: 'price',
          width: 120,
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
                <Popconfirm
                  title="确定要删除该用户吗?"
                  onConfirm={this.confirm.bind(this, row)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger title="删除" />
                </Popconfirm>
              </React.Fragment>
            );
          },
          width: 130,
        },
      ],
      // 表格内容数据
      data: [],
      page: 1,             // 第几页
      pagesize: 10,        // 一页多少条
      total: "",           // 总数
      search: {   // 查询条件
        address: "gz"
      },
      // selectedRowKeys: []   // 选中的
      isEdit: false,
      visible: false,       // 控制弹出层
      fileList: [],         // 头像
      home_id: null,
      defaultFileList: [
        {
          uid: '1',
          name: 'xxx.png',
          url: 'http://www.baidu.com/xxx.png',
        },]
    }
    this.formRef = React.createRef();
    this.formRef2 = React.createRef();

  }

  // 渲染数据
  fetchAll() {
    // let { page,pagesize,search } = this.state
    houseApi.getList(this.state.page, this.state.pagesize, this.state.search).then((res) => {
      // console.log(res)
      let arr = res.data.data;

      // console.log(arr)
      arr.forEach((item) => {
        //给每一条数据添加一个key值。就用_id来做key值
        // item.biaoqian = item.biaoqian.toString()
        //  console.log(item.biaoqian)
        if(item.biaoqian){
          item.biaoqian = JSON.parse(item.biaoqian).join(" ")
        }

        // console.log(item.biaoqian)
        item.key = item.home_id;
      });
      this.setState({
        data: arr,
        total: res.data.total
      })
    }).catch(() => {
      message.error("没有该数据")
    })
  }

  // 重置查询信息
  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({
      page: 1,
      search: {
        address: "gz"
      }
    }, () => {
      this.fetchAll()
    })
  };

  // 改变地区 
  handleChange(value) {
    // console.log(value)
    this.setState({
      page: 1,
      search: {
        address: value
      }
    }, () => {
      this.fetchAll()
    })


  }

  // 输入查询条件
  onFinish(values) {
    // console.log('Received values of form: ', values);
    if (values.title) {
      this.setState({
        page: 1,
        search: {
          address: values.address || "gz",
          title: values.title
        }
      }, () => {
        // console.log(this.state.search)
        this.fetchAll()
      })
    }
    // console.log(values.username)
    // // console.log(values.phone)
    // if (values.username && values.phone) {
    //   this.setState({
    //     search: {
    //       name: values.username,
    //       phone: values.phone

    //     }
    //   }, () => {
    //     this.fetchAll()
    //   })
    //   // console.log("输入了两个")
    // } else if (values.username) {
    //   // console.log("只输入名字")
    //   this.setState({
    //     search: {
    //       name: values.username,
    //     }
    //   }, () => {
    //     this.fetchAll()
    //   })
    // } else if (values.phone) {
    //   this.setState({
    //     search: {
    //       phone: values.phone * 1
    //     }
    //   }, () => {
    //     this.fetchAll()
    //   })
    // } else {
    //   message.warn("请输入查询条件")
    // }

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
  // validateUserName = (rule, value, callback) => {
  //   usersApi
  //     .checkName(value)
  //     .then(res => {
  //       console.log(res);
  //       if (res.data.flag) {
  //         //可以注册
  //         callback();
  //       } else {
  //         //已存在，不可以注册
  //         callback("用户名已存在");
  //       }
  //     })
  // };


  // 取消模态框  添加用户
  async onCreate(values) {
    console.log(values)
    // console.log(this.fileInput)
    // console.log(this.formRef.errorFields)
    try {
      let formData = new FormData()
      formData.append('title', values.title || "")
      formData.append('price', values.price)
      formData.append('biaoqian', values.biaoqian || "")
      formData.append('roomInfo', values.roomInfo || "")
      formData.append('address', values.address || "")
      formData.append('text', values.text || "")
      formData.append('phone', values.phone)
      // formData.append('files', values.files)

      this.state.fileList.forEach(file => {
        console.log(file)
        formData.append('files', file);
      });

      let p = await houseApi.addGood(formData)
      if (p.data.flag) {
        this.setState({
          fileList: [],
        });
        message.success('添加成功');
        this.fetchAll()
      } else {
        message.error('添加失败');
      }
      // console.log(values)
      this.setState({
        visible: false
      })
      // this.state.visible = false
    } catch (err) {
      console.log(err)
    }
  }

  // 编辑用户
  editUser(row) {
    console.log(row)
    // let name = row.img.split("/").pop()
    // // console.log(name)
    this.setState({
      visible: true,
      isEdit: true,
      home_id: row.home_id,
      defaultFileList: [
        {
          uid: '1',
          name: row.img,
          url: row.img,
        },]
    })
    // // console.log(this.formRef2.current)
    // // console.log(row)
    // // console.log(this.props)
    this.formRef2.current.setFieldsValue({
      "title": row.title,
      "price": row.price,
      "biaoqian": row.biaoqian,
      "roomInfo": row.roomInfo,
      "address": this.state.search.address,
      "text": row.text,
    })
  }

  // 编辑发送请求
  async onEdit(values) {
    // console.log(this.formRef2.current.getFieldValue("user_id"))
    console.log(values)
    try {
      let formData = new FormData()
      formData.append('title', values.title || "")
      formData.append('price', values.price)
      formData.append('biaoqian', values.biaoqian || "")
      formData.append('roomInfo', values.roomInfo || "")
      formData.append('address', values.address || "")
      formData.append('text', values.text || "")
      formData.append('phone', values.phone)
      formData.append('home_id', this.state.home_id)
      // formData.append('files', values.files)

      this.state.fileList.forEach(file => {
        // console.log(file)
        formData.append('files', file);
      });

      let p = await houseApi.editGood(formData)
      console.log(p)
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

  // 删除某个用户
  confirm(row) {
    console.log(row);
    console.log(this.state.search.address, row.home_id)
    houseApi.delGood(this.state.search.address, row.home_id).then(res => {
      console.log(res)
      if (res.data.flag) {
        message.success('删除成功');
        let pageNum = this.state.page
        console.log(this.state.data.length)
        if (this.state.data.length === 1) {
          if (this.state.page === 1) {
            message.error("暂无数据")
            return
          }
          this.setState({
            page: pageNum - 1
          })
        }
        this.fetchAll()
      } else {
        message.error('删除失败')
      }
    })
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
          {/* <Select defaultValue={this.state.search.address} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
            <Option value="gz">广州</Option>
            <Option value="sz">深圳</Option>
            <Option value="sh">上海</Option>
            <Option value="bj">北京</Option>
          </Select> */}
          <Form
            ref={this.formRef}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={this.onFinish.bind(this)}
          >
            <Row>
              {/* 根据地区搜索 */}
              <Form.Item name="address">
                <Select defaultValue={this.state.search.address} style={{ width: 120, marginRight: 10 }} onChange={this.handleChange.bind(this)}>
                  <Option value="gz">广州</Option>
                  <Option value="sz">深圳</Option>
                  <Option value="sh">上海</Option>
                  <Option value="bj">北京</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="title"
              >
                <Input placeholder="输入类型查询" style={{ width: 150, marginRight: 10 }} />
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
              <Form.Item>
                {/* 增加 */}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginLeft: 10, marginRight: 20 }}
                  title="增加用户"
                  onClick={() => {
                    this.setState({
                      visible: true,
                      isEdit: false
                    })
                  }}
                />
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
        // style={{ height: 500 }}
        // scroll={this.state.data.length > 3 ? { y: 350 } : false}
        // scroll={{ y: 350 }}
        />

        {/* 弹出层 */}
        <Form
          ref={this.formRef2}
          // layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >

          <Modal
            visible={this.state.visible}
            title={this.state.isEdit ? "编辑房源" : "添加房源"}
            okText="确认"
            cancelText="取消"
            onCancel={this.onCancel.bind(this)}
            onCreate={this.state.isEdit ? this.onEdit.bind(this) : this.onCreate.bind(this)}
            onOk={() => {
              this.formRef2.current
                .validateFields()
                .then(values => {
                  this.formRef2.current.resetFields();
                  this.state.isEdit ? this.onEdit(values) : this.onCreate(values);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          >

            <Form.Item
              name="title"
              label="类型"
            // rules={[
            //   { required: true, message: '请输入手机号用户名' },
            //   // { validator: this.state.isEdit ? "" : this.validateUserName.bind(this) },
            //   {
            //     pattern: /^1[3456789]\d{9}$/,
            //     message: '请输入正确的手机格式',
            //   },
            // ]}
            >

              <Input placeholder="请输入房源类型" />
            </Form.Item>

            <Form.Item
              name="roomInfo"
              label="资料"
            >
              <Input />
            </Form.Item>

            <Form.Item name="biaoqian" label="标签">
              <Input />
            </Form.Item>


            <Form.Item label="城市" name="address">
              <Select placeholder="城市" style={{ width: 90 }}>
                <Option value="gz">广州</Option>
                <Option value="sz">深圳</Option>
                <Option value="sh">上海</Option>
                <Option value="bj">北京</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="text"
              label="地址"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入用户名'
            //   },
            //   {
            //     pattern: /^1[3456789]\d{9}$/,
            //     message: '请输入正确的手机格式',
            //   },
            // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="price"
              label="价格"
              rules={[
                { required: true, message: '请输入房子价格' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="files">
              <Upload
                onRemove={this.onRemove.bind(this)}
                defaultFileList={this.state.isEdit ? this.state.defaultFileList : ""}
                beforeUpload={this.beforeUpload.bind(this)}
              // fileList={this.state.fileList}

              >
                <Button>
                  <UploadOutlined /> 上传头像
                </Button>
              </Upload>
            </Form.Item>
          </Modal>
        </Form>
      </React.Fragment>
    );
  }
}

export default HouseManage;