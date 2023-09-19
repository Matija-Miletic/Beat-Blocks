// ResetButton.tsx
import { IconButton } from '@chakra-ui/react'
import { BsFillTrashFill } from 'react-icons/bs'

interface ResetButtonProps {
  onClick: () => void // Define the onClick handler
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={() => {
        onClick()
      }}
      variant="outline"
      colorScheme="blue"
      aria-label="Refresh tracks"
      fontSize="20px"
      icon={<BsFillTrashFill />}
      onClick={onClick} // Assign the provided onClick handler
    />
  )
}
