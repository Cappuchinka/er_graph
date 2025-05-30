import { InputJSON } from '../types/json.types.ts';

export const JSON: InputJSON = {
    entities: [
        {
            name: "department",
            columns: [
                {
                    name: "id",
                    type: "integer"
                },
            ],
        },
        {
            name: "employee",
            columns: [
                {
                    name: "id",
                    type: "integer"
                },
            ],
        },
    ],

    references: [
        {
            source: {
                table: "department",
                field: "id"
            },
            target: {
                table: "employee",
                field: "department_id"
            },
            type: "OneToMany"
        }
    ]
}