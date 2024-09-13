import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async ({ search = '', status = '' } = {}, { rejectWithValue }) => {
    try {
      console.log('Search term:', search); // Log the search term
      console.log('Status filter:', status); // Log the status filter

      // Initialize an array to hold query parameters
      let queryParams = [];

      // Add search term to query parameters if provided
      if (search) {
        queryParams.push(`search=${encodeURIComponent(search)}`);
      }

      // Add status filter to query parameters if provided
      if (status) {
        queryParams.push(`status=${encodeURIComponent(status)}`);
      }

      // Build the final URL with query parameters
      const url = `${config.FETCH_ORDERS}${queryParams.length > 0 ? `?${queryParams.join('&')}` : ''}`;
      console.log('Fetching orders with URL:', url);

      const response = await postLoginService.get(url);
      console.log('Orders:', response);

      return {
        items: response.data.items,
      
      };
    } catch (error) {
      console.error('API error:', error);
      return rejectWithValue(error.message);
    }
  }
);



export const ordersDetails = createAsyncThunk(
  "orders/details",
  async (id) => {
    try {
      if (!id) {
        throw new Error("Order ID is required");
      }
      const url = `${config.ORDERS_DETAILS.replace("{id}", id)}`; 
      const response = await postLoginService.get(url);
      console.log('Order detail:', response);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      return Promise.reject(error);
    }
  }
);

export const fetchOrderStatus = createAsyncThunk(
  "orders/status",
  async () => {
    try {
      const url = config.ORDERS_STATUS;
      const response = await postLoginService.get(url);
      console.log('Order status:', response);
      return response.data;
    } catch (error) {
      console.error('API error:', error);
      return Promise.reject(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (payload, { dispatch, getState }) => {
    const { ids, status } = payload;
    const requestUrl = `${config.UPDATE_ORDER_STATUS}${ids.join(',')}`;
    console.log('Request URL:', requestUrl); 

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      console.log('Response Status:', response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);    

      await dispatch(fetchOrders());

      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
);

export const assignDeliveryBoyAndMoveToOnTheWay = createAsyncThunk(
  "orders/assignDeliveryBoy",
  async (payload, { dispatch }) => {
    const { orderIds, assignee, status } = payload; 
    const requestUrl = `${config.ASSIGN_DELIVERY_BOY}${orderIds.join(',')}&assignee=${encodeURIComponent(assignee)}`;

    // Include the assignee and status in the request body as well
    const requestBody = JSON.stringify({ assignee, status });

    console.log('Request URL:', requestUrl);
    console.log('Request Body:', requestBody);

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody, 
      });

      console.log('Response Status:', response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      await dispatch(fetchOrders());

      return result;
    } catch (error) {
      console.error('Error assigning delivery boy:', error);
      throw error;
    }
  }
);

export const updateSingleOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (payload, { dispatch, getState }) => {
    const { ids, status } = payload;
    const requestUrl = `${config.UPDATE_SINGLE_ORDER_STATUS}${ids}`;
    console.log('Request URL:', requestUrl); 

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      console.log('Response Status:', response);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);    

      await dispatch(ordersDetails(ids));
      return result;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
);

export const assignDeliveryBoyAndMoveToOnTheWayforsingleorder = createAsyncThunk(

  'orders/assignDeliveryBoyAndMoveToOnTheWayforsingleorder',
  async ({ ids, assignee, status }, { rejectWithValue, dispatch }) => {
    try {
      console.log('Assigning delivery boy with parameters:', { ids, assignee, status });

      const url = `${config.ASSIGN_DELIVERY_BOY_SINGLEORDER}${ids.join(',')}&assignee=${encodeURIComponent(assignee)}`;
      console.log('Request URL:', url);
      const response = await fetch(url, {        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignee, status }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      await dispatch(ordersDetails(ids));
      if (!response.ok) {
        throw new Error(data.message || 'Failed to assign delivery boy');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
