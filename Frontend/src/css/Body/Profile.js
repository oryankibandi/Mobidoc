import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.main`
  ${tw`w-full m-0 h-screen overflow-y-scroll flex flex-col items-center`}
  section {
    ${tw`relative pb-[100px] min-w-[150px] max-w-[700px] w-[80%] mb-4 bg-white p-8 pl-6 pr-2 md:px-2 rounded-lg`}
    font-family:RufinaRegular;
  }
  header {
    ${tw`w-full p-1 pr-4 pl-[100px] flex items-center justify-between`}
    p {
      ${tw`text-[15px] md:text-[20px] text-[#1E1E1E]`}
    }
    div {
      ${tw`px-1 flex justify-between items-center`}
      p {
        ${tw`mr-2`}
      }
    }
  }
  form {
    ${tw`w-full flex flex-col items-center  max-w-[500px] px-0 lg:items-start md:max-w-[545px] mx-auto`}
    div {
      ${tw`w-[100%]  mt-[6px] text-[15px] mx-auto flex flex-col items-start sm:items-center justify-between sm:flex-row md:text-[20px] lg:w-[70%]`}
    }
    .inform-div {
      ${tw`hidden h-auto w-fit text-[18px] m-0 mx-auto mb-4 p-0 p-2 rounded-xl`}
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
    label {
      ${tw`sm:p-4 w-full p-2 pl-6 min-w-min sm:min-w-[150px] md:min-w-[228px] capitalize`}
      font-family:RufinaBold;
    }
    input {
      ${tw`h-[40px] text-[15px] ml-4 sm:m-0 md:text-[20px] w-[100%] md:w-[50%] pl-2 border-none`}
      font-family: NotoMedium;
    }
    input::placeholder {
      ${tw`capitalize`}
    }
    .before-update {
      ${tw` text-[15px] cursor-default p-1 px-2 pl-6 mt-0 sm:p-2 sm:pl-2 border-none lg:text-[20px]`}
      font-family: NotoMedium;
    }
    .edit-btn {
      ${tw`flex-row absolute cursor-pointer bottom-[40px] right-[30px]   text-white px-2 bg-[#0EA5E9] mt-[8px]
       flex items-center justify-between rounded-lg text-[15px] w-[116px] sm:w-[130px] h-[35px] sm:px-3 md:h-[45px] md:px-6 md:w-[185px] md:text-[20px]`}
      img {
        ${tw`w-[15px] md:w-[20px]`}
      }
    }
    .header-div {
      border: 1px solid transparent;
      border-bottom: 1px solid rgba(40, 40, 40, 0.09);
      .header-profile {
        ${tw`w-full p-0 p-1 pl-4 text-start text-[rgba(40,40,40,.7)]`}
        font-family:OswaldMedium;
      }
    }
  }
`;
export {Main}