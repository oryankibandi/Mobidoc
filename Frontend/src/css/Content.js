import styled from "styled-components";
import tw from "twin.macro";

const Sidebar = styled.section`
  ${tw`relative hidden w-full bg-white max-w-[100px] h-screen sm:block md:max-w-[250px]`}
  header {
    ${tw`w-full text-center uppercase p-4 pt-6 text-[18px] md:text-[25px]`}
    font-family:Impact;
  }
  li {
    ${tw`flex flex-col mt-6 items-center`}
    list-style:none;
    font-family: RufinaBold;
  }
  ul {
    ${tw`cursor-pointer w-auto h-auto p-3 flex items-center justify-center text-[rgba(64,64,64,.76)] mb-[8px] rounded-xl md:h-[50px] md:w-[180px] md:rounded-lg md:pl-5 md:justify-start hover:bg-[#FBFBFB]`}
    img {
      ${tw`w-[25px] w-[25px] md:mr-4`}
    }
    p {
      ${tw`text-[20px] hidden md:block`}
    }
  }
  .active-ul {
    ${tw`bg-[#0C0B19] text-white hover:bg-[#0C0B19]`}
  }
  div {
    font-family: RufinaBold;
    ${tw`absolute cursor-pointer left-[calc(50% - 25px)] bottom-[20px] w-[50px] h-[50px] text-[#06B6D4] flex items-center justify-center  mb-[8px] rounded-xl md:rounded-lg md:left-[calc(50% - 80px)] md:h-[50px] md:w-[180px] md:pl-5 md:justify-start hover:bg-[#F6FBFB]`}
    img {
      ${tw`w-[25px] w-[25px] md:mr-4`}
    }
    p {
      ${tw`text-[20px] hidden md:block`}
    }
  }
`;
const Body = styled.section`
  ${tw`relative overflow-y-scroll h-screen w-full sm:w-[calc(100vw - 100px)] md:w-[calc(100vw - 250px)]`}
  .menu{
    ${tw`absolute top-[3%] left-[16px] w-[30px] h-[30px]`}
    img{
      ${tw`w-full h-full`}
    }
  }
`;

const Main = styled.main`
  ${tw`relative h-screen max-w-[1440px] flex  items-center justify-center  bg-[#F9F9F9]`}
  .doctors-popup {
    ${tw`hidden absolute overflow-x-scroll pt-[100px] z-20 flex items-start justify-center w-full h-full bg-[rgba(40,40,40,.65)] top-0 left-0`}
    *::-webkit-scrollbar-thumb {
      background-color: white;
    }
    .cancel-popup {
      ${tw`w-[20px] absolute top-[40px] left-[50%]`}
    }
  }
  .active-popup {
    ${tw`flex`}
  }
`;

export {Main, Sidebar, Body}