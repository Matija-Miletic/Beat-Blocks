import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Alert,
  AlertIcon,
  Stack,
} from '@chakra-ui/react'
import { AiOutlineSave } from 'react-icons/ai'
import { CellState } from '../../models/beats'
import { useState } from 'react'
import { saveBeat } from '../apis/beats'

interface SaveBeatProps {
  cellStates: CellState[]
  invalidateBeats: () => void
}
export default function SaveBeat({
  cellStates,
  invalidateBeats,
}: SaveBeatProps) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()

    const newBeat = { name: input, cell_states: JSON.stringify(cellStates) }
    saveBeat(newBeat)

    setNameInputVis(false)
    setInput('')
    invalidateBeats()
  }

  const handleNoName = () => {
    setNoName(true)

    setTimeout(() => {
      setNoName(false)
    }, 1000)
  }

  return (
    <>
      <IconButton
        onClick={handleSaveClick}
        variant="outline"
        colorScheme="pink"
        aria-label="Save beat"
        fontSize="20px"
        icon={<AiOutlineSave />}
        backgroundColor="white"
      />
      {nameInputVis && (
        <form onSubmit={handleSubmit}>
          <InputGroup size="md" w="500px">
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
