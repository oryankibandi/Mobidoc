import styled,{css} from 'styled-components';
import tw from 'twin.macro'
import curve from "../assets/svg/curve.svg";


const MainSection = styled.section`
  ${tw`w-full relative max-w-[1440px] max-h-[800px] bg-blue-dark flex flex-col-reverse justify-between items-center sm:flex-row`}
  font-family:RufinaRegular;
  height: calc(100%);
  .image{
    //h-[609px] w-[632px]
    ${tw`h-full w-[45%] relative hidden items-center justify-center md:w-1/2 sm:flex`}
    background-image:url(${curve});
    background-repeat: no-repeat;
    background-position: center right;
    background-size: contain;
  }
`;
const SubSection = styled.section`
  ${tw`w-full text-[40px] h-full text-white flex flex-col items-center justify-center sm:w-1/2`}
  p {
    ${tw`w-full px-8 text-[.6em] sm:px-4 sm:text-[.4em] md:text-[.6em] md:px-10 lg:text-[.7em]`}
  }
`;
const Button = styled.button`
  ${tw`py-2 px-3 mt-6 cursor-pointer bg-black-dark text-[.3em] md:py-3 md:px-4 md:text-[.4em] text-white rounded-lg border-none hover:!scale-125`}
}
  `;
const Img = styled.img`
  ${tw`top-[25%] left-[20%] translate-y-[-50%] translate-x-[-50%] absolute h-[60%] w-[65%] border-2 border-black-dark lg:top-[32%]`}
`;
const Nav = styled.nav`
  ${tw`w-screen h-[90px] max-w-[1440px] absolute top-0 left-0 pl-5 pr-6 flex items-center justify-between text-white z-10 md:pl-10 md:pr-12 lg:pl-20 lg:pr-24`}
  font-family:OswaldBold;
  a {
    text-decoration: none;
    ${tw`text-white`}
  }
  li {
    ${tw`hidden w-auto sm:flex md:w-[400px]`}
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    a {
      text-decoration: none;
      ${tw`text-white hover:text-[#000]`}
    }
  }
  ul {
    cursor: pointer;
  }
  ul:hover {
    color: black;
  }
  button {
    ${tw`hidden sm:block`}
    font-family: OswaldBold;
    cursor: pointer;
    ${tw`px-3 py-2 text-black-dark bg-white border-none rounded-xl`}
  }
  header {
    ${tw`text-[25px] uppercase md:text-[30px]`}
    font-family:Impact;
  }
  .dropdown {
    ${tw`block sm:hidden`}
    ${tw`w-[20px] h-[20px]`}
    img {
      fill: white;
    }
  }
`;
const Preview = styled.section`
  ${tw`w-full max-w-[1440px] pb-[100px]`}
  .video {
    ${tw`w-full mx-auto mt-[100px] max-w-[1000px] h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] justify-self-center flex items-center justify-center px-8`}
    .video-here {
      ${tw`mt-[30px]`}
      iframe {
        ${tw`rounded-lg`}
      }
    }
  }
`;
const MainFaq = styled.section`
  ${tw`w-full max-w-[1440px] pb-[100px]`}
  .faq {
    ${tw`w-full mt-[100px] px-4`}
    .single-faq {
      ${tw`w-full flex flex-col items-center justify-between px-3 md:px-6  mb-4 rounded-lg  max-w-[650px] border-solid border border-[#46C882] mx-auto`}
      >div {
        ${tw`w-full`}
        font-family:RufinaBold;
      }
      .title-faq {
        ${tw`flex items-center justify-between`}
        p {
          ${tw`text-[13px] text-[rgba(0,0,0,.9)] sm:text-[15px] md:text-[20px]`}
        }
        img {
          ${tw`w-[15px] md:w-[20px]`}
        }
      }
      .body-faq {
        ${tw`text-[13px] py-4 pt-1 hidden text-[#404040] sm:text-[15px] md:text-[20px]`}
        p {
          ${tw`p-0 m-0`}
          font-family:RufinaRegular;
        }
      }
      .body-active {
        ${tw`block`}
      }
    }
  }
`;
const Services = styled.section`
${tw`max-w-[1440px] min-h-[500px] m-0 pb-[100px]`}
.services{
  ${tw`w-full min-h-[400px] p-2 mt-[100px] text-[#404040] flex flex-col items-center justify-center space-y-8 md:space-y-0 mb-8 md:mb-0 md:justify-evenly md:flex-row`}
  .service-card {
    ${tw`w-full max-w-[250px] flex flex-col items-center justify-center space-y-4`}

    .icon {
      ${tw`w-[60px] h-[60px] rounded-[60px] flex items-center justify-center text-white bg-[#06B6D4] `}
      .icon-inner {
        ${tw`w-[25px] h-[25px]`}
      }
    }
    .body {
      ${tw`flex flex-col items-center space-y-2`}
      p {
        ${tw`p-0 m-0`}
        font-family:RufinaBold;
      }
      .body-title {
        ${tw`text-xl`}
        font-family: OswaldBold;
      }
    }
  }
}
`;
const ShortSection = styled.section`
  ${tw`max-w-[1440px]  min-h-[500px] w-full flex flex-col items-center justify-start`}
  .title {
    ${tw`w-full text-[#000] text-[20px] my-4 md:m-0 lg:text-[25px] underline flex items-center justify-center h-[100px]`}
    font-family:OswaldBold;
  }
  .links {
    ${tw`flex flex-col w-full  pb-[100px] items-center justify-evenly md:flex-row md:p-0`}
    .individial {
      ${tw`h-[200px] transition ease-in-out mt-[50px] w-full max-w-[250px]  border-solid border border-[rgba(40,40,40,.06)] flex flex-col items-start pt-6 justify-start rounded-lg bg-white`}
      box-shadow:0px 1px 5px 0px rgba(40,40,40,.03);
      font-family: RufinaBold;
      :hover {
        box-shadow:0px 3px 5px 1px rgba(40,40,40,.07);
      }
      p {
        ${tw`mx-auto mt-8`}
      }
      .socials {
        ${tw`w-full flex mt-8 items-center space-x-4 justify-center`}
        a {
          ${tw`no-underline text-[#404040]`}
          .link {
            ${tw`w-[30px] h-[30px]`}
          }
        }
        a:active,
        a:hover {
          ${tw`text-[#000]`}
        }
      }
    }
  }
`;
const AnotherSection = styled.section`
  ${tw` max-w-[1440px] w-full flex flex-col items-center justify-start pb-[100px] lg:justify-between`}
  .title {
    ${tw`w-full text-[#000] text-[20px] mb-[100px] my-4 md:m-0 lg:text-[25px] underline flex items-center justify-center h-[100px]`}
    font-family:OswaldBold;
  }
  .details {
    ${tw`w-full max-w-[1200px] flex flex-col-reverse md:flex-row-reverse items-center justify-between px-8 min-h-min md:min-h-[500px]`}
    p {
      ${tw`w-full max-w-[600px] md:max-w-[450px] lg:max-w-[550px] text-[#404040] text-[16px] lg:text-[20px]`}
      font-family:RufinaBold;
    }
    img {
      ${tw`min-w-[300px] w-[70%] md:max-w-[400px] lg:max-w-[500px] m-0 my-4 md:mr-6`}
    }
  }
  
  

`;
const Footer = styled.footer`
  ${tw`max-w-[1440px] min-h-[400px] w-full flex flex-col justify-between`}
  background:linear-gradient(to bottom, #2DB094, #0EA5E9);
  .body {
    font-family: RufinaRegular;
    ${tw`w-full min-h-[300px] text-white flex flex-col space-x-0 space-y-6 items-center md:items-start pt-[80px] md:space-y-0 justify-center md:flex-row md:space-x-[7%]`}
    > div {
      ${tw`min-w-[200px]`}
      header {
        ${tw`text-[27px] lg:text-[34px]`}
        font-family: RufinaBold;
      }
    }
    .details {
      ${tw`flex flex-col items-start justify-center`}
      ul {
        ${tw`p-0 px-3 w-full mr-auto flex flex-col items-start justify-center space-y-3`}
        list-style:none;
      }
      li {
        ${tw`text-[18px]`}
      }
      a {
        ${tw`no-underline text-white hover:underline`}
      }
    }
    .input-newsletter {
      ${tw`mt-3 flex justify-around mb-8 md:mb-0`}

      input[type= "email"] {
        ${tw` w-[150px] border p-2 border border-solid border-[#7AD8A4] md:w-full`}
        border-right:none;
      }
      input[type="submit"] {
        ${tw`bg-[#000] text-white`}
        border:none;
      }
    }
  }
  .footer {
    ${tw`mx-auto`} 
  }
`;
const Body = styled.main`
  ${tw`w-screen transition-all relative h-screen`}
  .dropdown-div {
    ${tw`hidden transition-all ease-in-out absolute top-0 left-0 h-screen w-screen bg-[#06B6D4] flex flex-col space-y-4 z-40`}
    >div {
      ${tw`w-full flex items-center p-2 justify-end pr-3`}
      .times {
        ${tw`w-[22px] h-[22px] text-white hover:text-[#404040]`}
      }
    }
    ul {
      list-style: none;
      ${tw`flex flex-col items-center space-y-2 p-0`}
      a {
        ${tw`w-full no-underline p-0 m-0 text-white hover:text-[#000]`}
        li {
          list-style: none;
          ${tw`w-full text-start p-4 pl-8 hover:bg-white text-[20px] `}
        }
      }
    }
  }
  > section {
    ${tw`mx-auto xl:border-y-0 xl:border-x xl:border-solid xl:border-[#000]`}
    .title {
      ${tw`w-full text-[#000] text-[20px] my-4 md:m-0 lg:text-[25px] underline flex items-center justify-center h-[100px]`}
      font-family:OswaldBold;
    }
  }
  footer {
    ${tw`mx-auto`}
  }
  .active-dropdown{
    display: flex;
  }
  .no-flex {
    ${tw`justify-start`}
  }
`;
export {
  MainSection,
  Footer,
  SubSection,
  Button,
  Img,
  Nav,
  Body,
  AnotherSection,
  ShortSection,
  Services,
  MainFaq,
  Preview,
};