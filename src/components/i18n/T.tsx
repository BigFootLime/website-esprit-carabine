'use client'

import React, { JSX } from 'react'
import { useLang, type TextPair } from './lang-context'

type Props = {
  pair: TextPair
  as?: keyof JSX.IntrinsicElements
  className?: string
  children?: never
}

export default function T({ pair, as: As = 'span', className }: Props) {
  const { t } = useLang()
  return <As className={className}>{t(pair)}</As>
}
