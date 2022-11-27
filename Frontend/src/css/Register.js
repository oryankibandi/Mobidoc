import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.main`
  ${tw`w-screen h-screen flex flex-col md:flex-row`}
  section {
    ${tw`w-full min-h-[600px] max-h-[1440px] md:w-1/2 md:h-full`}
    form {
      font-family: RufinaRegular;
    }
  }
  .login {
    ${tw` relative bg-green-lighter px-4 flex flex-col items-center lg:px-2 md:w-[40%]`}
    header {
      ${tw`p-4 mt-[10%] text-xl underline`}
    }
    form {
      ${tw`my-auto w-full max-w-[350px] px-4`}
    }
    div {
      ${tw`w-full h-[35px] mb-[35px] flex items-center justify-center`}
      input {
        ${tw`h-full w-full pl-3 border-[#1E1E1E] text-[#1E1E1E] border bg-white focus:bg-[#E8F5F5] md:pl-4`}
      }
      input[type="submit"] {
        ${tw`bg-[#1E1E1E] text-white`}
      }
    }
  }
  .register {
    ${tw` bg-white flex flex-col items-center md:w-[60%]`}
    header {
      ${tw`p-4 mt-[10%] text-xl underline`}
    }
    form {
      ${tw`my-auto w-full max-w-[400px] px-4`}
    }

    div {
      ${tw`w-full h-[35px] mb-[30px] flex items-center justify-center`}
      input {
        ${tw`h-full w-full pl-3 border border-[#1E1E1E] text-[#1E1E1E] bg-white focus:bg-[#F1FEFF] md:pl-4`}
      }
      input[type="submit"] {
        ${tw`bg-[#16A34A] text-white border-none`}
      }
    }
    .first-div {
      ${tw`justify-between`}
      input {
        ${tw`w-[calc(50% - 2px)]`}
      }
      input:nth-child(1), input:nth-child(2) {
        border-right:1px solid transparent;
      }
    }
    .header {
      ${tw`mb-2 flex items-center text-[rgba(40,40,40,.7)] justify-start`}
      font-family:OswaldBold;
    }
    .phonenumber {
      ${tw`mb-3`}
    }
  }
`;

export {Main}