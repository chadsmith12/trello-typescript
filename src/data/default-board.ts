import { Board } from "@/models/Board";
import { uuid } from "@/utils/utils";

const defaultBoard: Board = {
    name: 'workshop',
    columns: [
        {
            name: 'todo',
            tasks: [
                {
                    description: '',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'second task',
                    id: uuid(),
                    userAssigned: null
                },
                {
                    description: '',
                    name: 'and thrid',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        },
        {
            name: 'in-progress',
            tasks: [
                {
                    description: '',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        },
        {
            name: 'done',
            tasks: [
                {
                    description: '',
                    name: 'first task',
                    id: uuid(),
                    userAssigned: null
                }
            ]
        }
    ]
}

export default defaultBoard;