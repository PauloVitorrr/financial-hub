import * as S from "./styles";

export default function Summary() {
  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
        </header>

        <strong>R$20,00</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
        </header>

        <strong>R$20,00</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saldo Atual</span>
        </header>

        <strong>R$20,00</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
