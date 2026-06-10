import Styled from 'styled-components';

const ListOrderFinish = Styled.nav`
  .waste-table {
    width: 100%;
    margin-top: 10px;
    .header,
    .row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 16px;
      align-items: center;
    }

    .header {
      font-weight: 600;
      padding-bottom: 12px;
      margin-bottom: 8px;
      border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
    }

    .row {
      padding: 12px 0;
      border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};

      &:last-child {
        border-bottom: none;
      }
    }

    .points,
    .weight {
      .error-text {
        font-size: 12px;
        color: #ff4d4f;
        line-height: 1.2;
      }
      
      .weight-edit {
        display: flex;
        flex-direction: column;
        gap: 4px;
    
      }

      .weight-edit input {
        width: 80px;
        text-align: center;
      }
    }
    .icon {
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 8px;

      .btn-icon {
        width: 28px;
        height: 28px;
        min-width: 28px;
        padding: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: gray;
      }
    }
  }
`;

export {
  ListOrderFinish,
};
