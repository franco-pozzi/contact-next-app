import { FC } from 'react'

interface Props {
  children: React.ReactElement;
  isTrue: boolean;
}

export const RenderIf: FC<Props> = ({ children, isTrue }) => {
  return isTrue ? children : null
}