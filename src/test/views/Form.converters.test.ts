import { CustomCheckboxProps } from '../../components/CheckboxGroup'
import { DomainOption } from '../../domain/types'
import {
    customCheckboxInterestsToDomainConverter,
    domainToCustomCheckboxInterestsConverter,
} from '../../views/Form.converters'

const interestDomainOptions: DomainOption[] = [
    { 1: { label: 'Interest 1', isChecked: true } },
    { 2: { label: 'Interest 2', isChecked: false } },
    { 3: { label: 'Interest 3', isChecked: true } },
]

const interestCheckboxes: CustomCheckboxProps[] = [
    { id: '1', label: 'Interest 1', checked: true },
    { id: '2', label: 'Interest 2', checked: false },
    { id: '3', label: 'Interest 3', checked: true },
]

describe('domainToCustomCheckboxInterestsConverter', () => {
    it(`should convert an array of DomainOption 
        to an array of CustomCheckboxProps`, () => {
        const result = domainToCustomCheckboxInterestsConverter(
            interestDomainOptions,
        )

        result.forEach((checkbox, index) => {
            expect(checkbox).toEqual(interestCheckboxes[index])
        })
    })

    it('should return an empty array if the input array is empty', () => {
        const emptyDomainOptions: DomainOption[] = []

        const result =
            domainToCustomCheckboxInterestsConverter(emptyDomainOptions)

        expect(result).toEqual([])
    })
})

describe('customCheckboxInterestsToDomainConverter', () => {
    it(`should convert an array of CustomCheckboxProps 
        to an array of DomainOption`, () => {
        const result =
            customCheckboxInterestsToDomainConverter(interestCheckboxes)

        result.forEach((checkbox, index) => {
            expect(checkbox).toEqual(interestDomainOptions[index])
        })
    })

    it('should return an empty array if the input array is empty', () => {
        const emptyCheckboxes: CustomCheckboxProps[] = []

        const result = customCheckboxInterestsToDomainConverter(emptyCheckboxes)

        expect(result).toEqual([])
    })
})
