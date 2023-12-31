export type AllQuestionData = {
	questions: SingleQuestionData[];
};

export type SingleQuestionData = {
	fullText: string;
	targetKanji: string;
	yomigana: string;
	questionType: "yomi" | "kaki";
};

export function isAllQuestionData(data: unknown): data is AllQuestionData {
	if (typeof data !== "object" || data == null) {
		return false;
	}

	if (!Array.isArray((data as AllQuestionData).questions)) {
		return false;
	}

	for (const question of (data as AllQuestionData).questions) {
		if (!isSingleQuestionData(question)) {
			return false;
		}
	}

	return true;
}

export function isSingleQuestionData(
	data: unknown,
): data is SingleQuestionData {
	if (typeof data !== "object" || data == null) {
		return false;
	}

	const tmpData = data as SingleQuestionData;

	if (
		typeof tmpData.fullText !== "string" ||
		typeof tmpData.targetKanji !== "string" ||
		typeof tmpData.yomigana !== "string" ||
		(tmpData.questionType !== "yomi" && tmpData.questionType !== "kaki")
	) {
		return false;
	}

	return true;
}
