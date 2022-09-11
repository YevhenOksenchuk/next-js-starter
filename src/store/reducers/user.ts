import { UserState } from "../types/user";
import { createSlice } from "@reduxjs/toolkit";


const initialState: UserState = {
  id: null,
  role: 'user',
  firstName: '',
  lastName: '',
  isOnline: false,
  isLogin: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
})

export default userSlice.reducer;
