import React, { ChangeEvent, FC, useState } from "react"
import { CartItem, updateItem, deleteItem } from "../../helpers/cart"
import { Button, Image, Input } from "antd"
import { API } from "../../config"

interface Props {
  product: CartItem
  setCart: (arg: CartItem[]) => void
}

// 输入的数量发生变化，localstorage的数据发生变化，然后把变化后的值给父组件Cart
// 点击了删除，父组件Cart的cart发生变化，重新渲染
// tr > td > Input/Button
const CartItemFc: FC<Props> = ({ product, setCart }) => {
  const [count, setCount] = useState<number>(product.count)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(event.target.value)
    // updateItem做了两件事：更改localStorage,返回更改后的值
    setCart(updateItem(product._id, count))
    setCount(count)
  }
  return (
    <tr className="ant-table-row">
      <td className="ant-table-cell">
        <Image width={120} src={`${API}/product/photo/${product._id}`} />
      </td>
      <td className="ant-table-cell">{product.name}</td>
      <td className="ant-table-cell">{product.price}</td>
      <td className="ant-table-cell">{product.category.name}</td>
      <td className="ant-table-cell">
        <Input type="number" value={count} onChange={handleChange} />
      </td>
      <td className="ant-table-cell">
        <Button
          onClick={() => setCart(deleteItem(product._id))}
          danger
          type="primary"
        >
          删除
        </Button>
      </td>
    </tr>
  )
}

export default CartItemFc
