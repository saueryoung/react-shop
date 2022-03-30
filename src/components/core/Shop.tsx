import { Button, Col, Empty, Row, Space } from "antd"
import React, { useState, useEffect } from "react"
import Checkbox from "./CheckBox"
import Layout from "./Layout"
import RadioBox from "./RadioBox"
import { useDispatch, useSelector } from "react-redux"
import { filterProduct } from "../../store/actions/product.actions"
import { AppState } from "../../store/reducers/index"
import { ProductState } from "../../store/reducers/product.reducer"
import ProductItem from "./ProductItem"

// http://localhost:3000/#/shop
// 左栏是CheckBox和Radio组件的排列，右栏是ProductItem的展示

const Shop = () => {
  const dispatch = useDispatch()

  // skip用于确定请求几个ProductItem，skip是0就加载4个，每多四个就多加载4个
  const [skip, setSkip] = useState<number>(4)

  const product = useSelector<AppState, ProductState>(state => state.product)

  // myFilters记录了种类和价格的筛选集合，通过myFilters的数据发送请求加载ProductItemProductItem
  const [myFilters, setMyFilter] = useState<{
    category: string[]
    price: number[]
  }>({ category: [], price: [] })

  // myFilters改变后，skip初始化
  useEffect(() => {
    setSkip(4)
  }, [myFilters])

  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip }))
  }, [myFilters, skip])

  // Checkbox传入一个数组，myFilter发生变化，触发useEffect发送请求，于是页面重新渲染
  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <Checkbox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters })
        }}
      />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters })
        }}
      />
    </Space>
  )

  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {product.filter.result.data.map(item => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  )

  const loadMoreButton = () => {
    return (
      <Row>
        {product.filter.result.size >= 4 && (
          <Button onClick={loadMore}>加载更多</Button>
        )}
      </Row>
    )
  }

  // 点了加载更多之后，skip变化，触发useEffect，然后发送发送请求（带上新的skip获得更多的product成员）渲染页面
  const loadMore = () => {
    setSkip(skip + 4)
  }

  const noData = () => {
    return <Row>{product.filter.result.size === 0 && <Empty />}</Row>
  }

  return (
    <Layout title="拉勾商城" subTitle="挑选你喜欢的商品吧">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">
          {productDOM()} {loadMoreButton()} {noData()}
        </Col>
      </Row>
    </Layout>
  )
}

export default Shop
