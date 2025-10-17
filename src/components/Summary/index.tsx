import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../utils/formatter";
import * as S from "./styles";

export default function Summary() {
  const summary = useSummary();

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
        </header>

        <strong>{priceFormatter.format(summary.entrada)}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
        </header>

        <strong>{priceFormatter.format(summary.saida)}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saldo Atual</span>
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
