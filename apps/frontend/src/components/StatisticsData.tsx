import Grid from '@mui/material/Grid';
import React from 'react';
import { AppointmentStatus } from '../features/appointments/appointmentsSlice';
import Ctx from './Ctx';
import ListerStatistics from './ListerStatistics';

interface IProps {
  ctxRef: React.RefObject<HTMLCanvasElement>;
  appointment_status: AppointmentStatus;
}

function StatisticsData({
  ctxRef,
  appointment_status,
}: IProps): React.ReactNode {
  return (
    <Grid
      container
      marginY={{ xs: '1rem', sm: '2rem', md: '3rem' }}
      alignItems="center"
    >
      <Grid item md={12}>
        <Ctx ctxRef={ctxRef} />
      </Grid>

      <Grid item md={12}>
        <ListerStatistics appointment_status={appointment_status} />
      </Grid>
    </Grid>
  );
}

export default StatisticsData;
