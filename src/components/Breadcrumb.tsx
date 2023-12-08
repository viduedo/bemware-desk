"use client"

import { Breadcrumb as FbBreadcrumb } from "flowbite-react"

type Path = {
  name: string
  url: string
}

interface BreadCrumbProps {
  paths: Path[]
}

export default function Breadcrumb({ paths }: BreadCrumbProps) {
  return (
    <FbBreadcrumb className="m-2 mb-1">
      {paths.map((path, index, array) => {
        // Verifica se é o último item para exibir sem o href
        if (index === array.length - 1) {
          return (
            <FbBreadcrumb.Item key={index}>
              {path.name.charAt(0).toUpperCase() + path.name.slice(1)}
            </FbBreadcrumb.Item>
          )
        }

        // Retorna os itens restantes
        return (
          <FbBreadcrumb.Item key={index} href={path.url}>
            {path.name.charAt(0).toUpperCase() + path.name.slice(1)}
          </FbBreadcrumb.Item>
        )
      })}
    </FbBreadcrumb>
  )
}
