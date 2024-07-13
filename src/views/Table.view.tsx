import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
} from '@mui/material'
import React from 'react'

import { DomainAnswers, DomainOption } from '../domain/types'
import { useAnswersStore } from '../state'

// TASK 4:
// - Implement the table from this mockup (public/table_view_mockup.png). ✅
// - Display answers from store in table. ✅
// - Each row of the table body should have the name of the answer
// and its value. ✅
// - Add the edit and delete buttons on top of the table.

// TASK 5:
// - Redirect to Form view on edit button click.

// TASK 6:
// - Invoke useResetAnswers hook on delete button click.
// - See useResetAnswers hook for more guidelines.

const COLUMNS = ['Question', 'Answer']

function normalizeQuestionName(question: string) {
    return question.replace('_', ' ')
}

function interestsArrayToString(interests: DomainOption[]) {
    const selectedInterests = interests.filter(
        interest => interest[Number(Object.keys(interest)[0])].isChecked,
    )

    return selectedInterests
        .map(interest => interest[Number(Object.keys(interest)[0])].label)
        .join(', ')
}

function toFlattenAnswers(answers: DomainAnswers) {
    return Object.entries(answers).map(([question, answer]) => {
        const normalizedQuestion = normalizeQuestionName(question)

        if (Array.isArray(answer)) {
            return [normalizedQuestion, interestsArrayToString(answer)]
        }

        return [normalizedQuestion, answer]
    })
}

export const TableView = () => {
    const answers = toFlattenAnswers(
        useAnswersStore(state => state.getAnswers()),
    )

    return (
        <div id="table-view">
            <TableContainer component={Paper}>
                <Table aria-label="Question answers table">
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map(column => (
                                <TableCell key={column}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {answers.map(([question, answer]) => (
                            <TableRow key={question}>
                                <TableCell
                                    sx={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {question}
                                </TableCell>
                                <TableCell>{answer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
