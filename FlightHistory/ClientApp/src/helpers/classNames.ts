interface ConditionalClass {
    name: string;
    isActive: boolean;
}

function toConditionalClass(item: string | Record<string, boolean>): ConditionalClass[] {
    if (typeof item === "string") {
        return [{ name: item, isActive: true }];
    }

    return Object.entries(item).map(([name, isActive]) => {
        return { name, isActive };
    });
}

function getIsActive(conditionalClass: ConditionalClass): boolean {
    return conditionalClass.isActive;
}

export function classNames(...classes: (string | Record<string, boolean>)[]): string {
    return classes
        .flatMap(toConditionalClass)
        .filter(getIsActive)
        .map((c) => c.name)
        .join(" ");
}
