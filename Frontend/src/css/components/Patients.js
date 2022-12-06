import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.table`
  font-family: RufinaRegular;
  ${tw`bg-white w-[calc(100% - 32px)] rounded-xl m-4 ml-0 border border-[#FAFAFA] border-collapse`}

  tbody, thead {
    th,
    td {
      ${tw`p-4 px-6 text-start text-[rgba(40,40,40,.9)] `}
    }

    tr:nth-child(even) {
      ${tw`bg-[rgba(250, 250, 250, 1)] `}
    }
    tr {
      td:last-child,
      th:last-child {
        ${tw`text-center`}
        border-right:1px solid rgba(40, 40, 40, .12);
      }
      td:first-child,
      th:first-child {
        border-left: 1px solid rgba(40, 40, 40, 0.12);
      }
      border-bottom: 1px solid rgba(40, 40, 40, 0.15);
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
        .pending {
          ${tw`bg-[#F9FFFF] text-[#24A8FA]`}
        }
        .request {
          ${tw`bg-[#24A8FA] text-[#fff] rounded-lg  p-0 p-2 pt-1`}
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
  }
  thead {
    ${tw`bg-[rgba(250, 250, 250, 1)]`}
    tr {
      ${tw`bg-[rgba(0,0,0,.02)]`}
    }
  }
  tbody tr:nth-child(1) {
    border-top: 1px solid rgba(40, 40, 40, 0.12);
  }
  tbody tr td:nth-child(4) {
    font-family: NotoMedium;
  }
`;

export { Main };
