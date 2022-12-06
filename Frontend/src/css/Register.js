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
    ${tw` relative bg-green-lighter px-4 flex flex-col items-center justify-start lg:px-2 md:w-[40%]`}
    header {
      ${tw`p-4 mt-[25%] mb-[30px] text-xl underline`}
    }
    form {
      ${tw` w-full max-w-[350px] px-4`}
    }
    div {
      ${tw`w-full h-[35px] mb-[25px] flex items-center justify-center`}
      input,select {
        ${tw`h-full w-full pl-3 border-[#1E1E1E] text-[#1E1E1E] border bg-white focus:bg-[#E8F5F5] md:pl-4`}
      }
      input[type="submit"] {
        ${tw`bg-[#1E1E1E] text-white`}
      }
    }.last-div{
      ${tw`mb-[35px]`}
    }
    .error-div {
      ${tw`hidden m-0 mb-2 h-auto`}
      p {
        ${tw`flex items-center justify-between text-center mx-auto my-0 p-1 px-2 rounded-lg bg-[#F9FFFB] text-[#46C882]`}
        img {
          ${tw`ml-3 w-[8px]`}
        }
      }
      .error {
        ${tw`bg-[#FFF9F9] text-[#E74040]`}
      }
    }
    .active-error-div {
      ${tw`flex`}
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
    .submit-div {
      ${tw`m-0 mb-1`}
    }
    .first-div {
      ${tw`justify-between`}
      input {
        ${tw`w-[calc(50% - 2px)]`}
      }
      input:nth-child(1),
      input:nth-child(2) {
        border-right: 1px solid transparent;
      }
    }
    .header {
      ${tw`mb-2 flex items-center text-[rgba(40,40,40,.7)] justify-start`}
      font-family:OswaldBold;
    }
    .phonenumber {
      ${tw`mb-3`}
    }
    .error-div {
      ${tw`hidden m-0 mb-2 h-auto`}
      p {
        ${tw`flex items-center justify-between text-center mx-auto my-0 p-1 px-2 rounded-lg bg-[#F9FFFB] text-[#46C882]`}
        img {
          ${tw`ml-3 w-[8px]`}
        }
      }
      .error {
        ${tw`bg-[#FFF9F9] text-[#E74040]`}
      }
    }
    .active-error-div {
      ${tw`flex`}
    }
  }
  .go-back {
    ${tw`text-center text-[15px] flex items-center text-[rgba(40,40,40,.9)]`}
    a {
      ${tw`ml-2 no-underline text-[#000] hover:underline`}
    }
  }
`;

export {Main}