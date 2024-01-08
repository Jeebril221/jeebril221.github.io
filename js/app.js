const API_BASE_URL = 'https://learn.zone01dakar.sn/api';
const API_GRAPHQL_ENDPOINT = 'https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql';

function fetchData(endpoint, method = 'POST', body = null, authHeader = null) {
    const url = `${API_BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
        },
        body: body && JSON.stringify(body),
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message);
                });
            }
            return response.json();
        })
        .catch(error => {
            console.error('API error:', error.message);
            throw new Error('API request failed.');
        });
}

async function fetchGraphQLData(query, token) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(API_GRAPHQL_ENDPOINT, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.error('GraphQL API error: ', error.message);
    throw new Error('GraphQL API request failed. ');
  }
}

