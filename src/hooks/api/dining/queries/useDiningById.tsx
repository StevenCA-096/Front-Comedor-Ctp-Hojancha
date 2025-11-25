import { getDiningById } from '@/services/dining/diningService';
import { useQuery } from '@tanstack/react-query';

const useDiningById = (diningId: number) => {
  return useQuery({
    queryFn: () => {
      if (!diningId || diningId == 0) throw new Error("diningId is missing");
      return getDiningById(diningId);
    }, 
    queryKey: ['dining', diningId],
    refetchOnWindowFocus: false,
    enabled: !!diningId
  })
}

export default useDiningById