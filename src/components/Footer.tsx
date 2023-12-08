"use client"

import { Footer as FbFooter } from "flowbite-react"
import moment from "moment"

export default function Footer() {
  return (
    <FbFooter container>
      <FbFooter.Copyright
        href="https://www.bemware.com.br/"
        by="Bemware: Soluções em TI™"
        year={moment(Date.now()).year()}
      />

      <FbFooter.Title title="WAREDESK .:.: v0.1" />
    </FbFooter>
  )
}
