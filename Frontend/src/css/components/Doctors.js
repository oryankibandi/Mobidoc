import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.table`
    font-family: RufinaRegular;
    ${tw`overflow-hidden bg-white rounded-xl border-collapse`}
    th, td {
      ${tw`p-4 px-6 text-start text-[rgba(40,40,40,.9)] `}
    }

    tr:nth-child(odd) {
      ${tw`bg-[#FAFAFA] `}
    }
    tr {
      td:last-child,
      th:last-child {
        ${tw`text-center`}
      }
      border-bottom: 1px solid rgba(40, 40, 40, 0.1);
      .pending {
        ${tw`flex items-center justify-evenly`}
        img {
          ${tw`w-[20px] cursor-pointer`}
        }
        button {
          ${tw`p-1 text-[15px] rounded-lg border-none bg-[#FFFCF9] text-[#FFA901]`}
          font-family:RufinaRegular;
        }
        .declined {
          ${tw`bg-[#FFF9F9] text-[#E74040]`}
        }
      }
    }
    tr:last-child {
      font-family: RufinaRegular;
      border: none;
      button {
        ${tw`cursor-pointer p-2 py-1 bg-white text-[rgba(40,40,40,.8)] border-solid border border-[rgba(40, 40, 40, 0.13)] rounded`}
      }
      td:nth-child(2) {
        div {
          ${tw`flex items-center justify-center`}
        }
        button {
          ${tw`w-[25px] h-[25px]  text-[rgba(40,40,40,.8)] border border-transparent text-[15px] text-center p-0 mx-1 rounded-md`}
        }
        .active-page {
          ${tw`bg-[white]  border border-[rgba(40, 40, 40, 0.13)]`}
        }
      }
    }
`;

export { Main }