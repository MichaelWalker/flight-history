import type { FC } from "react";
import React from "react";
import * as Globals from "../helpers/globals";
import { useUniqueId } from "./useUniqueId";
import { render } from "@testing-library/react";

const TestComponent: FC = () => {
    const idOne = useUniqueId("thing-one");
    const idTwo = useUniqueId("thing-two");
    const idThree = useUniqueId("thing-three");

    return (
        <>
            <div id={idOne} data-testid={"thing-one"} />
            <div id={idTwo} data-testid={"thing-two"} />
            <div id={idThree} data-testid={"thing-three"} />
        </>
    );
};

describe("useUniqueId", () => {
    it("should always generate new ids", () => {
        jest.spyOn(Globals, "getNextIdCounter")
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2)
            .mockReturnValueOnce(3);

        const { getByTestId } = render(<TestComponent />);

        expect(getByTestId("thing-one").id).toBe("thing-one-1");
        expect(getByTestId("thing-two").id).toBe("thing-two-2");
        expect(getByTestId("thing-three").id).toBe("thing-three-3");
    });
});
