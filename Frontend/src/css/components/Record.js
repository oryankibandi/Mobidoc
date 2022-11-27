import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.div`
  font-family: RufinaRegular;
  ${tw`bg-white w-[600px] text-[#404040] mb-4 p-4 px-6 rounded-lg`}
  div {
    ${tw`w-full h-auto`}
  }
  .title {
    font-family: OswaldMedium;
    ${tw`text-[20px] flex flex-col items-center justify-center`}
    p {
      ${tw`m-0`}
    }
    .date {
      ${tw`text-[rgba(40,40,40,.76)] text-[15px] mt-2`}
      font-family: RufinaRegular;
    }
  }
  .footer {
    ${tw`w-full flex text-[#1E1E1E] items-center justify-between`}
    button {
      ${tw`cursor-pointer capitalize p-2 text-[13px] bg-white border-solid border border-[#06B6D4] text-[#06B6D4] rounded-lg`}
      outline:none;
    }
    font-family: RufinaBold;
  }
  .body {
    ${tw`my-4 `}
  }
  .details {
    ${tw`w-full pl-2 flex items-start justify-between`}
    div {
      ${tw`w-[1/2] m-2`}
    }
    .symptom {
      ${tw`min-w-[200px]`}
      p {
        font-family: RufinaBold;
        ${tw`text-[17px] pl-6`}
      }
      ul {
        list-style: none;
        ${tw`w-full flex flex-col text-[15px]`}
        li {
          ${tw`my-1`}
        }
      }
    }
    .medic {
      p {
        font-family: RufinaBold;
        ${tw`text-[17px]`}
      }
      table {
        ${tw`rounded`}
        border-collapse: collapse;
      }
      td,
      th {
        ${tw`p-2 px-3 text-start text-[rgba(40,40,40,.8)]`}
      }
      tr {
        border-bottom: 1px solid rgba(122, 110, 254, 0.05);
        td:first-child,
        th:first-child {
          border-radius: 5px 0px 0px 0px;
          border-style: solid;
          border: none;
        }
        td:last-child,
        th:last-child {
          border-radius: 0px 5px 0px 0px;
          border-style: solid;
          border: none;
        }
      }
      tr:first-child {
        ${tw`bg-[rgba(122, 110, 254, .05)]`}
      }
    }
  }
`;

export {Main}