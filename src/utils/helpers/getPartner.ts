export const getPartnerInDialog = (
  currentDialogId: string | null,
  items: any,
  data: any
) => {
  let partner = {} as any;

  const currentDialogObj = items.filter(
    (dialog: any) => dialog._id === currentDialogId
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
  items: any,
  data: any,
  author: any,
  partner: any
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
