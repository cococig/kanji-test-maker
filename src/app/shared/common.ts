/**
 * 現在の日時をyyyymmddHHMMSS形式で返す関数
 * @returns yyyymmddHHMMSSの文字列表現
 */
export function getCurrentDateTimeString(): string {
	const now = new Date();
	// 年、月、日、時、分、秒を取得
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため+1する
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");
	return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
