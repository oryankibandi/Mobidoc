import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.main`
  ${tw`w-full m-0 min-h-full overflow-y-scroll flex flex-col items-center`}
  section {
    ${tw`relative min-h-[80%] pb-[100px] min-w-[400px] max-w-[700px] w-[80%] mb-4 bg-white p-8 rounded-lg`}
    font-family:RufinaRegular;
  }
  header {
    ${tw`w-full p-1 pr-4 pl-[100px] flex items-center justify-between`}
    p {
      ${tw`text-[20px] text-[#1E1E1E]`}
    }
    div {
      ${tw`w-[150px] px-1 flex justify-between items-center`}
    }
  }
  form {
    ${tw`w-full flex flex-col my-7 mx-6 `}
    div {
      ${tw`w-[100%] mt-[6px] text-[20px] mx-auto flex items-center justify-between lg:w-[70%]`}
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
      ${tw`p-4  min-w-[200px] capitalize`}
      font-family:RufinaBold;
    }
    input {
      ${tw`h-[40px] text-[20px] w-[50%] pl-2 border-none`}
      font-family: NotoMedium;
    }
    input::placeholder {
      ${tw`capitalize`}
    }
    .before-update {
      ${tw`text-[20px] cursor-default mt-0 p-2 self-center pl-2 border-none`}
      font-family: NotoMedium;
    }
    .edit-btn {
      ${tw`absolute cursor-pointer bottom-[40px] right-[30px] w-[185px] h-[45px] text-white px-6 bg-[#0EA5E9] mt-[8px] text-[20px] flex items-center justify-between rounded-lg`}
      img {
        ${tw`w-[20px]`}
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