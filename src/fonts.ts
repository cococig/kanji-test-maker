export const FontList = {
  default: "游明朝",
  notoSerif: "Noto+Serif+JP",
};

export const getGoogleFont = async (fontFamilyName: string, text: string) => {
  const family = fontFamilyName.replace(/ /g, "+");
  const googleApiUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text,
  )}`;
  const response = await fetch(googleApiUrl);
  if (response.ok) {
    const css = await response.text();
    const match = css.match(/url\(.+?\)/g);
    if (!match) throw new Error(`フォントが見つかりませんでした: ${fontFamilyName},${css}`);
    for (const url of match) {
      const font = new FontFace(family, url);
      const f = await font.load();
      document.fonts.add(f);
    }
    return true;
  }
  throw new Error(
    `フォントがダウンロード出来ませんでした： ${fontFamilyName},${googleApiUrl},\n${response.statusText}`,
  );
};
