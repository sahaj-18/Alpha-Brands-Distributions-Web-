import { useState, useCallback } from 'react';


const useHttp = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
          // const response = await fetch('https://api.alphabrandsdistribution.com' + requestConfig.url, {
          const response = await fetch('http://localhost:5000' + requestConfig.url, {
              method: requestConfig.method ? requestConfig.method : 'POST',
              headers:!requestConfig.isFormData ? (requestConfig.headers) ? requestConfig.headers  : {
                'Content-Type': 'application/json'
              } : {} ,
              body: requestConfig.body ? (requestConfig.isFormData ? requestConfig.body : JSON.stringify(requestConfig.body)) : null
          });
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          applyData(data);
    
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
}

export default useHttp;
