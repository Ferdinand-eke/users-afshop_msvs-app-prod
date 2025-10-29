import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AuthApi } from 'app/configs/data/client/RepositoryAuthClient';

/**
 * ############################################################
 * API Functions - Property Acquisition
 * ############################################################
 */

/**
 * Submit Payment Proof
 */
export const submitPaymentProofApi = async (formData) => {
  // Since we're now sending base64 compressed images in the payload,
  // we use JSON content type instead of multipart/form-data
  console.log("AcquisitionData (compressed base64)", formData);

  return AuthApi().post(
    `/real-estate/acquisitions`,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * Submit Property Documents
 */
export const submitPropertyDocumentsApi = async (offerId, formData) => {
  const data = new FormData();

  if (formData.identityDocument) {
    data.append('identityDocument', formData.identityDocument);
  }
  if (formData.proofOfAddress) {
    data.append('proofOfAddress', formData.proofOfAddress);
  }
  if (formData.bankStatement) {
    data.append('bankStatement', formData.bankStatement);
  }

  // Add additional documents
  if (formData.additionalDocs && formData.additionalDocs.length > 0) {
    formData.additionalDocs.forEach((doc, index) => {
      data.append('additionalDocs', doc);
    });
  }

  return AuthApi().post(
    `/real-estate/acquisitions/${offerId}/documents`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

/**
 * Get Acquisition Status
 */
export const getAcquisitionStatusApi = async (offerId, propertyId) => {
  return AuthApi().get(`/real-estate/acquisitions/check-status`, {
    params: {
      offerId,
      propertyId,
    },
  });
};

/**
 * ############################################################
 * @param {Submit Payment Proof} Mutation Hook
 * @returns
 * ############################################################
 */
export function useSubmitPaymentProof() {
  const queryClient = useQueryClient();

  return useMutation(
    ({formData }) => submitPaymentProofApi( formData),
    {
      onSuccess: (response) => {
        // Invalidate acquisition status

        queryClient.invalidateQueries('__acquisitionStatus');

        if(response.data.success){
 toast.success(
          response?.data?.message || 'Payment proof submitted successfully!'
        );
        }
       
      },
      onError: (error) => {
        console.error('Submit Payment Proof Error:', error);

        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to submit payment proof');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {Submit Property Documents} Mutation Hook
 * @returns
 * ############################################################
 */
export function useSubmitPropertyDocuments() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ offerId, formData }) => submitPropertyDocumentsApi(offerId, formData),
    {
      onSuccess: (response) => {
        // Invalidate acquisition status
        queryClient.invalidateQueries('__acquisitionStatus');

        toast.success(
          response?.data?.message || 'Documents submitted successfully!'
        );
      },
      onError: (error) => {
        console.error('Submit Property Documents Error:', error);

        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to submit documents');
        }
      },
    }
  );
}

/**
 * ############################################################
 * @param {Get Acquisition Status} Query Hook
 * @returns
 * ############################################################
 */
export function useGetAcquisitionStatus(offerId, propertyId) {
  return useQuery(
    ['__acquisitionStatus', offerId, propertyId],
    () => getAcquisitionStatusApi(offerId, propertyId),
    {
      enabled: !!offerId && !!propertyId, // Only run query if both offerId and propertyId exist
      staleTime: 30000, // Consider data fresh for 30 seconds
      onError: (error) => {
        console.error('Get Acquisition Status Error:', error);

        const errorData = error?.response?.data;

        if (errorData?.message && Array.isArray(errorData.message)) {
          errorData.message.forEach((msg) => {
            toast.error(msg);
          });
        } else if (errorData?.message && typeof errorData.message === 'string') {
          toast.error(errorData.message);
        } else {
          toast.error(error?.message || 'Failed to fetch acquisition status');
        }
      },
    }
  );
}
