const Icon = ({
  name,
  width = 26,
  height = 26,
}: {
  name: "user" | "company" | "boat";
  width?: number;
  height?: number;
}) => {
  // Definir os ícones
  const icons = {
    user: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 23.354C22.075 23.354 20.488 22.7295 19.239 21.4805C17.99 20.2311 17.3655 18.6408 17.3655 16.7095C17.3655 14.7781 17.99 13.1911 19.239 11.9485C20.488 10.7058 22.075 10.0845 24 10.0845C25.925 10.0845 27.512 10.7058 28.761 11.9485C30.01 13.1911 30.6345 14.7781 30.6345 16.7095C30.6345 18.6408 30.01 20.2311 28.761 21.4805C27.512 22.7295 25.925 23.354 24 23.354ZM9 38.6155V34.819C9 33.7446 9.28467 32.8088 9.854 32.0115C10.4233 31.2141 11.163 30.6013 12.073 30.173C14.1783 29.2373 16.2077 28.5321 18.161 28.0575C20.1143 27.5831 22.0605 27.346 23.9995 27.346C25.9382 27.346 27.8793 27.5883 29.823 28.073C31.7667 28.5576 33.7868 29.2621 35.8835 30.1865C36.8295 30.6138 37.5853 31.2241 38.151 32.0175C38.717 32.8108 39 33.7446 39 34.819V38.6155H9ZM11.2695 36.346H36.7305V34.819C36.7305 34.2986 36.5658 33.8 36.2365 33.323C35.9072 32.846 35.477 32.4716 34.946 32.2C32.9793 31.2436 31.1243 30.5738 29.381 30.1905C27.6377 29.8071 25.844 29.6155 24 29.6155C22.156 29.6155 20.3488 29.8071 18.5785 30.1905C16.8082 30.5738 14.9563 31.2436 13.023 32.2C12.4923 32.4716 12.0673 32.846 11.748 33.323C11.429 33.8 11.2695 34.2986 11.2695 34.819V36.346ZM24 21.0845C25.2487 21.0845 26.2883 20.6691 27.119 19.8385C27.95 19.0078 28.3655 17.9681 28.3655 16.7195C28.3655 15.4705 27.95 14.4306 27.119 13.6C26.2883 12.7693 25.2487 12.354 24 12.354C22.7513 12.354 21.7117 12.7693 20.881 13.6C20.05 14.4306 19.6345 15.4705 19.6345 16.7195C19.6345 17.9681 20.05 19.0078 20.881 19.8385C21.7117 20.6691 22.7513 21.0845 24 21.0845Z"
          fill="currentColor"
        />
      </svg>
    ),
    // Aqui você pode adicionar outros ícones com suas respectivas definições SVG
    company: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.85 16.927H37.6575V14.1195H34.85V16.927ZM34.85 25.323H37.6575V22.5155H34.85V25.323ZM34.85 33.6885H37.6575V30.881H34.85V33.6885ZM31.569 41V38.7305H42.7305V9.2695H22.846V14.9075L20.577 13.327V7H45V41H31.569ZM3 41V22.8655L15.6655 13.8195L28.3 22.859V41H18.4115V31.469H12.919V41H3ZM5.2695 38.7305H10.65V29.2H20.6805V38.7305H26.031V24.031L15.6655 16.654L5.2695 24.057V38.7305Z"
          fill="currentColor"
        />
      </svg>
    ),
    boat: (
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5885 36.9615L5.331 25.381C5.22333 25.0194 5.24833 24.666 5.406 24.321C5.56367 23.9764 5.81033 23.7502 6.146 23.6425L9 22.6615V12.2695C9 11.4619 9.27883 10.7842 9.8365 10.2365C10.3942 9.68919 11.0768 9.40519 11.8845 9.38452H19.3655V3.38452H28.6345V9.38452H36.1155C36.9148 9.38452 37.5953 9.66552 38.157 10.2275C38.719 10.7895 39 11.4702 39 12.2695V22.6925L41.8845 23.6425C42.2128 23.7502 42.4687 23.968 42.652 24.296C42.8353 24.6244 42.8667 24.9757 42.746 25.35L39.4115 36.9615C38.0165 36.6539 36.7315 36.1097 35.5565 35.329C34.3812 34.548 33.206 33.5307 32.031 32.277C30.913 33.5924 29.7027 34.7084 28.4 35.625C27.0977 36.5417 25.631 37 24 37C22.369 37 20.9023 36.5417 19.6 35.625C18.2973 34.7084 17.087 33.5924 15.969 32.277C14.8067 33.5307 13.6347 34.548 12.453 35.329C11.2717 36.1097 9.9835 36.6539 8.5885 36.9615ZM4.5 45V42.7305H8C9.4 42.7305 10.7833 42.5124 12.15 42.076C13.5167 41.6394 14.8 41.0179 16 40.2115C17.2 41.0242 18.4833 41.6305 19.85 42.0305C21.2167 42.4305 22.6 42.6305 24 42.6305C25.4 42.6305 26.7833 42.4305 28.15 42.0305C29.5167 41.6305 30.8 41.0242 32 40.2115C33.2 41.0242 34.4833 41.6472 35.85 42.0805C37.2167 42.5139 38.6 42.7305 40 42.7305H43.5V45H40C38.6207 45 37.2643 44.8282 35.931 44.4845C34.5977 44.1409 33.2873 43.6357 32 42.969C30.7127 43.6357 29.3857 44.1409 28.019 44.4845C26.6523 44.8282 25.3127 45 24 45C22.6873 45 21.3477 44.8282 19.981 44.4845C18.6143 44.1409 17.2873 43.6357 16 42.969C14.7127 43.6357 13.4045 44.1409 12.0755 44.4845C10.7462 44.8282 9.38367 45 7.988 45H4.5ZM11.2695 21.923L24 17.8L36.7305 21.954V12.2695C36.7305 12.0899 36.6728 11.9424 36.5575 11.827C36.4422 11.7117 36.2948 11.654 36.1155 11.654H11.8845C11.7052 11.654 11.5578 11.7117 11.4425 11.827C11.3272 11.9424 11.2695 12.0899 11.2695 12.2695V21.923ZM23.9845 34.7305C25.6565 34.7305 27.1207 34.089 28.377 32.806C29.6333 31.5227 30.841 30.1887 32 28.804C33.0257 30.0347 33.9892 31.0802 34.8905 31.9405C35.7918 32.8005 36.7912 33.5422 37.8885 34.1655L40.3425 25.523L24 20.2L7.627 25.523L10.1115 34.104C11.1885 33.5217 12.1878 32.8037 13.1095 31.95C14.0315 31.096 14.995 30.0474 16 28.804C17.1797 30.209 18.3873 31.548 19.623 32.821C20.859 34.094 22.3128 34.7305 23.9845 34.7305Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  // Renderiza o ícone com base no nome
  return icons[name] || null;
};

export default Icon;