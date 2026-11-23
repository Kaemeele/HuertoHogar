export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with a status code
    const status = error.response.status;
    const data = error.response.data;
    if (data && typeof data === 'object' && data.error) {
      return data.error;
    }
    switch (status) {
      case 400:
        return 'Bad request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not found';
      case 500:
        return 'Server error';
      default:
        return `Error ${status}`;
    }
  } else if (error.request) {
    // No response received
    if (error.code === 'ECONNABORTED') {
      return 'Request timeout';
    }
    return 'Network error';
  } else {
    // Something else happened
    return error.message || 'Unexpected error';
  }
};
