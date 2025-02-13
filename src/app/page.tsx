import React, { lazy } from 'react';
const Events = lazy(() => import("./components/Events"))

const Main = () => {
  return (
    <main>
      <Events />
    </main>
  )
}

export default Main