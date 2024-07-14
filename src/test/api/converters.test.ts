import { ApiAnswers } from '../../_mockedBE/be.types'
import {
    apiToDomainAnswersConverter,
    domainToApiAnswersConverter,
} from '../../api/converters'
import { DomainAnswers } from '../../domain/types'

const apiAnswers: ApiAnswers = {
    username: 'john',
    email: 'john@example.com',
    age: '25',
    interests: [
        { 0: { checked: true, label: 'React' } },
        { 1: { checked: false, label: 'Vue' } },
    ],
}

const domainAnswers: DomainAnswers = {
    name: 'john',
    mail: 'john@example.com',
    age: '25',
    interests: [
        { 0: { isChecked: true, label: 'React' } },
        { 1: { isChecked: false, label: 'Vue' } },
    ],
}

describe('apiToDomainAnswersConverter', () => {
    it('should convert API answers to domain answers correctly', () => {
        const answers = apiToDomainAnswersConverter(apiAnswers)

        expect(answers).toEqual(domainAnswers)
    })
})

describe('domainToApiAnswersConverter', () => {
    it('should convert domain answers to API answers correctly', () => {
        const answers = domainToApiAnswersConverter(domainAnswers)

        expect(answers).toEqual(answers)
    })
})
