import type { Color } from 'sveltestrap/src/shared';
import * as yup from 'yup';

export function requiredString() {
	return yup.string().required('This field is required');
}

export function requiredEmail() {
	return requiredString().email('Must be a valid email');
}

export function minLengthMessage(min: number) {
	return `Must have at least ${min} characters`;
}

export function maxLengthMessage(max: number) {
	return `Must have at most ${max} characters`;
}

export interface IFeedback {
	type: Color;
	message: string;
}
