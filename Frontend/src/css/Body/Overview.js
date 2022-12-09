import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`w-full pt-0 overflow-y-scroll h-screen`}
  .inform-div {
    ${tw`hidden absolute left-[50%] top-[30px] h-auto w-fit text-[18px] m-0 mx-auto mb-4 p-0 p-2 rounded-xl`}
    p {
      ${tw`p-0 m-0 `}
    }
  }
  .inform {
    ${tw`block bg-blue-50 text-blue-300`}
  }
  .success {
    ${tw`block bg-[#C4F9E2] text-[#004434]`}
  }

  .warning {
    ${tw`block bg-[#FFF0F0] text-[#BC1C21]`}
  }
  header {
    ${tw`m-0 ml-[80px] w-[calc(100% - 80px)] px-4 mt-4 flex justify-between items-center`}
    div {
      ${tw`flex items-center`}
    }
    .dark {
      ${tw`w-[85px] px-1 flex justify-between items-center text-[13px] sm:w-[120px] sm:text-[15px]`}
    }
    .welcome {
      ${tw`flex-col items-start justify-around`}
      p {
        ${tw`p-0 text-[15px] text-[rgba(40,40,40,.9)] m-0 sm:text-[20px]`}
      }
      .subtitle {
        ${tw`text-[10px] sm:text-[15px]`}
        font-family:RufinaRegular;
      }
    }
  }
  section {
    ${tw`px-5`}
  }
  .stats {
    ${tw`w-full mt-4 grid gap-2 grid-rows-[repeat(4, minmax(130px,1fr))]  grid-cols-[repeat(1, minmax(150px,1fr))]  
    sm:grid-rows-[repeat(2, minmax(130px,1fr))]  sm:grid-cols-[repeat(2, minmax(150px,1fr))]
    lg:grid-cols-[repeat(4, minmax(150px,1fr))] lg:grid-rows-[repeat(1, minmax(130px,1fr))]`}
    >div {
      ${tw`h-[130px] text-white min-w-[150px] w-full flex flex-col items-start pt-2 pl-6 rounded-lg`}
      >div {
        ${tw`w-full flex items-center justify-between`}
        .image {
          ${tw`w-[50px] h-[50px] bg-[rgba(240, 240, 240, .2)] flex items-center justify-center rounded-[100%]`}
          img {
            ${tw`w-[25px] h-[25px]`}
          }
        }
        p {
          ${tw`mr-6 text-[20px]`}
          font-family: OswaldMedium;
          letter-spacing: 0.3px;
        }
      }
      p {
        ${tw``}
        font-family:RufinaBold;
      }
    }
  }
  .request-graph {
    ${tw`w-full mt-4 flex flex-col justify-between lg:flex-row`}
    >div {
      ${tw`w-full rounded-lg`}
    }
    .req-cont {
      ${tw`mr-8 p-2 pl-0 min-w-[300px]`}
    }

    .req-cont {
      ${tw`bg-none flex flex-col justify-start`}
      header {
        ${tw`w-full m-0 mb-4 p-0 text-[20px] text-start text-[rgba(40,40,40,8)]`}
      }
      .requests {
        ${tw`p-0 p-2 pt-4 px-8 h-[300px] overflow-y-scroll rounded-lg flex bg-white items-start justify-start flex-col`}
        ::-webkit-scrollbar-thumb {
          ${tw`rounded-lg`}
          background-color: rgb(71, 70, 70,.3);
        }
        .request {
          ${tw`w-full mb-4 bg-white flex justify-between`}
          font-family:RufinaRegular;
          .details {
            ${tw``}
            p {
              ${tw`m-0 mb-1 text-[15px] text-[rgba(40,40,40,.76)]`}
            }
            .title {
              ${tw`text-[18px] text-[#000]`}
              font-family:RufinaBold;
            }
          }
          .pending {
            ${tw`w-[65px] mr-2 flex items-center justify-between`}
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
            .pending {
              ${tw`bg-[#F9FFFF] text-[#24A8FA]`}
            }
            .request {
              ${tw`bg-[#24A8FA] text-[#fff] rounded-lg  p-0 p-2 pt-1`}
            }
          }
        }
      }
    }
    .table {
      ${tw`p-0 bg-none`}
      header {
        ${tw`m-0 p-0 mb-6 text-center text-[20px]`}
      }
      .content {
        ${tw`bg-white rounded-lg px-[30px] pt-[40px] flex items-center justify-center`}
      }
    }
  }
  .patient-table {
    ${tw`w-full pt-4 mb-6 flex flex-col`}
    header {
      ${tw`p-0 m-0 w-full mb-4  text-[20px]`}
    }
    > div {
      ${tw`w-full flex items-center justify-start overflow-x-scroll`}
      ::-webkit-scrollbar-thumb {
        ${tw`rounded-lg`}
        background-color: rgb(71, 70, 70,.3);
      }
      ::-webkit-scrollbar {
        width: 0.1em;
      }
    }
    table {
      ${tw`w-full`}
    }
  }
`;
export { Main };
