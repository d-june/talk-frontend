import { createSlice } from "@reduxjs/toolkit";

type AttachmentsType = {
  uid: string;
};

const initialState = {
  attachments: [] as Array<AttachmentsType>,
};

const attachmentsSlice = createSlice({
  name: "attachments",
  initialState,
  reducers: {
    setAttachments(state, action) {
      state.attachments = action.payload;
    },
    removeAttachment(state, action) {
      if (state.attachments.length) {
        state.attachments = state.attachments.filter(
          (attachment) => attachment.uid !== action.payload.uid
        );
      }
    },
  },
});

export const { setAttachments, removeAttachment } = attachmentsSlice.actions;

export default attachmentsSlice.reducer;
