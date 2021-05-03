import React, {FunctionComponent} from "react";

interface TextTableCellProps {
    text: string;
}

export const TextTableCell: FunctionComponent<TextTableCellProps> = ({text}) => {
    return (
        <td>
            {text}
        </td>
    );
}
