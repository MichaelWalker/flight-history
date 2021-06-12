interface ConditionalClass {
    name: string;
    isActive: boolean;
}

function toConditionalClass(item: string | Record<string, boolean>): ConditionalClass[] {
    if (typeof item === "string") {
        return [{ name: item, isActive: true }];
    }
    
    return Object.entries(item)
        .map(([name, isActive]) => { return { name, isActive } });
}

function isActive(conditionalClass: ConditionalClass): boolean {
    return conditionalClass.isActive;
}

export function classNames(...classes: (string | Record<string, boolean>)[]) {
    return classes
        .flatMap(toConditionalClass)
        .filter(isActive)
        .map(c => c.name)
        .join(' ');
}
