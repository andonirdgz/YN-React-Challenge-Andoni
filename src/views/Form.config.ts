import { object, string, array, boolean } from 'yup'

const IS_REQUIRED_MSG = 'This field is required'
const IS_NUMBER_MSG = 'This field must be a number'
const IS_EMAIL_MSG = 'This field must be a valid email'
const MIN_WORDS_MSG = (minWords: number) =>
    `At least ${minWords} words are required`
const MAX_WORDS_MSG = (maxLength: number) =>
    `At most ${maxLength} words are allowed`
const NAME_MIN_WORDS = 2
const NAME_MAX_WORDS = 4
const MIN_AGE_MSG = (minAge: number) => `Minimum age is ${minAge}`
const MAX_AGE_MSG = (maxAge: number) => `Maximum age is ${maxAge}`
const MIN_AGE = 18
const MAX_AGE = 99
const INTERESTS_SELECTED_MSG = 'At least one insterest must be selected.'

// TASK 1:
// - Implement additional validations for the age field. ✅
// - The minimum age should be 18 and the maximum age should be 99. ✅
// - Each validation should have a corresponding error message. ✅

export const validationSchema = object().shape({
    name: string()
        .required(IS_REQUIRED_MSG)
        .test('hasMaxWords', MAX_WORDS_MSG(NAME_MAX_WORDS), value => {
            const wordCount = (value?.match(/\S+/g) || []).length
            return wordCount <= NAME_MAX_WORDS
        })
        .test('hasMinWords', MIN_WORDS_MSG(NAME_MIN_WORDS), value => {
            const wordCount = (value?.match(/\S+/g) || []).length
            return wordCount >= NAME_MIN_WORDS
        }),
    mail: string().required(IS_REQUIRED_MSG).email(IS_EMAIL_MSG),
    age: string()
        .required(IS_REQUIRED_MSG)
        .test(
            'isNumber',
            IS_NUMBER_MSG,
            (value: string) => !isNaN(Number(value)),
        )
        .test(
            'hasMinAge',
            MIN_AGE_MSG(MIN_AGE),
            (value: string) => Number(value) >= MIN_AGE,
        )
        .test(
            'hasMaxAge',
            MAX_AGE_MSG(MAX_AGE),
            (value: string) => Number(value) <= MAX_AGE,
        ),
    // TASK 3:
    // - Implement a validation rule for the 'interests' field. ✅
    // - The validation should ensure that at least one option is selected. ✅
    // - If no option is selected, display an error message. ✅
    interests: array()
        .of(
            object().shape({
                id: string().required(),
                label: string().optional(),
                checked: boolean().optional(),
            }),
        )
        .test('atLeastOneIsChecked', INTERESTS_SELECTED_MSG, value =>
            value ? value.some(interest => interest.checked) : false,
        ),
})
