import React, { Suspense } from 'react'

import ContactInfos from './contactInfos'

export default function Page() {
  return (
    <Suspense>
      <ContactInfos />
    </Suspense>
  )
}
