import { IconButton } from '@chakra-ui/react'
import { BsFillTrashFill } from 'react-icons/bs' // Fixed import

export const ResetButton = () => {
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      aria-label="Refresh tracks"
      fontSize="20px"
      icon={<BsFillTrashFill />}
    />
  )
}
