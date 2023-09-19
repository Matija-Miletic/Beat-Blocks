import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  FormHelperText,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Stack,
} from '@chakra-ui/react'
import { AiOutlineSave } from 'react-icons/ai'
import { CellState } from '../../models/beats'
import { useState } from 'react'
import { saveBeat } from '../apis/beats'
import { useQueryClient } from '@tanstack/react-query'

interface SaveBeatProps {
  cellStates: CellState[] // Define the prop type
}
export default function SaveBeat({ cellStates }: SaveBeatProps) {
  const [nameInputVis, setNameInputVis] = useState(false)
  const [input, setInput] = useState('')
  const [noName, setNoName] = useState(false)
  const isError = input === ''

  const handleSaveClick = () => {
    setNameInputVis(true)
  }

  const handleCancel = () => {
    setNameInputVis(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const queryClient = useQueryClient()

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()

    const newBeat = { name: input, cell_states: JSON.stringify(cellStates) }
    saveBeat(newBeat)
    queryClient.invalidateQueries(['beats'])
    setNameInputVis(false)
    setInput('')
  }

  const handleNoName = () => {
    setNoName(true)

    setTimeout(() => {
      setNoName(false)
    }, 1000)
  }

  console.log('noName', noName)
  return (
    <>
      <IconButton
        onClick={handleSaveClick}
        variant="outline"
        colorScheme="pink"
        aria-label="Save beat"
        fontSize="20px"
        icon={<AiOutlineSave />}
      />
      {nameInputVis && (
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              type="string"
              pr="4.5rem"
              placeholder="Enter beat name"
              value={input}
              onChange={handleInputChange}
            />
            {!isError ? (
              <Box>
                <InputRightElement width="11rem">
                  <Box display="flex">
                    <Button
                      colorScheme="green"
                      type="submit"
                      h="1.75rem"
                      size="sm"
                      width="4.5rem"
                    >
                      Submit
                    </Button>

                    <Button
                      h="1.75rem"
                      size="sm"
                      width="4.5rem"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Box>
                </InputRightElement>
              </Box>
            ) : (
              <Stack>
                <Box>
                  <InputRightElement width="11rem">
                    <Box display="flex">
                      <Button
                        colorScheme="red"
                        h="1.75rem"
                        size="sm"
                        width="4.5rem"
                        onClick={handleNoName}
                      >
                        Submit
                      </Button>

                      <Button
                        h="1.75rem"
                        size="sm"
                        width="4.5rem"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </InputRightElement>
                </Box>
              </Stack>
            )}
          </InputGroup>
          {noName && (
            <Box>
              <Alert status="error">
                <AlertIcon />
                Name is required
              </Alert>
            </Box>
          )}
        </form>
      )}
    </>
  )
}
