import { useMutation } from '@tanstack/react-query';
import { orderApi } from '@/services/api';

export function useCreateOrderMutation() {
  return useMutation({
    mutationFn: (orderPayload) => orderApi.create(orderPayload),
  });
}
