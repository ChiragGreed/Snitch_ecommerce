import { createSlice, current } from '@reduxjs/toolkit'; 

const orderSlice = createSlice({ 
  name: 'order', 
  initialState: { 
    orderDets: [] 
  }, 
  reducers: { 
    setOrderDets: (state, action) => { 
      state.orderDets = action.payload; 
    } 
  } 
});

export const { setOrderDets } = orderSlice.actions; 
export default orderSlice.reducer;