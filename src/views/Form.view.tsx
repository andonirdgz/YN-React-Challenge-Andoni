import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useUpdateAnswers } from '../api-hooks/useUpdateAnswers'
import { CheckboxGroup } from '../components'
import { CustomCheckboxProps } from '../components/CheckboxGroup'
import { DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

import { validationSchema } from './Form.config'

function domainToCustomCheckboxInterestsConverter(
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

function customCheckboxInterestsToDomainConverter(
    interests: CustomCheckboxProps[],
): DomainOption[] {
    return interests.map(interest => ({
        [Number(interest.id)]: {
            label: interest.label ?? '',
            isChecked: interest.checked ?? false,
        },
    }))
}

export const FormView = () => {
    const answers = useAnswersStore(state => state.getAnswers())

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validationSchema),
        values: {
            ...answers,
            interests: domainToCustomCheckboxInterestsConverter(
                answers.interests,
            ),
        },
    })

    const updateAnswersMutation = useUpdateAnswers()
    const disabled = updateAnswersMutation.isLoading

    const onSubmit = handleSubmit(formData => {
        updateAnswersMutation.mutate({
            name: formData.name,
            mail: formData.mail,
            age: formData.age,
            interests: customCheckboxInterestsToDomainConverter(
                formData.interests as CustomCheckboxProps[],
            ),
        })
    })

    const isLodingAnswers =
        !answers.name &&
        !answers.mail &&
        !answers.age &&
        answers.interests.length <= 0

    if (isLodingAnswers) return <CircularProgress />

    return (
        <div id="form-view">
            <Box
                display="flex"
                gap={4}
                sx={{ flexDirection: 'column', width: '300px' }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue={answers.name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Name"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.name?.message || ''}
                            error={Boolean(errors.name?.message)}
                            disabled={disabled}
                        />
                    )}
                />
                <Controller
                    name="age"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Age"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.age?.message || ''}
                            error={Boolean(errors.age?.message)}
                            disabled={disabled}
                        />
                    )}
                />
                <Controller
                    name="mail"
                    control={control}
                    defaultValue={answers.mail}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label="Email"
                            variant="standard"
                            onChange={onChange}
                            value={value}
                            helperText={errors.mail?.message || ''}
                            error={Boolean(errors.mail?.message)}
                            disabled={disabled}
                        />
                    )}
                />
                {/*
                    TASK 2:
                    - Integrate CheckboxGroup into the form, controlled
                    by react-hook-form. ✅
                    - Ensure the form's initial state is properly
                    configured to kickstart the form's state cycle. ✅
                    - Do NOT modify types of answers.interests or
                    CheckboxGroup's options. This could be detrimental
                    to your final assessment. ✅

                    💡 Note: Could not disable this field because the 
                            instructions don't allow for modification of 
                            the CheckboxGroup type.
                */}
                <Controller
                    name="interests"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <CheckboxGroup
                            id="interests"
                            label="Interests"
                            options={value as CustomCheckboxProps[]}
                            onChange={onChange}
                            error={Boolean(errors.interests)}
                            helperText={errors.interests?.message}
                        />
                    )}
                />
                <Button
                    variant="contained"
                    disabled={!isValid || disabled}
                    onClick={onSubmit}
                >
                    Submit
                </Button>
            </Box>
        </div>
    )
}
