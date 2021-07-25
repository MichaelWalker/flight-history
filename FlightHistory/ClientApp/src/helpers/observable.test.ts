import { Observable } from "./observable";

describe("observable", () => {
    it("should allow setting and retrieving of values", () => {
        const observable = Observable.of("Test Value");

        expect(observable.get()).toBe("Test Value");

        observable.set("Updated Value");
        expect(observable.get()).toBe("Updated Value");
    });

    it("should notify subscribers of change", () => {
        const observable = Observable.of("Test Value");
        const callbackOne = jest.fn();
        const callbackTwo = jest.fn();

        observable.subscribe(callbackOne);
        observable.subscribe(callbackTwo);

        observable.set("Updated Value");

        expect(callbackOne).toHaveBeenCalledWith("Updated Value");
        expect(callbackTwo).toHaveBeenCalledWith("Updated Value");
    });

    it("should allow subscribers to unsubscribe", () => {
        const observable = Observable.of("Test Value");
        const callback = jest.fn();

        observable.subscribe(callback);

        observable.set("Updated Value");
        expect(callback).toHaveBeenCalledWith("Updated Value");

        callback.mockReset();
        observable.unsubscribe(callback);
        observable.set("Another Value");
        expect(callback).not.toHaveBeenCalled();
    });
});
