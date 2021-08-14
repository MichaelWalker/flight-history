import type { FunctionComponent } from "react";
import React from "react";
import { NavBar } from "../components/navigation/Nav";
import { Div, Link, Header, H1, Main } from "../wrappers/StyledElements";
import * as styles from "./page.styles";

interface PageProps {
    title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children, title }) => {
    return (
        <Div css={styles.pageContainer}>
            <Div css={styles.navContainer}>
                <Link css={styles.homeLink} to="/">
                    Flight History
                </Link>
                <NavBar />
            </Div>
            <Div css={styles.pageContent}>
                <Header css={styles.header}>
                    <H1 css={styles.title} data-testid="page-title">
                        {title}
                    </H1>
                </Header>
                <Main css={styles.main}>{children}</Main>
            </Div>
        </Div>
    );
};
