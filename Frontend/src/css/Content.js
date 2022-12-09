import styled from "styled-components";
import tw from "twin.macro";
import {
  profile,
  record,
  overview,
  message,
  menu,
} from "../assets/svg/Content";
import {
  profileLight,
  recordLight,
  overviewLight,
  messageLight,
} from "../assets/svg/ContentLight";

const Sidebar = styled.section`
  ${tw`relative transition-all w-full bg-white max-w-[100px] h-screen sm:block md:max-w-[200px] `}
  
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
    ${tw`transition-all w-full h-[60px] p-0 flex items-center justify-center  mb-[8px]`}
    a {
      ${tw`no-underline relative cursor-pointer w-auto h-auto p-2 flex items-center justify-center  rounded-lg text-[rgba(64,64,64,.76)] md:p-3 md:h-[50px] md:w-[150px] md:pl-5 md:justify-start hover:bg-[#FBFBFB]`}
      div {
        ${tw`p-0 m-0 static  w-[25px] h-[25px] rounded-none hover:bg-transparent md:absolute md:left-[15px] md:top-[calc(50% - 12.5px)]`}
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
      }
      .overview {
        background-image: url(${overview});
      }
      .profile {
        background-image: url(${profile});
      }
      .message {
        background-image: url(${message});
      }
      .record {
        background-image: url(${record});
      }
      p {
        ${tw`text-[20px] hidden md:block md:ml-[32px]`}
      }
    }
  }
  ul {
    .active-ul {
      ${tw`bg-[#0C0B19] text-white hover:bg-[#0C0B19]`}
      div {
        ${tw`hover:bg-transparent`}
      }
      .overview {
        background-image: url(${overviewLight});
      }
      .profile {
        background-image: url(${profileLight});
      }
      .message {
        background-image: url(${messageLight});
      }
      .record {
        background-image: url(${recordLight});
      }
    }
  }
  .sidebar-out {
    ${tw`hidden`}
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
  ${tw`relative overflow-y-scroll h-screen w-full sm:w-[calc(100vw - 100px)] md:w-[calc(100vw - 200px)]`}
  .menu {
    ${tw`absolute top-[3%] left-[16px] w-[30px] h-[30px]`}
    img {
      ${tw`w-full h-full`}
    }
  }
`;

const Main = styled.main`
  ${tw`relative h-screen max-w-[1440px] flex  items-center justify-center  bg-[#F9F9F9]`}
  .active-full {
    ${tw`w-full`}
  }
  .doctors-popup {
    ${tw`hidden absolute overflow-x-scroll pt-[60px] z-20 flex items-center justify-start w-screen min-h-screen bg-[rgba(40,40,40,.65)] top-0 left-0 sm:pt-[100px] lg:justify-center`}
    *::-webkit-scrollbar-thumb {
      background-color: white;
    }
    .cancel-popup {
      ${tw`w-[20px] absolute top-[40px] left-[50%]`}
    }
  }
  .active-popup {
    ${tw`flex z-40`}
  }
  .loading-states {
    ${tw`w-full h-screen m-0 p-0 flex items-center justify-center `}
    img {
      ${tw`animate-spin w-[50px] h-[50px] md:w-[80px] md:h-[80px]`}
    }
  }
`;

export {Main, Sidebar, Body}