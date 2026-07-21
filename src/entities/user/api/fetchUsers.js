export const fetchUsers = async ({ limit = 10, skip = 0, sortBy, order, searchQuery }) => {
  try {
    let url = 'https://dummyjson.com/users';
    const params = new URLSearchParams({ limit, skip });

    if (searchQuery && searchQuery.trim() !== '') {
      url = 'https://dummyjson.com/users/search';
      params.append('q', searchQuery.trim());
    }

    if (sortBy && order) {
      params.append('sortBy', sortBy);
      params.append('order', order);
    }

    const response = await fetch(`${url}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      users: data.users || [],
      total: data.total || 0,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
