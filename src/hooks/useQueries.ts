import { useQuery } from '@tanstack/react-query'
import { fetchApps, fetchGraph } from '@/mocks/api'

export function useApps() {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1000,
  })
}

export function useGraph(appId: string) {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchGraph(appId),
    staleTime: 60 * 1000,
  })
}
