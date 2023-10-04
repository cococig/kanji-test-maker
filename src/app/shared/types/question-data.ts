export type AllQuestionData = {
	questions: SingleQuestionData[];
};

export type SingleQuestionData = {
	fullText: string;
	targetKanji: string;
	yomigana: string;
	questionType: "yomi" | "kaki";
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isAllQuestionData(data: any): data is AllQuestionData {
	if (typeof data !== "object" || data === null) {
		return false;
	}

	if (!Array.isArray(data.questions)) {
		return false;
	}

	for (const question of data.questions) {
		if (!isSingleQuestionData(question)) {
			return false;
		}
	}

	return true;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isSingleQuestionData(data: any): data is SingleQuestionData {
	if (typeof data !== "object" || data === null) {
		return false;
	}

	if (
		typeof data.fullText !== "string" ||
		typeof data.targetKanji !== "string" ||
		typeof data.yomigana !== "string" ||
		(data.questionType !== "yomi" && data.questionType !== "kaki")
	) {
		return false;
	}

	return true;
}
