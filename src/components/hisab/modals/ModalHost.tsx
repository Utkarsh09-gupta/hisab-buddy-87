import { useUI } from "../ui-store";
import { AddFriendExpenseModal } from "./AddFriendExpenseModal";
import { AddFriendModal } from "./AddFriendModal";
import { AddMoneyModal } from "./AddMoneyModal";
import { AddPersonalExpenseModal } from "./AddPersonalExpenseModal";
import { QuickAddSheet } from "./QuickAddSheet";
import { SettleUpModal } from "./SettleUpModal";
import { TransactionDetailModal } from "./TransactionDetailModal";

export function ModalHost() {
  const { modal, close } = useUI();

  switch (modal.type) {
    case "quickAdd":
      return <QuickAddSheet onClose={close} />;
    case "friendExpense":
      return <AddFriendExpenseModal {...(modal.friendId ? { presetFriendId: modal.friendId } : {})} onClose={close} />;
    case "personalExpense":
      return <AddPersonalExpenseModal onClose={close} />;
    case "money":
      return <AddMoneyModal onClose={close} />;
    case "addFriend":
      return <AddFriendModal onClose={close} />;
    case "settle":
      return <SettleUpModal {...(modal.friendId ? { presetFriendId: modal.friendId } : {})} onClose={close} />;
    case "txDetail":
      return <TransactionDetailModal txId={modal.txId} onClose={close} />;
    default:
      return null;
  }
}
