import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'
import { getPresets } from '../apis/presets.ts'

export function usePresets() {
  const query = useQuery(['presets'], getPresets)
  return {
    ...query,
  }
}
