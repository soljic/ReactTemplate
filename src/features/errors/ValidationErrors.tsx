import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationErrors({errors}: Props) {
    console.log("ERROrs", errors);
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.errors.errors.map((err: any, i: any) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}