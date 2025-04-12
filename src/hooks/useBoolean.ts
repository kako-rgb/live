import { useState } from "react";

export default function useBoolean (defaultValue?: boolean) {

    const [value, setValue] = useState<boolean>(defaultValue || false);

    const onToggle = () => setValue((v) => !v);
    const onTrue = () => setValue(true);
    const onFalse = () => setValue(false);

    return { value, onToggle, onTrue, onFalse };
}