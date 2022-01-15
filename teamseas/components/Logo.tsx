import { chakra, forwardRef, ImageProps } from '@chakra-ui/react'
import logo from './TeamSeasLogo.png'

export const Logo = forwardRef<ImageProps, 'img'>((props, ref) => {
  return <chakra.img src={logo.src} ref={ref} {...props} />
})