import { Button, Card, Col, Image, Row, Typography } from "antd"
import moment from "moment"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import { API } from "../../config"
import { Product } from "../../store/models/product"
import { addItem } from "../../helpers/cart"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"

const { Title, Paragraph } = Typography

// 就是一个卡片，是Product、Home、Shop的子组件，接收product确定如何渲染，接收
// showViewProduct和showCartBtn决定两个按钮是否显示
// 最外层是Card，属性有cover（Image），actions（最下面的按钮），里面包的是内容
interface Props {
  product: Product
  showViewProduct?: boolean
  showCartBtn?: boolean
}

const ProductItem: FC<Props> = ({
  product,
  showViewProduct = true,
  showCartBtn = true
}) => {
  const dispatch = useDispatch()

  const addToCart = () => {
    addItem(product, () => {
      dispatch(push("/cart"))
    })
  }
  // 这个button是在卡片的最下方，在card的action属性设置
  const showButtons = () => {
    let buttonArray = []
    if (showViewProduct)
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>
      )
    if (showCartBtn) {
      buttonArray.push(
        <Button type="link" onClick={addToCart}>
          加入购物车
        </Button>
      )
    }
    return buttonArray
  }

  return (

    <Card
      cover={
        <Image
          src={`${API}/product/photo/${product._id}`}
          alt={product.name}
        />
      }
      actions={showButtons()}
    >
      <Title level={5}>{product.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <Row>
        <Col span="12">销量: {product.sold}</Col>
        <Col span="12" style={{ textAlign: "right" }}>
          价格: {product.price}
        </Col>
      </Row>
      <Row>
        <Col span="12">
          上架时间: {moment(product.createdAt).format("YYYY-MM-DD")}
        </Col>
        <Col span="12" style={{ textAlign: "right" }}>
          所属分类: {product.category.name}
        </Col>
      </Row>
    </Card>
  )
}

export default ProductItem
