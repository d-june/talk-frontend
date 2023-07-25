import { DialogType } from "../../redux/slices/dialogs/types";
import { UserInfoType } from "../../redux/slices/users/types";

export const getPartnerInDialog = (
  currentDialogId: string | null,
  items: Array<DialogType>,
  data: UserInfoType | null
) => {
  let partner = {} as UserInfoType | null;

  const currentDialogObj = items.filter(
    (dialog: DialogType) => dialog._id === currentDialogId
  )[0];

  if (data && currentDialogObj?.author._id === data._id) {
    partner = currentDialogObj.partner;
  } else {
    partner = currentDialogObj?.author;
  }

  if (!items.length || !currentDialogId) {
    return null;
  }
  return partner;
};

export const getPartner = (
  items: Array<DialogType>,
  data: UserInfoType | null,
  author: UserInfoType,
  partner: UserInfoType | null
) => {
  if (!items.length) {
    return null;
  }

  if (author && data && author._id !== data._id) {
    partner = author;
  }

  if (!items.length) {
    return null;
  }
  return partner;
};
