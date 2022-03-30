import { Button, Form, Input, message, Select, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import Layout from "../core/Layout"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../../store/actions/category.actions"
import { AppState } from "../../store/reducers/index"
import { CategoryState } from "../../store/reducers/category.reducer"
import { RcFile } from "antd/lib/upload"
import axios from "axios"
import { API } from "../../config"
import { isAuth } from "../../helpers/auth"
import { Jwt } from "../../store/models/auth"

// 文件上传后先useState存起来。在onFinish里，如果有文件，就添上发送出去
const AddProduct = () => {
  const dispatch = useDispatch()
  const [file, setFile] = useState<RcFile>()

  const category = useSelector<AppState, CategoryState>(
    state => state.category
  )

  useEffect(() => {
    dispatch(getCategory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { user, token } = isAuth() as Jwt

  // FormData 对象的使用：
  // 1.用一些键值对来模拟一系列表单控件：即把form中所有表单元素的name与value组装成
  // 一个queryString
  // 2. 异步上传二进制文件。
  // FormData对象的操作方法，全部在原型中，自己本身没任何的属性及方法。
  // 使用FormData对象发送文件
  const onFinish = (product: any) => {
    const formData = new FormData()
    for (let attr in product) {
      formData.set(attr, product[attr])
    }
    if (typeof file !== "undefined") {
      formData.set("photo", file)
    }

    // 发送请求的时候要加请求头以验证身份
    axios
      .post(`${API}/product/create/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(
        () => {
          message.success("商品添加成功")
        },
        () => {
          message.error("商品添加失败")
        }
      )
  }

  const addProductForm = () => {
    const props = {
      accept: "image/*",
      beforeUpload: function (file: RcFile) {
        setFile(file)
        return false
      }
    }
    return (
      <Form onFinish={onFinish} initialValues={{ category: "" }}>
        <Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传商品封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="商品描述">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="商品价格">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">
          <Select>
            <Select.Option value="">请选择分类</Select.Option>
            {category.category.result.map(item => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="商品数量">
          <Input />
        </Form.Item>
        <Form.Item name="shipping" label="是否需要运输">
          <Select>
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加商品
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout title="添加商品" subTitle="">
      {addProductForm()}
    </Layout>
  )
}

export default AddProduct
