"use client"

import dynamic from "next/dynamic"
import { Provider } from "jotai"

const App = dynamic(() => import("../src/App"), { ssr: false })

export default function Page() {
  return (
    <Provider>
      <App />
    </Provider>
  )
}
