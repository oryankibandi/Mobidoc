import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.main`
  ${tw`w-full pt-4 flex flex-col items-center`}
  .main {
    ${tw`w-[calc(100% - 80px)] ml-[50px]`}
  }
  .header {
    ${tw`flex items-center justify-between p-2 bg-white w-full rounded-lg`}
    font-family:RufinaBold;
    .search {
      ${tw`w-[70%] pl-2 flex items-center justify-between`}
      div {
        ${tw`flex items-center`}
      }
    }
    input[type="search"] {
      ${tw`bg-[#F9F9F9] w-[300px] text-[#737373] border-solid justify-self-start p-2 pl-4 border-[#D2D0D0] border rounded`}
    }
    input[type="date"] {
      ${tw`p-2 bg-[#F9F9F9] border-[#E6E6E6] border-solid border rounded text-[#737373]`}
    }
    label {
      ${tw`text-[#737373] block mb-2 md:inline md:mr-4 md:self-start`}
    }
    .dark {
      ${tw`w-[120px] px-1 flex justify-between items-center`}
    }
  }
  section {
    ${tw`grid grid-cols-[7fr 3fr] gap-4 flex pb-8 mt-4`}
    header {
      ${tw`w-full text-[20px] text-[#1E1E1E]`}
      font-family:OswaldBold;
    }
    .records .doctors {
      ${tw`h-full w-full rounded`}
    }
    .records {
      ${tw`w-full`}
      .record {
        font-family: RufinaRegular;
        ${tw`bg-white w-[600px] text-[#404040] mb-4 p-2 px-6 h-[220px] rounded-lg`}
        div {
          ${tw`w-full h-auto`}
        }
        .title {
          font-family: OswaldMedium;
          ${tw`text-[20px] flex flex-col items-start justify-center`}
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
      }
      .paginate {
        ${tw`w-full flex items-center`}
        .inner-paginate {
          ${tw`h-[40px] px-2 bg-white mx-auto flex items-center rounded-lg`}
          button {
            ${tw`m-1 h-[26px] text-[#838995] bg-white hover:bg-[rgba(156, 179, 255, .2)] border-none`}
          }
          img {
            ${tw`m-1 p-1 w-[15px] hover:bg-[rgba(156, 179, 255, .2)]`}
          }
          .active-btn {
            ${tw`bg-[rgba(156, 179, 255, .2)]`}
          }
        }
      }
    }
    .doctors {
      ${tw`w-full`}
      header {
        ${tw`text-center`}
      }
      .doctors-div {
        ${tw`w-full bg-white p-8 px-4 rounded-lg`}
      }
      .doctor {
        ${tw`w-full mb-4 bg-white flex justify-between`}
        font-family:RufinaRegular;
        .details {
          ${tw`pl-4`}
          p {
            ${tw`m-0 mb-1 text-[15px] text-[rgba(40,40,40,.76)]`}
          }
          .title {
            ${tw`text-[18px] text-[#000]`}
            font-family:RufinaBold;
          }
        }
        .pending {
          ${tw`w-[60px] mr-2 flex items-center justify-between`}
          img {
            ${tw`w-[22px] cursor-pointer`}
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
      .view-all {
        ${tw`w-full flex items-center justify-center`}
        button {
          ${tw`mt-4 p-2 rounded-lg cursor-pointer bg-white border-solid border border-[#404040] text-[#404040]`}
        }
      }
    }
  }
`;

export {Main}