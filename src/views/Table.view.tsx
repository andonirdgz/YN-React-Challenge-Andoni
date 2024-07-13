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

// TASK 4:
// - Implement the table from this mockup (public/table_view_mockup.png). ✅
// - Display answers from store in table.
// - Each row of the table body should have the name of the answer
// and its value. ✅
// - Add the edit and delete buttons on top of the table.

// TASK 5:
// - Redirect to Form view on edit button click.

// TASK 6:
// - Invoke useResetAnswers hook on delete button click.
// - See useResetAnswers hook for more guidelines.

const MOCK_ANSWERS = {
    name: 'John Doe',
    mail: 'john@doe.com',
    age: '25',
    interests: ['Sports', 'Music'],
}

const COLUMNS = ['Question', 'Answer']

function normalizeQuestionName(question: string) {
    return question.replace('_', ' ')
}

export const TableView = () => {
    const answers = Object.entries(MOCK_ANSWERS).map(([question, answer]) => {
        const normalizedQuestion = normalizeQuestionName(question)

        if (Array.isArray(answer))
            return [normalizedQuestion, answer.join(', ')]

        return [normalizedQuestion, answer]
    })

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
