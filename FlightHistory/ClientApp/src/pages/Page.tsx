import type { FunctionComponent } from "react";
import React from "react";
import { Nav } from "../components/navigation/Nav";
import { PageDiv, NavContainer, HomeLink, PageContent, Header, Title, Main } from "./page.styles";

interface PageProps {
    title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children, title }) => {
    return (
        <PageDiv>
            <NavContainer>
                <HomeLink to="/">Flight History</HomeLink>
                <Nav />
            </NavContainer>
            <PageContent>
                <Header>
                    <Title data-testid="page-title">{title}</Title>
                </Header>
                <Main>{children}</Main>
            </PageContent>
        </PageDiv>
    );
};
