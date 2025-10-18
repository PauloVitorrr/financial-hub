import * as Dialog from "@radix-ui/react-dialog";

import { Controller, useForm } from "react-hook-form";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import * as z from "zod";

import * as S from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  value: z.number(),
  category: z.string(),
  type: z.enum(["entrada", "saída"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

interface NewTransactionModalProps {
  mode?: "view" | "register" | "edit";
  id?: string;
}

export function NewTransactionModal({ mode, id }: NewTransactionModalProps) {
  const { createTransaction, fetchTransactionById, editTransaction } =
    useContext(TransactionsContext);
  const [isEditable, setIsEditable] = useState(mode !== "view");
  const [modeState, setModeState] = useState(mode);
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "entrada",
    },
  });

  async function handleCreateAndEditTransaction(
    data: NewTransactionFormInputs
  ) {
    const { description, value, category, type } = data;

    if (modeState === "edit" && id) {
      await editTransaction({
        id,
        description,
        value,
        category,
        type,
        date: new Date(),
      });
      return;
    }

    if (modeState === "register") {
      await createTransaction({
        description,
        value,
        category,
        type,
      });
    }

    reset();
  }
  useEffect(() => {
    const loadTransaction = async () => {
      if (modeState === "view" || (modeState === "edit" && id)) {
        const transaction = await fetchTransactionById(id as string);
        if (transaction) {
          reset({
            description: transaction.description,
            value: transaction.value,
            category: transaction.category,
            type: transaction.type,
          });
        }
      }
    };

    loadTransaction();
  }, [id, mode, fetchTransactionById, reset]);

  const modeVerification = modeState === "view" || modeState === "edit";

  return (
    <Dialog.Portal>
      <S.Overlay />

      <S.Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <S.CloseButton>
          <X size={24} />
        </S.CloseButton>

        <form onSubmit={handleSubmit(handleCreateAndEditTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            disabled={!isEditable}
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            required
            disabled={!isEditable}
            {...register("value", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            disabled={!isEditable}
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <S.TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!isEditable}
                >
                  <S.TransactionTypeButton variant="entrada" value="entrada">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </S.TransactionTypeButton>

                  <S.TransactionTypeButton variant="saída" value="saída">
                    <ArrowCircleDown size={24} />
                    Saída
                  </S.TransactionTypeButton>
                </S.TransactionType>
              );
            }}
          />
          {isEditable && (
            <S.SubmitButton
              type="submit"
              disabled={isSubmitting || (modeVerification && !isDirty)}
            >
              {modeVerification ? "Salvar Alterações" : "Cadastrar"}
            </S.SubmitButton>
          )}
        </form>

        {mode === "view" && !isEditable && (
          <S.SubmitButton
            type="button"
            onClick={() => (setIsEditable(true), setModeState("edit"))}
          >
            Editar
          </S.SubmitButton>
        )}
      </S.Content>
    </Dialog.Portal>
  );
}
