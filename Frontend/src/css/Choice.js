import styled from "styled-components"
import tw from "twin.macro"

const Main = styled.main`
  ${tw`min-h-screen w-screen flex items-center justify-center bg-[#6EE7B7] lg:justify-between`}
  .image {
    ${tw`h-screen bg-white hidden items-center justify-center w-full lg:flex`}
  }
  form {
    ${tw`relative w-full flex flex-col items-center justify-start w-3/4 my-auto border-solid border-none bg-[#6EE7B7]`}

    header {
      ${tw`text-center w-full text-[#404040] my-[3vh] text-[20px] lg:my-[25px]`}
    }

    div {
      font-family: RufinaRegular;
      ${tw`w-[70%] min-w-[250px] max-w-[400px] mx-auto mb-4 flex flex-col justify-between space-y-2 sm:space-y-0 sm:min-w-[300px] sm:flex-row`}
      select, input {
        ::placeholder{
          ${tw`text-[rgba(40,40,40,.6)]`}
        }
        font-family: NotoMedium;
        ${tw`w-full p-2 text-[#404040] text-[15px] bg-white border-solid border-transparent py-1 pl-3 border focus:border-[rgba(40,40,40,.5)]`}
      }
    }
    a {
      ${tw`no-underline cursor-pointer  w-[70%] min-w-[250px] max-w-[400px] mx-auto mb-4 sm:min-w-[300px]`}
    }
    .submit-div {
      ${tw`w-full m-0 z-10 cursor-pointer`}
    }
    .error-div {
      ${tw`hidden m-0 mb-2 h-auto`}
      p {
        ${tw`flex items-center justify-between text-left mx-auto my-0 p-1 px-2 rounded-lg bg-[#C4F9E2] text-[#004434]`}
        img {
          ${tw`ml-3 w-[8px]`}
        }
      }
      .error {
        ${tw`bg-[#FFF0F0] text-[#BC1C21]`}
      }
    }
    .active-error-div {
      ${tw`flex`}
    }
    div input:nth-child(2),
    div input:nth-child(3) {
      ${tw`border border-l-[rgba(40,40,40,.1)] focus:border-l-[rgba(40,40,40,.5)]`}
    }
    input[type="submit"] {
      ${tw`bg-[#404040] text-white`}
    }
    .goto {
      ${tw``}
      font-family:RufinaBold;
      p {
        ${tw`mx-auto text-[rgba(40,40,40,.8)]`}
      }
      a {
        ${tw`no-underline text-[#0C0B19] hover:underline`}
      }
    }
  }
`;
export {Main}