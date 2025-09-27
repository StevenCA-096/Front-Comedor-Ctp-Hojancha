import DashboardCard from '@components/shared/DashboardCard';
// import {
//   Timeline,
//   TimelineItem,
//   TimelineOppositeContent,
//   TimelineSeparator,
//   TimelineDot,
//   TimelineConnector,
//   TimelineContent,
//   timelineOppositeContentClasses,
// } from '@mui/lab';
// import { Link, Typography } from '@mui/material';
// import { formatDateWithHoursHonly } from '../../../utils/date/format-date';

const RecentPayments = () => {

  return (
    <DashboardCard title="Pagos recientes">
      <>
        {/* <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {
            data?.diningStudents?.map((ds, index) =>
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  {formatDateWithHoursHonly(new Date(ds?.timeIn))?.split(',')[1]}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    color={ds?.paymentMethod == "Efectivo" ? "primary" : 'success'}
                    variant="outlined"
                  />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography >
                    Pago de {ds?.student?.name + " " + ds?.student?.lastName1 + " "} {ds?.paymentMethod}
                  </Typography>
                  <Typography>
                    ₡{ds?.amountPaid}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            )
          }
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Payment received from John Doe of $385.90</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{' '}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Payment was made of $64.95 to Michael</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{' '}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New arrival recorded</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Payment Received</TimelineContent>
          </TimelineItem>
        </Timeline> */}
      </>
    </DashboardCard>
  );
};

export default RecentPayments;
