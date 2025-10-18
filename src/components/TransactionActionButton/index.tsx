import { Eye, Pencil, Trash } from "phosphor-react";
import * as S from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

interface TransactionActionButtonProps {
  id: string;
  mode?: "view" | "edit";
  icon: "eye" | "pencil" | "trash";
  onClick: (id: string) => void;
  selectedId?: string | null;
}

export function TransactionActionButton({
  id,
  mode,
  icon,
  onClick,
  selectedId,
}: TransactionActionButtonProps) {
  const icons = {
    eye: Eye,
    pencil: Pencil,
    trash: Trash,
  };

  const Icon = icons[icon];

  const variant = icon === "trash" ? "delete" : "view";
  return (
    <td>
      {mode ? (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.ButtonTable variant={variant} onClick={() => onClick(id)}>
              <Icon size={20} />
            </S.ButtonTable>
          </Dialog.Trigger>

          {selectedId === id && mode && (
            <NewTransactionModal id={id} mode={mode} />
          )}
        </Dialog.Root>
      ) : (
        <S.ButtonTable variant={variant} onClick={() => onClick(id)}>
          <Icon size={20} />
        </S.ButtonTable>
      )}
    </td>
  );
}
