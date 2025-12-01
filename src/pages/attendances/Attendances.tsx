import DateRangeAndMealtimeForm from "@/components/forms/DateRangeAndMealTime/DateRangeAndMealtimeForm"
import PageContainer from "@components/container/page/PageContainer"

const Attendances = () => {
  return (
    <PageContainer title={'Asistencias'}>
        <DateRangeAndMealtimeForm title="Asistencias al comedor" onSubmit={null} loading={false}/>
    </PageContainer>
  )
}

export default Attendances