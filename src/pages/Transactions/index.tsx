import { Header } from "../../components/Header";
import Summary from "../../components/Summary";
import * as S from "./styles";

export default function Transactions() {
  return (
    <div>
      <Header />
      <S.Main>
        <Summary />
      </S.Main>
    </div>
  );
}
