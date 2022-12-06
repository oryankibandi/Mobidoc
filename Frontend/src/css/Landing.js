import styled from 'styled-components';
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
const Body = styled.main`
  ${tw`w-screen transition-all relative h-screen flex flex-col items-center`}
  .dropdown-div {
    ${tw`absolute top-0 left-0 h-screen w-screen bg-black-dark`}
  }
`;
export { MainSection, SubSection, Button, Img, Nav, Body };