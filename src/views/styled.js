import Styled from 'styled-components';

const CardToolbox = Styled.div`
    .ant-page-header-heading{
        @media only screen and (max-width: 991px){
            flex-flow: column;
            align-items: center;
        }
    }

    .ant-page-header-heading-left{
        @media only screen and (max-width: 575px){
            flex-flow: column;
        }
        @media only screen and (max-width: 800px){
            max-width: 100%;
        }
        .ant-page-header-back{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
            }
        }
        .ant-page-header-heading-title{
            @media only screen and (max-width: 575px){
                margin: 10px 0 8px;
                padding: 0;
            }
            &:after{
                @media only screen and (max-width: 575px){
                    display: none;
                }
            }
        }
        .ant-page-header-heading-sub-title{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
                flex-flow: column;
            }
            .title-counter{
                @media only screen and (max-width: 575px){
                    margin-bottom: 16px;
                }
            }
        }
    }

    .ant-page-header-heading-title{
        position: relative;
        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 24px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 24px;
        @media only screen and (max-width: 767px){
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 12px;
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px !important;
        }
        &:after{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0px;
            top: 0;
            height: 100%;
            width: 1px;
            content: '';
            background: ${({ theme }) => theme['border-color-normal']};
        }
    }
    .ant-page-header-heading-sub-title{
        font-weight: 500;
        display: flex;
        align-items: center;
    }
    .ant-select{
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 25px;
        @media only screen and (max-width: 575px){
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        .ant-select-selector{
            height: 46px !important;
            min-width: 350px;
            @media only screen and (max-width: 991px){
                min-width: 100%;
            }
        }
        .ant-select-selection-search-input{
            height: 46px;
            border-radius: 23px;
            border: 0 none;
            box-shadow: 0 5px 20px #9299B803;
            input{
                height: 46px !important;
                font-size: 14px;
            }
        }
    }
    .btn-add_new{
        border-radius: 6px;
        height: 40px;
        padding: 0 14px;
        font-size: 12px;
        @media only screen and (max-width: 991px){
            margin-top: 10px;
        }
        a{
            display: flex;
            align-items: center;
            svg{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
            }
        }
    }
`;

const UserCardTop = Styled.div`
  .ant-page-header-heading-extra{
    .btn-add_new{
      margin-right: 15px;
      @media only screen and (max-width: 575px){
        margin-right: 6px;
      }
    }
    .action-btn{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      color: ${({ theme }) => theme['light-color']};
      @media only screen and (max-width: 575px){
        height: 30px;
        width: 30px;
      }
      &.active{
        background-color: #fff;
        color: ${({ theme }) => theme['primary-color']};
      }
    }
  }
`;

export {
  CardToolbox,
  UserCardTop
};
