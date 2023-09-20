import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBeats } from '../apis/beats'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { AiOutlineDown } from 'react-icons/ai'

interface BeatSelectProps {
  onMenuSelectionChange: (selection: string) => void
  invalidate: boolean
}

export default function BeatSelect({
  onMenuSelectionChange,
  invalidate,
}: BeatSelectProps) {
  const queryClient = useQueryClient()
  const {
    data: beats,
    isLoading,
    isError,
  } = useQuery(['beats'], () => getBeats())

  if (isLoading)
    return (
      <>
        <p>Loading beats...</p>
      </>
    )

  if (isError)
    return (
      <>
        <p>Error loading preset beats</p>
      </>
    )
  if (invalidate) {
    queryClient.invalidateQueries(['beats'])
  }
  // console.log('beats', beats)
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="yellow"
          variant="outline"
          rightIcon={<AiOutlineDown />}
        >
          Select preset
        </MenuButton>
        <MenuList>
          {beats.map((beat) => (
            <MenuItem
              color="black"
              key={beat}
              onClick={() => {
                onMenuSelectionChange(beat) // Call the additional function
              }}
            >
              {beat}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
