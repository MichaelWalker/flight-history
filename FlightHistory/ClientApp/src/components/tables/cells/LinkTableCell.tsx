import React, {FunctionComponent} from "react";
import { Link } from 'react-router-dom';

interface LinkTableCellProps {
    text: string;
    to: string;
}

export const LinkTableCell: FunctionComponent<LinkTableCellProps> = ({text, to}) => {
    return (
        <td>
            <Link to={to}>
                {text}
            </Link>
        </td>
    );
}
