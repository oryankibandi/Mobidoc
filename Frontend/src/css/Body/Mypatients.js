import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`w-full pt-4 flex flex-col items-center`}
  .main {
    ${tw`w-full px-4 sm:p-0 sm:w-[calc(100% - 80px)] sm:ml-[50px]`}
  }
  .header {
    ${tw`flex items-center flex-col-reverse justify-between p-2 bg-white w-full rounded-lg sm:flex-row`}
    font-family:RufinaBold;
    .search {
      ${tw`w-full max-w-[400px] min-w-[150px] flex flex-col justify-start md:items-center md:justify-between md:max-w-[550px] md:min-w-[250px] lg:justify-center lg:max-w-[800px] lg:min-w-[600px] lg:items-center lg:justify-start md:px-2 md:flex-row`}
      div {
        ${tw`flex items-center justify-between`}
      }
      .date-search {
        ${tw`flex flex-col p-0 m-0 w-full min-w-[150px] max-w-[300px] items-center justify-between md:max-w-[150px] md:min-w-[120px]  md:justify-start md:items-center lg:max-w-max lg:min-w-min lg:w-auto lg:mr-2 lg:px-1 lg:pl-3 lg:w-[400px] lg:justify-between lg:flex-row`}
        div {
          ${tw`flex-row justify-between items-start bg-none w-full md:flex-col lg:items-center lg:flex-row`}
          input {
            ${tw`w-full mb-2 max-w-[100px] min-w-[90px] sm:max-w-[180px] sm:min-w-[150px] md:mb-0 md:max-w-none`}
          }
        }
      }
    }
    input[type="search"] {
      ${tw`bg-[#F9F9F9] w-full max-w-[300px] min-w-[150px] text-[#737373] border-solid justify-self-start p-2 pl-4 mr-3 border-[#D2D0D0] border rounded mb-2 md:max-w-[300px] md:min-w-[200px] md:mb-0 md:self-start md:mt-[5px] lg:max-w-[300px]`}
    }
    input[type="date"] {
      ${tw`p-2 bg-[#F9F9F9] border-[#E6E6E6] border-solid border rounded text-[#737373]`}
    }
    label {
      ${tw`text-[#737373] block mb-2 md:inline md:mr-4 md:self-start`}
    }
    .dark {
      ${tw`w-[120px] px-1 self-end mb-3 flex justify-between items-center sm:self-center sm:mb-0`}
    }
  }
  section {
    ${tw`relative flex flex-col-reverse items-start pb-8 mt-4 pt-3 lg:flex-row`}
    .inform-div {
      ${tw`hidden absolute h-auto top-[0%] left-[10%] w-fit text-[18px] m-0 mx-auto mb-4 p-0 p-1 px-2 rounded-xl`}
      font-family:RufinaRegular;
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
      ${tw`w-full text-[20px] text-[#1E1E1E]`}
      font-family:OswaldBold;
    }

    .records .doctors {
      ${tw`h-full w-full rounded`}
    }
    .records {
      ${tw`w-full min-w-[400px] max-w-[700px] pr-6`}
      .no-data {
        ${tw`w-full flex flex-col items-center justify-center`}
        img {
          ${tw`max-w-[200px] w-full`}
        }
        p {
          ${tw`text-[20px]`}
          font-family:RufinaRegular;
        }
      }
      .record {
        font-family: RufinaRegular;
        ${tw`bg-white w-full min-w-[200px] max-w-fit text-[#404040] mb-4 p-2 px-6  rounded-lg lg:max-w-[600px]`}
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
      ${tw`w-full min-w-[300px] lg:max-w-[450px]`}
      header {
        ${tw`text-start lg:text-center`}
      }
      .doctors-div {
        ${tw`w-full bg-white p-8 px-4 rounded-lg`}
      }
      .doctor {
        ${tw`w-full mb-4 p-4 bg-white flex justify-between rounded`}
        font-family:RufinaRegular;
        .details {
          ${tw`pl-4`}
          p {
            ${tw`m-0 mb-1 text-[15px] text-[rgba(40,40,40,.76)]`}
          }
          .title-div {
            ${tw`min-w-fit flex flex-col items-start justify-center sm:flex-row sm:items-center sm:justify-between`}
            .title {
              ${tw`text-[18px] mr-3 text-[#000]`}
              font-family:RufinaBold;
            }
          }
          .detail-inner {
            ${tw`flex flex-col md:justify-between md:flex-row`}
            p:last-child {
              ${tw`ml-3`}
            }
          }
        }
        .pending {
          ${tw`flex items-center justify-center z-20`}
          .add {
            ${tw`cursor-pointer flex items-center justify-center w-[30px] h-[30px] bg-[#24A8FA] rounded`}
            img {
              ${tw`w-[15px] cursor-pointer md:w-[18px]`}
            }
          }
          .request {
            ${tw`bg-[#24A8FA] text-[#fff] rounded-lg  p-0 p-2 pt-1`}
          }
        }
      }
      .active-doc {
        ${tw`bg-[rgba(40,40,40,.1)]`}
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

export { Main };
