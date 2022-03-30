import React, { FC } from "react"

import { List, Radio, Typography } from "antd"
import prices from "../../helpers/price"
import { RadioChangeEvent } from "antd/lib/radio"

const { Title } = Typography

interface Props {
  handleFilter: (arg: number[]) => void
}

// 这个是Shop的子组件
// 根据写好的数据prices来渲染radio
// 当点击圆框后，会触发父组件传来的handleFilter来改变父组件的状态
// List > List.Item > Radio 外面Radio.Group套起来
const RadioBox: FC<Props> = ({ handleFilter }) => {

  const onChange = (event: RadioChangeEvent) => {
    handleFilter(event.target.value)
  }

  return (
    <>
      <Title level={4}>按照价格筛选</Title>
      <Radio.Group>
        <List
          dataSource={prices}
          renderItem={item => (
            <List.Item>
              <Radio onChange={onChange} value={item.array}>
                {item.name}
              </Radio>
            </List.Item>
          )}
        />
      </Radio.Group>
    </>
  )
}

export default RadioBox

