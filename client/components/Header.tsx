import { Box } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box className="header-container">
      <Box
        display="inline-flex"
        position="absolute"
        left="0"
        className="left-blocks"
      >
        <Box className="brick transparent-brick b-3x12 b-indigo" />
        <Box display="block">
          <Box className="brick transparent-brick b-1x6 b-orange" />
          <Box className="brick transparent-brick b-1x5 b-light-green" />
        </Box>
        <Box>
          <Box className="brick transparent-brick b-4x3 b-pink" />
          <Box className="brick transparent-brick b-3x5 b-amber" />
          <Box className="brick transparent-brick b-2x6 b-lime" />
        </Box>
        <Box>
          <Box className="brick transparent-brick b-2x3 b-grean" />
          <Box className="brick transparent-brick b-2x5 b-indigo" />
          <Box className="brick transparent-brick b-1x8 b-teal" />
        </Box>

        <Box className="brick transparent-brick b-1x7 b-deep-purple" />

        <Box className="brick transparent-brick b-3x4 b-light-blue" />
        <Box className="brick transparent-brick b-2x5 b-yellow" />
        <Box className="brick transparent-brick b-4x2 b-deep-orange" />
        <Box className="brick transparent-brick b-2x1 b-cyan" />
        <Box className="brick transparent-brick b-1x1 b-blue-grey" />
      </Box>

      <Box className="header-text">
        <h1>Beat Those Blocks!</h1>
      </Box>
      <Box
        className="left-blocks"
        display="inline-flex"
        position="absolute"
        right="0"
      >
        <Box className="brick transparent-brick b-2x1 b-pink" />
        <Box className="brick transparent-brick b-1x3 b-light-green" />
        <Box className="brick transparent-brick b-2x6 b-blue-grey" />
        <Box className="brick transparent-brick b-3x5 b-indigo" />
        <Box display="block">
          <Box className="brick transparent-brick b-2x4 b-green" />
          <Box className="brick transparent-brick b-2x4 b-yellow" />
        </Box>
        <Box display="block">
          <Box className="brick transparent-brick b-2x3 b-red" />
          <Box className="brick transparent-brick b-2x4 b-teal" />
          <Box className="brick transparent-brick b-2x6 b-cyan" />
          <Box className="brick transparent-brick b-2x3 b-deep-purple" />
        </Box>
        <Box display="block">
          <Box className="brick transparent-brick b-4x1 b-deep-orange" />
          <Box className="brick transparent-brick b-4x4 b-light-green" />
          <Box className="brick transparent-brick b-4x5 b-pink" />
          <Box className="brick transparent-brick b-3x3 b-amber" />
        </Box>
        <Box display="block">
          <Box className="brick transparent-brick b-2x5 b-blue" />
          <Box className="brick transparent-brick b-2x3 b-lime" />
          <Box className="brick transparent-brick b-1x4 b-blue-grey" />
        </Box>
        <Box display="block">
          <Box className="brick transparent-brick b-1x7 b-yellow" />
          <Box className="brick transparent-brick b-1x8 b-red" />
        </Box>
      </Box>
    </Box>
  )
}
