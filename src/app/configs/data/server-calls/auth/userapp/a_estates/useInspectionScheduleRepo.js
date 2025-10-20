import {
  createInspectionScheduleApi,
  getMyInspectionSchedulesApi,
  getMyInspectionSchedulesOnCalendarApi,
  cancelInspectionScheduleApi,
  rescheduleInspectionApi,
} from 'app/configs/data/client/RepositoryAuthClient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

/**
 * ############################################################
 * @param {Create Inspection Schedule} Mutation Hook
 * @returns
 * ############################################################
 */
export function useCreateInspectionSchedule() {
  const queryClient = useQueryClient();

  return useMutation(
    (formData) => createInspectionScheduleApi(formData),
    {
      onSuccess: (response) => {
        // Invalidate and refetch inspection schedules
        queryClient.invalidateQueries('__myInspectionSchedules');
        queryClient.invalidateQueries('__myInspectionSchedulesCalendar');

        if(response?.data?.success){
          // Additional actions on success can be added here
           toast.success(
          response?.data?.message || 'Inspection scheduled successfully!'
        );
        }
      },
      onError: (error) => {
        console.error('Create Inspection Schedule Error:', error);

        // Handle NestJS validation errors (array of messages)
        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          // Display each validation error
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          // Single error message
          toast.error(errorData.message);
        } else {
          // Fallback error message
          toast.error(error?.message || 'Failed to schedule inspection');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {View My Inspection Schedules} Query Hook
 * @returns
 * ############################################################
 */
export function useGetMyInspectionSchedules() {
  return useQuery(
    ['__myInspectionSchedules'],
    () => getMyInspectionSchedulesApi(),
    {
      staleTime: 30000, // Consider data fresh for 30 seconds
      onError: (error) => {
        console.error('Get My Inspection Schedules Error:', error);

        // Handle NestJS validation errors (array of messages)
        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to fetch inspection schedules');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {View My Inspection Schedules on Calendar} Query Hook
 * @returns
 * ############################################################
 */
export function useGetMyInspectionSchedulesOnCalendar(startDate, endDate) {
  return useQuery(
    ['__myInspectionSchedulesCalendar', startDate, endDate],
    () => getMyInspectionSchedulesOnCalendarApi(startDate, endDate),
    {
      enabled: Boolean(startDate && endDate), // Only fetch when dates are provided
      staleTime: 30000, // Consider data fresh for 30 seconds
      onError: (error) => {
        console.error('Get Calendar Inspection Schedules Error:', error);

        // Handle NestJS validation errors (array of messages)
        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to fetch calendar schedules');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {Cancel Inspection Schedule} Mutation Hook
 * @returns
 * ############################################################
 */
export function useCancelInspectionSchedule() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ scheduleId, reason }) => cancelInspectionScheduleApi(scheduleId, reason),
    {
      onSuccess: (response) => {
        // Invalidate and refetch inspection schedules
        queryClient.invalidateQueries('__myInspectionSchedules');
        queryClient.invalidateQueries('__myInspectionSchedulesCalendar');

        toast.success(
          response?.data?.message || 'Inspection cancelled successfully!'
        );
      },
      onError: (error) => {
        console.error('Cancel Inspection Schedule Error:', error);

        // Handle NestJS validation errors (array of messages)
        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to cancel inspection');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {Reschedule Inspection} Mutation Hook
 * @returns
 * ############################################################
 */
export function useRescheduleInspection() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ scheduleId, formData }) => rescheduleInspectionApi(scheduleId, formData),
    {
      onSuccess: (response) => {
        // Invalidate and refetch inspection schedules
        queryClient.invalidateQueries('__myInspectionSchedules');
        queryClient.invalidateQueries('__myInspectionSchedulesCalendar');

        toast.success(
          response?.data?.message || 'Inspection rescheduled successfully!'
        );
      },
      onError: (error) => {
        console.error('Reschedule Inspection Error:', error);

        // Handle NestJS validation errors (array of messages)
        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to reschedule inspection');
        }
      },
    }
  );
}
