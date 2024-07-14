import { InferType, ValidationError } from 'yup'

import { validationSchema } from '../../views/Form.config'

type SchemaType = InferType<typeof validationSchema>

async function validateAndExpectError(
    invalidData: SchemaType,
    expectsTo: (errors: string[]) => void,
): Promise<void> {
    try {
        await validationSchema.validate(invalidData, { abortEarly: false })
    } catch (err) {
        if (err instanceof ValidationError) {
            return expectsTo(err.errors)
        }

        throw err
    }
}

function normalizeErrorMessagesWithNumbers(errors: string[]): string[] {
    return errors.map(error => error.replace(/[0-9]+/, 'n'))
}

const VALID_NAME = 'Test 1'
const VALID_MAIL = 'test@test.com'
const VALID_AGE = '25'
const VALID_INTERESTS = [{ id: '0', label: 'React', checked: true }]

describe('views/Form.config', () => {
    describe('validationSchema', () => {
        it('should pass if all fields are valid', async () => {
            const validData = {
                name: VALID_NAME,
                mail: VALID_MAIL,
                age: VALID_AGE,
                interests: VALID_INTERESTS,
            }

            await validateAndExpectError(validData, errors => {
                expect(errors).toEqual([])
            })
        })

        describe('name', () => {
            it('should fail if empty', async () => {
                const invalidData: SchemaType = {
                    name: '',
                    mail: VALID_MAIL,
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('This field is required')
                })
            })

            it('should fail if has less than mininum words', async () => {
                const invalidData = {
                    name: 'onlyone',
                    mail: VALID_MAIL,
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    const normalizedErrors =
                        normalizeErrorMessagesWithNumbers(errors)

                    expect(normalizedErrors).toContain(
                        'At least n words are required',
                    )
                })
            })

            it('should fail if has more than maximum words', async () => {
                const invalidData = {
                    name: 'one two three four five',
                    mail: VALID_MAIL,
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    const normalizedErrors =
                        normalizeErrorMessagesWithNumbers(errors)

                    expect(normalizedErrors).toContain(
                        'At most n words are allowed',
                    )
                })
            })

            it('should fail if maximum words exceeded', async () => {
                const invalidData = {
                    name: 'one two three',
                    mail: VALID_MAIL,
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    const normalizedErrors =
                        normalizeErrorMessagesWithNumbers(errors)

                    expect(normalizedErrors).toContain(
                        'At most n words are required',
                    )
                })
            })
        })

        describe('mail', () => {
            it('should fail if mail is empty', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: '',
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('This field is required')
                })
            })

            it('should fail if mail is not a valid email', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: 'invalidemail',
                    age: VALID_AGE,
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('This field must be a valid email')
                })
            })
        })

        describe('age', () => {
            it('should fail if age is empty', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: VALID_MAIL,
                    age: '',
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('This field is required')
                })
            })

            it('should fail if age is not a number', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: VALID_MAIL,
                    age: 'twenty',
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('This field must be a number')
                })
            })

            it('should fail if age is less than 18', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: VALID_MAIL,
                    age: '17',
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('Minimum age is 18')
                })
            })

            it('should fail if age is greater than 99', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: VALID_MAIL,
                    age: '100',
                    interests: VALID_INTERESTS,
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain('Maximum age is 99')
                })
            })
        })

        describe('interests', () => {
            it('should fail if interests are not selected', async () => {
                const invalidData = {
                    name: VALID_NAME,
                    mail: VALID_MAIL,
                    age: VALID_AGE,
                    interests: [],
                }

                await validateAndExpectError(invalidData, errors => {
                    expect(errors).toContain(
                        'At least one insterest must be selected.',
                    )
                })
            })
        })
    })
})
