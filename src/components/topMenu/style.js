import Styled from 'styled-components';

const TopMenuStyle = Styled.div`
    .strikingDash-top-menu{
        ul{
            li{
                display: inline-block;
                position: relative;
                ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 14px;
                @media only screen and (max-width: 1024px){
                    ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 10px;
                }
                &:not(:last-child){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 34px;
                    @media only screen and (max-width: 1300px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
                    }
                    @media only screen and (max-width: 1199px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 26px;
                    }
                    @media only screen and (max-width: 1024px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
                    }
                }
                &.has-subMenu{
                    >a{
                        position: relative;
                        &:before{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: -14px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-family: "FontAwesome";
                            content: '\f107';
                            line-height: 1;
                            color: ${({ theme }) => theme['light-color']};
                        }
                        &.active{
                            &:before{
                                ${({ theme }) => (theme.darkMode ? `color: #fff;` : 'color: #5F63F2')};
                            }
                        }
                    }
                }
                &.has-subMenu-left{
                    >a{
                        position: relative;
                        &:before{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 30px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-family: "FontAwesome";
                            content: '\f105';
                            line-height: 1;
                            color: ${({ theme }) => theme['light-color']};
                        }
                    }
                }
                &:hover{
                    >.subMenu{
                        top: 64px;
                        opacity: 1;
                        visibility: visible;
                    }
                }
                a{
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                    ${({ theme }) => (theme.darkMode ? `color: #ffffff60;` : 'color: #5A5F7D')};
                    &.active{
                        ${({ theme }) => (theme.darkMode ? `color: #fff;` : 'color: #5F63F2')};
                    }
                    svg,
                    img,
                    i{
                        margin-right: 14px;
                        width: 16px;
                    }
                }
                >ul{
                    li{
                        display: block;
                        position: relative;
                        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 0;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0 !important;
                        a{
                            font-weight: 400;
                            padding: 0 30px;
                            line-height: 3;
                            color: #868EAE;
                            transition: .3s;
                            &:hover,
                            &.active{
                                color: ${({ theme }) => theme['primary-color']};
                                background-color: ${({ theme }) => theme['primary-color']}06;
                                ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 40px;
                            }
                        }
                        &:hover{
                            .subMenu{
                                top: 0;
                                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 250px;
                                @media only screen and (max-width: 1300px){
                                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 180px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .subMenu{
            width: 250px;
            background: #fff;
            border-radius: 6px;
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            top: 80px;
            padding: 12px 0;
            visibility: hidden;
            opacity: 0;
            transition: 0.3s;
            z-index: 98;
            box-shadow: 0px 15px 40px 0px rgba(82, 63, 105, 0.15);
            @media only screen and (max-width: 1300px){
                width: 180px;
            }
            .subMenu{
                width: 250px;
                background: #fff;
                position: absolute;
                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 250px;
                top: 0px;
                padding: 12px 0;
                visibility: hidden;
                opacity: 0;
                transition: 0.3s;
                z-index: 98;
                box-shadow: 0px 15px 40px 0px rgba(82, 63, 105, 0.15);
                @media only screen and (max-width: 1300px){
                    width: 200px;
                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 180px;
                }
            }
        }
    }
    // Mega Menu
    .strikingDash-top-menu{
        >ul{
            >li{
                &:hover{
                    .megaMenu-wrapper{
                        opacity: 1;
                        visibility: visible;
                        z-index: 99;
                    }
                }
                &.mega-item{
                    position: static;
                }
                .sDash_menu-item-icon{
                    line-height: .6;
                }
                .megaMenu-wrapper{
                    display: flex;
                    position: absolute;
                    text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')}
                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
                    top: 100%;
                    overflow: hidden;
                    z-index: -1;
                    padding: 16px 0;
                    box-shadow: 0px 15px 40px 0px rgba(82, 63, 105, 0.15);
                    border-radius: 0 0 6px 6px;
                    opacity: 0;
                    visibility: hidden;
                    transition: .4s;
                    background-color: #fff;
                    &.megaMenu-small{
                        width: 590px;
                        >li{
                            flex: 0 0 33.3333%;
                        }
                        ul{
                            li{
                                >a{
                                    padding: 0 45px;
                                    position: relative
                                    &:after{
                                        width: 5px;
                                        height: 5px;
                                        border-radius: 50%;
                                        position: absolute;
                                        ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 30px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        background-color: #C6D0DC;
                                        content: '';
                                        transition: .3s;
                                    }
                                    &:hover,
                                    &.active{
                                        ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 45px;
                                        color: ${({ theme }) => theme['primary-color']};
                                        &:after{
                                            background-color: ${({ theme }) => theme['primary-color']};;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &.megaMenu-wide{
                        width: 1000px;
                        padding: 5px 0 18px;
                        @media only screen and (max-width: 1300px){
                            width: 800px;
                        }
                        >li{
                            position: relative;
                            flex: 0 0 25%;
                            .mega-title{
                                position: relative;
                                font-size: 14px;
                                font-weight: 500;
                                padding-left: 45px;
                                ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 45px;
                                color: ${({ theme }) => theme['dark-color']};
                                &:after{
                                    position: absolute;
                                    height: 5px;
                                    width: 5px;
                                    border-radius: 50%;
                                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 30px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background-color: #C6D0DC;
                                    content: '';
                                }
                            }
                        }
                    }
                    ul{
                        li{
                            position: relative;
                            &:hover{
                                >a{
                                    padding-left: 45px;
                                }
                                &:after{
                                    opacity: 1;
                                    visibility: visible;
                                }
                            }
                            >a{
                                line-height: 3;
                                color: #868EAE;
                                font-weight: 400;
                                transition: .3s;
                            }
                            
                            &:after{
                                width: 6px;
                                height: 1px;
                                border-radius: 50%;
                                position: absolute;
                                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 30px;
                                top: 50%;
                                transform: translateY(-50%);
                                background-color: ${({ theme }) => theme['light-color']};
                                content: '';
                                transition: .3s;
                                opacity: 0;
                                visibility: hidden;
                            }
                        }
                    }
                }
            }
        }
    }
`;

export { TopMenuStyle };
