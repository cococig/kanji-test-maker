import { Global } from "@emotion/react";

const Fonts = () => (
    <Global
        styles={`
            /* noto-serif-jp-regular - latin_japanese */
            @font-face {
            font-family: 'Noto Serif JP';
            font-style: normal;
            font-weight: 400;
            src: local(''),
                url('%PUBLIC_URL%/noto-serif-jp-v20-latin_japanese-regular.woff2') format('woff2'), /* Super Modern Browsers */
        }
        `}
    />
);

export default Fonts;