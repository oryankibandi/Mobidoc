import styled from "styled-components";
import tw from "twin.macro";

const Main = styled.form`
  font-family: RufinaRegular;
  ${tw`bg-white w-[730px] text-[#404040] mb-4 p-4 px-6 rounded-lg`}

  div {
    ${tw`w-full h-auto`}
  }
  .add{
    ${tw`bg-orange-400 w-[60px] text-[15px] border-none text-white rounded p-[1px] py-[2px] text-center`}
  }input[type=submit]{
    ${tw`p-2 bg-[#404040] text-white rounded-lg border-none`}
  }
  .title {
    font-family: OswaldMedium;
    ${tw`text-[20px] w-full flex flex-col items-center justify-center`}
    input, textarea {
      ${tw`w-full rounded p-2 border border-[rgba(40,40,40,.3)]`}
      outline:none;
    }
    textarea {
      ${tw`h-[50px] mt-3`}
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
        ${tw`max-w-[200px] flex flex-col text-[15px]`}
        li {
          ${tw`my-1`}
          input {
            ${tw`rounded p-2 border border-[rgba(40,40,40,.3)]`}
          }
        }
      }
    }
    .medic {
      input {
        font-family: RufinaBold;
        ${tw`text-[15px] rounded p-1 border border-[rgba(40,40,40,.3)]`}
      }
    }
  }
`;

export { Main };
