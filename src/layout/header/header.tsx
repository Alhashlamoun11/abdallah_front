'use client'
import React,{useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import menu_data from "@/data/menu-data";
import logo from '@/assets/img/logo/logo.png';
import useSticky from "@/hooks/use-sticky";
import {usePathname} from 'next/navigation'
import SearchPopup from "@/app/components/common/search-popup";
import OffCanvas from "@/app/components/common/off-canvas";
import MobileOffCanvas from "@/app/components/common/mobile-offcanvas";
import SvgIconCom from "@/app/components/common/svg-icon-anim";
import shape from '@/assets/img/icons/shape02.svg'
import { signIn, useSession } from 'next-auth/react';
import { signout } from "@/hooks/auth";

const Header = ({style_2=false}:{style_2?:boolean}) => {
  const [user,setUser]=useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage here
      setUser(JSON.parse(localStorage.getItem('user')!))
    }
  }, []);
  console.log(user)
  const clientId = "1202268878965571604";
  const redirectUri = "https://abdallahfront-production.up.railway.app/api/auth/callback";
  const handleDiscordSignIn = () => {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
  };

  const {sticky,isStickyVisible} = useSticky();
  const pathname = usePathname();
  const [isSearchOpen,setIsSearchOpen] = useState<boolean>(false);
  const [isOffCanvasOpen,setIsOffCanvasOpen] = useState<boolean>(false);
  const [openMobileOffCanvas,setOpenMobileOffCanvas] = useState<boolean>(false);
  // handle open search
  const handleOpenSearch = (audioPath: string) => {
    setIsSearchOpen(true)
    const audio = new Audio(audioPath);
    audio.play();
  };

  const handleLogOut=()=>{
    signout()
  }
  // handle open offcanvas
  const handleOpenOffCanvas = (audioPath: string) => {
    setIsOffCanvasOpen(true)
    const audio = new Audio(audioPath);
    audio.play();
  };
  // handle open search
  const handleOpenMobileOffCanvas = (audioPath: string) => {
    setOpenMobileOffCanvas(true)
    const audio = new Audio(audioPath);
    audio.play();
  };
  return (
    <header>
      <div id="sticky-header" className={`tg-header__area transparent-header ${sticky?'tg-sticky-menu':''} ${isStickyVisible?'sticky-menu__show':''}`}>
        <div className="container custom-container">
          <div className="row">
            <div className="col-12">
              <div className="mobile-nav-toggler" onClick={() => handleOpenMobileOffCanvas('/assets/audio/click.wav')} >
                <i className="fas fa-bars"></i>
              </div>
              <div className="tgmenu__wrap">
                <nav className="tgmenu__nav">
                  <div className="logo">
                    <Link href="/">
                      <Image src={logo} alt="Logo" style={{height:'auto'}} />
                    </Link>
                  </div>
                  <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                    <ul className="navigation">
                      {menu_data.map((menu) =>
                        menu.sub_menu ? (
                          <li
                            key={menu.id}
                            className={`menu-item ${menu.sub_menu && menu.sub_menu.some(sub => pathname === sub.link) ? 'menu-item-has-children active' : ''}`}
                          >
                            <Link href="#">{menu.title}</Link>
                            <ul className="sub-menu">
                              {menu.sub_menu.map((sub, i) => (
                                <li key={i} className={pathname === sub.link ? 'active' : ''}>
                                  <Link href={sub.link}>{sub.title}</Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={menu.id} className={pathname === menu.link ? 'active' : ''}>
                            <Link href={menu.link}>{menu.title}</Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div style={{width:'320px'}}  className="tgmenu__action d-none d-md-block">
                    <ul className="list-wrap">
                      <li className="search">
                        <a onClick={() => handleOpenSearch('/assets/audio/click.wav')} className="cursor-pointer">
                          <i className="flaticon-search-1"></i>
                        </a>
                      </li>
                     {user==null?( <li className="header-btn">
                        <a onClick={(handleDiscordSignIn)} className={`${style_2?'tg-btn-3 tg-svg':'tg-border-btn'}`}>
                          {style_2 && <SvgIconCom icon={shape} id="svg-2" />}
                          <i className="flaticon-edit"></i> ~sing in
                        </a>
                      </li>): 
                                        <div className="tgmenu__navbar-wrap">

                                          <ul className="navigation">
                                              <li
                                                className='menu-item menu-item-has-children'
                                              >
                                                <Link href="#">{user.username}</Link>
                                                <ul className="sub-menu">
                                                    <li className={pathname === "/PROFILE" ? 'active' : ''}>
                                                    <Link href='/profile'>PROFILE</Link>
                                                    </li>
                                                    <li>
                                                    <Link href='/my_team'>My Team</Link>
                                                    </li>
                                                    <li>
                                                    <a onClick={handleLogOut} href='#'>Logout</a>
                                                    </li>
                                                </ul>
                                              </li>
                                        </ul>
                                        </div>
                    
                      }
                      <li className="side-toggle-icon" onClick={()=> handleOpenOffCanvas('/assets/audio/click.wav')}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- header-search --> */}
      <SearchPopup setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
      {/* <!-- header-search-end --> */}

      {/* off canvas start */}
      <OffCanvas isOffCanvasOpen={isOffCanvasOpen} setIsOffCanvasOpen={setIsOffCanvasOpen} />
      {/* off canvas end */}

      {/*mobile off canvas start */}
      <MobileOffCanvas openMobileOffCanvas={openMobileOffCanvas} setOpenMobileOffCanvas={setOpenMobileOffCanvas} />
      {/*mobile off canvas end */}
    </header>
  );
};

export default Header;
