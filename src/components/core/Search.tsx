import { Button, Col, Divider, Form, Input, Row, Select } from "antd"
import React, { useEffect } from "react"
import ProductItem from "./ProductItem"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../../store/actions/category.actions"
import { AppState } from "../../store/reducers/index"
import { CategoryState } from "../../store/reducers/category.reducer"
import { searchProduct } from "../../store/actions/product.actions"
import { ProductState } from "../../store/reducers/product.reducer"

// 父组件是Home，不仅包含搜索框，还有ProductItem展示
// 搜索框是Form组，当点击了“搜索按钮”，触发onFinish获取分类以及输入的数据，然后dispatch发送请求，渲染页面
const Search = () => {
  const dispatch = useDispatch()

  const { category } = useSelector<AppState, CategoryState>(
    state => state.category
  )

  const { search } = useSelector<AppState, ProductState>(
    state => state.product
  )

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const onFinish = (value: { category: string; search: string }) => {
    dispatch(
      searchProduct({ category: value.category, search: value.search })
    )
  }

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="inline"
        initialValues={{ category: "All" }}
      >
        <Input.Group compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">所有分类</Select.Option>
              {category.result.map(item => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input placeholder="请输入搜索关键字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      {/* 这个不会和Home里的ProductItem冲突 */}
      <Row gutter={[16, 16]}>
        {search.map(item => (
          <Col span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Search
