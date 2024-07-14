import { CustomCheckboxProps } from '../components/CheckboxGroup'
import { DomainOption } from '../domain/types'

export function domainToCustomCheckboxInterestsConverter(
    interests: DomainOption[],
): CustomCheckboxProps[] {
    return interests.map(interest => {
        const id = Number(Object.keys(interest)[0])
        return {
            id: id.toString(),
            label: interest[id].label,
            checked: interest[id].isChecked,
        }
    })
}

export function customCheckboxInterestsToDomainConverter(
    interests: CustomCheckboxProps[],
): DomainOption[] {
    return interests.map(interest => ({
        [Number(interest.id)]: {
            label: interest.label ?? '',
            isChecked: interest.checked ?? false,
        },
    }))
}
