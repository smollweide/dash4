/// <reference types="@types/jest" />
import { transformEmojis } from './transform-emojis';

describe('transformEmojis', () => {
	test('exists', () => {
		expect(typeof transformEmojis).toBe('function');
	});
	test('default', async () => {
		const result = transformEmojis(`# Emojis
computer: :computer:
pencil: :pencil:
star: :star:`);
		expect(result).toBe(`# Emojis
computer: 💻
pencil: 📝
star: ⭐`);
	});
});
