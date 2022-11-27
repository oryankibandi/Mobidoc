import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.main`
  ${tw`w-full m-0 flex flex-col items-center`}
  section {
    ${tw`relative h-[80%] pb-[120px] min-w-[400px] max-w-[700px] w-[80%] bg-white p-8 rounded-lg drop-shadow-md2`}
    font-family:RufinaRegular;
  }
  form {
    ${tw`w-full mx-6 m-8`}
    div {
      ${tw`w-[100%] mt-[8px] text-[20px] mx-auto flex items-center justify-between lg:w-[70%]`}
    }
    label {
      ${tw`p-4`}
      font-family:RufinaBold;
    }
    input {
      ${tw`h-[40px] text-[20px] w-[50%] pl-2 border-none`}
      font-family:RufinaRegular;
    }
    .edit-btn {
      ${tw`absolute cursor-pointer bottom-[60px] right-[30px] w-[185px] h-[45px] text-white px-6 bg-[#0EA5E9] mt-[8px] text-[20px] flex items-center justify-between rounded-lg`}
        img{
            ${tw`w-[20px]`}
        }
    }
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
`;
export {Main}