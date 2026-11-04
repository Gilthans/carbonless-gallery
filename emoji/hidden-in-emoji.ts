// Emoji whose change is an invisible character.

// 1. A redundant VS16 (U+FE0F) after an emoji that is already an emoji.
export const smile = "😀";

// 2. A ZWJ (U+200D) between two emoji that make no known sequence.
export const pets = "🐶🐱";

// 3. Control: a ZWJ that does make a known sequence (one family glyph).
export const family = "👨👩👧";

// 4. Control: VS16 that turns a text heart into an emoji heart.
export const love = "❤";

// 5. A visible change beside an invisible one on the same line.
export const party = ["🎉", "todo"];
