import { PageHeader } from "antd"
import React, { FC } from "react"
import Navigation from "./Navigation"

interface Props {
  children: React.ReactNode
  title: string
  subTitle: string
}

// 里面包一个Navigation，一个PageHeader
// 作为其他组件的子组件
const Layout: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Navigation />
      <PageHeader className="jumbotron" title={title} subTitle={subTitle} />
      <div style={{ width: "85%", margin: "0 auto" }}>{children}</div>
    </div>
  )
}

export default Layout
